from django.shortcuts import render, redirect
from django.contrib.auth import login
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.decorators import login_required
from apps.enrollments.models import Enrollment

def register_view(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user) # Auto-login after registration
            return redirect('course_list')
    else:
        form = UserCreationForm()
    return render(request, 'accounts/register.html', {'form': form})

@login_required
def dashboard_view(request):
    # Fetch courses the user is enrolled in
    user_enrollments = Enrollment.objects.filter(student=request.user).select_related('course')
    return render(request, 'accounts/dashboard.html', {'enrollments': user_enrollments})