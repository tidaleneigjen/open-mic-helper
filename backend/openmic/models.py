from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Song(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="songs")
    title = models.CharField(max_length=200)
    artist = models.CharField(max_length=200)
    length_seconds = models.PositiveIntegerField(help_text="Length in seconds", null=True, default=180)

    def __str__(self):
        return f"{self.title} by {self.artist}"

class Set(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="sets")
    name = models.CharField(max_length=200)
    songs = models.ManyToManyField(Song, related_name="sets")

    def __str__(self):
        return self.name
