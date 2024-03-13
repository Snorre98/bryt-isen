# Generated by Django 5.0.2 on 2024-03-11 12:20

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('brytisen', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='FavoritedActivity',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('activity_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='brytisen.activity')),
                ('favorited_by_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_favorites', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Reported Activity',
                'verbose_name_plural': 'Reported Activities',
            },
        ),
    ]
