#!/bin/bash
# chatGPT
# Initial user prompt to proceed with setup
read -p "This is a draft-setup script, it might not work. Do you want to proceed with the setup? (Y/N) " userInput
if [[ $userInput != "Y" && $userInput != "y" ]]; then
    echo "Setup cancelled by the user."
    exit
fi

# Ask if the user wants to install frontend dependencies
read -p "Do you want to install frontend dependencies? (Y/N) " userInput
if [[ $userInput == "Y" || $userInput == "y" ]]; then
    # Navigate to the frontend
    cd frontend
    # Install frontend dependencies
    npm install
    echo "Frontend dependencies installed."
    cd .. # Go back to the root directory
fi

# Ask if the user wants to start the frontend server
read -p "Do you want to open the frontend server in a separate terminal? (Y/N) " userInput
if [[ $userInput == "Y" || $userInput == "y" ]]; then
    osascript -e 'tell app "Terminal"
        do script "cd '\"$(PWD)/frontend\"'; npm run dev"
    end tell'
    echo "Frontend server starting in a new terminal..."
fi

# Ask if the user wants to install backend dependencies
read -p "Do you want to install backend dependencies? (Y/N) " userInput
if [[ $userInput == "Y" || $userInput == "y" ]]; then
    # Navigate to the backend
    cd backend
    # Install pipenv
    pip install pipenv || pip3 install pipenv
    # Use pipenv to install dependencies from pipfile
    pipenv install
    echo "Backend dependencies installed."
    cd .. # Go back to the root directory
fi

# Ask if the user wants to start the backend server
read -p "Do you want to open the backend server in a separate terminal? (Y/N) " userInput
if [[ $userInput == "Y" || $userInput == "y" ]]; then
    osascript -e 'tell app "Terminal"
        do script "cd '\"$(PWD)/backend\"'; pipenv run python manage.py runserver"
    end tell'
    echo "Backend server starting in a new terminal..."
fi

# Final message
echo "Setup complete! Your React-Django project is ready for development."

# Keep the terminal open
read -n 1 -s -r -p "Press any key to continue..."
