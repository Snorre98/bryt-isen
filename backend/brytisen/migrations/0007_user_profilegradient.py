# Generated by Django 5.0.3 on 2024-03-14 10:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('brytisen', '0006_remove_activity_isreported'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='profileGradient',
            field=models.CharField(default='linear-gradient(262deg, #87d4f5, #3944df)', max_length=50),
        ),
    ]
