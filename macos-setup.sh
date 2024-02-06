#!/bin/bash

# Ask the user if they want to proceed
read -p "This is a draft-setup script. Do you want to proceed with the setup? (Y/N) " userInput
if [[ $userInput != "Y" ]] && [[ $userInput != "y" ]]; then
    echo "Setup cancelled by the user."
    exit 0
fi

# Step 2 - Navigate to the frontend
cd frontend

# Step 3 - Install frontend dependencies
npm install

# Optional: Start the frontend development server
# Uncomment the next line if you want the script to also start the frontend server.
# npm run dev &

# Step 4 - Navigate to the backend
cd ..

cd backend

# Step 5 - Install pipenv
pip install pipenv || pip3 install pipenv

# Step 6 - Use pipenv to install Django without entering the shell
pipenv install django

# Optional: Start the backend development server
# Uncomment the next line if you want the script to also start the backend server.
# pipenv run python manage.py runserver &

echo "Setup complete! Your React-Django project is ready for development."

# Prevent the terminal from closing automatically (not needed if running from Terminal)
echo "Press any key to continue..."
read -n 1 -s

