from django.db import models

# Create your models here.
class Productos(models.Model):
    id = models.IntegerField(primary_key=True)
    nombre = models.TextField(max_length=16)
    descripcion = models.TextField(max_length=32)
    precio = models.IntegerField()
    imagen = models.ImageField(max_length=128)