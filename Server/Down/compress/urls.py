from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("upload", views.upload, name="upload"),
    path("upload_file", views.upload_file, name="up_file"),
    path("get_cnt", views.get_cnt, name="get_cnt"),
    path("submit", views.submit, name="submit")
]