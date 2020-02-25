from django.db import models

# Create your models here.

class Counter(models.Model):
    cnt = models.IntegerField()

class Record(models.Model):
    school = models.CharField(max_length=100)
    college = models.CharField(max_length=100)
    ip = models.CharField(max_length=20, blank=True)