from django.db import models

# Create your models here.
# Cool, will do.

class Hacker(models.Model):
    name = models.CharField(max_length=30)
    email = models.EmailField()
    location = models.CharField(max_length=50)
    description = models.TextField()
    lat = models.FloatField()
    lng = models.FloatField()

    def __unicode__(self):
        return self.name


