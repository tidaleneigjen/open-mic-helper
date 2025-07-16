from rest_framework import serializers
from .models import Song, Set

class SongSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = ['id', 'title', 'artist', 'length_seconds']
        read_only_fields = ['id']

class SetSerializer(serializers.ModelSerializer):
    songs = SongSerializer(many=True, read_only=True)

    class Meta:
        model = Set
        fields = ['id', 'name', 'songs']
        read_only_fields = ['id']