# Generated by Django 3.1.5 on 2021-01-17 07:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='chosensong',
            name='title',
            field=models.CharField(default='', max_length=100),
        ),
    ]