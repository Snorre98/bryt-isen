# Generated by Django 5.0.2 on 2024-02-29 12:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('brytisen', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='activity',
            name='details',
            field=models.TextField(blank=True, null=True),
        ),
    ]
