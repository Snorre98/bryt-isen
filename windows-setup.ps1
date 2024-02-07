# chatGPT

# Initial user prompt to proceed with setup
$userInput = Read-Host "This is a draft-setup script. Do you want to proceed with the setup? (Y/N)"
if ($userInput -ne 'Y' -and $userInput -ne 'y') {
    Write-Output "Setup cancelled by the user."
    exit
}

# Ask if the user wants to install frontend dependencies
$userInput = Read-Host "Do you want to install frontend dependencies? (Y/N)"
if ($userInput -eq 'Y' -or $userInput -eq 'y') {
    # Navigate to the frontend
    Set-Location frontend
    # Install frontend dependencies
    npm install
    Write-Output "Frontend dependencies installed."
}

# Ask if the user wants to start the frontend server
$userInput = Read-Host "Do you want to open the frontend server in a separate terminal? (Y/N)"
if ($userInput -eq 'Y' -or $userInput -eq 'y') {
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"
    Write-Output "Frontend server starting in a new terminal..."
}


# Ask if the user wants to install backend dependencies
$userInput = Read-Host "Do you want to install backend dependencies? (Y/N)"
if ($userInput -eq 'Y' -or $userInput -eq 'y') {
    # Navigate to the backend
    Set-Location backend
    # Install pipenv
    pip install pipenv -or pip3 install pipenv
    # Use pipenv to install dependencies from pipfile
    pipenv install
    Write-Output "Backend dependencies installed."
}

# Ask if the user wants to start the backend server
$userInput = Read-Host "Do you want to open the backend server in a separate terminal? (Y/N)"
if ($userInput -eq 'Y' -or $userInput -eq 'y') {
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; pipenv run python manage.py runserver"
    Write-Output "Backend server starting in a new terminal..."
}

# Final message
Write-Output "Setup complete! Your React-Django project is ready for development."

# Prevent the PowerShell window from closing automatically
Write-Host "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
