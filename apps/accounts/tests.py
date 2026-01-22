from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import Course as SQLCourse
# Import MongoEngine models
from .documents import CourseDocument
import mongoengine
from mongoengine import connect, disconnect

User = get_user_model()

class HybridSystemTest(TestCase):
    
    def setUp(self):
        # 1. Setup MySQL Data (Standard Django Test DB)
        self.instructor = User.objects.create_user(
            username='prof_x', password='password', is_instructor=True
        )
        
        # 2. Setup MongoMock (In-memory NoSQL)
        disconnect() # Disconnect any existing connections
        connect('mongoenginetest', host='mongomock://localhost')

    def test_sql_course_workflow(self):
        """Ensure standard relational logic works"""
        course = SQLCourse.objects.create(
            title="Django 101", 
            instructor=self.instructor, 
            description="Intro to Web"
        )
        self.assertEqual(course.instructor.username, 'prof_x')

    def test_mongo_experimental_document(self):
        """Ensure NoSQL document creation works with mock"""
        # Create a complex nested document
        mongo_course = CourseDocument(
            instructor_id=self.instructor.id,
            title="Advanced Data Structures",
            description="Using NoSQL"
        )
        mongo_course.save()

        # Retrieve verify
        fetched = CourseDocument.objects.get(title="Advanced Data Structures")
        self.assertEqual(fetched.instructor_id, self.instructor.id)

    def tearDown(self):
        # Clean up Mongo connection
        disconnect()