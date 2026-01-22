import mongoengine as me

# Embedded Documents (Part of the parent document, not separate collections)
class LessonDoc(me.EmbeddedDocument):
    title = me.StringField(required=True)
    content = me.StringField()
    video_url = me.StringField()

class ModuleDoc(me.EmbeddedDocument):
    title = me.StringField(required=True)
    lessons = me.ListField(me.EmbeddedDocumentField(LessonDoc))

# Primary Document
class CourseDocument(me.Document):
    # Store the SQL User ID to loosely link systems
    instructor_id = me.IntField(required=True)
    title = me.StringField(required=True, max_length=200)
    description = me.StringField()
    modules = me.ListField(me.EmbeddedDocumentField(ModuleDoc))
    
    meta = {'collection': 'courses_experimental'}