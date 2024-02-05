# Use same version as defined in .python-version.
FROM python:3.12.1-slim-bullseye

##################################
#         Exposed ports          #
##################################

# Backend server.
EXPOSE 8000
# Debugpy session.
EXPOSE 5678

##################################
#     Environment variables      #
##################################
# Docker-compose should configure env vars in '.docker.env'.
ENV PIPENV_DONT_LOAD_ENV=1
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1
ENV PIPENV_VENV_IN_PROJECT=1


# Make directories.
RUN mkdir /app
WORKDIR /app

# Prepare virtual environment.
RUN mkdir .venv
RUN python -m pip install pipenv

# Install venv dependecies.
COPY Pipfile Pipfile.lock ./
RUN python -m pipenv install --dev --deploy

# Copy remaining.
COPY . /app

# Start.
#ENTRYPOINT ["/app/entrypoint.sh"]
CMD ["pipenv", "run", "python", "manage.py", "runserver", "0.0.0.0:8000"]
