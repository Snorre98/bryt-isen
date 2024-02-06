#Can be run on macOS if you install powershell for mac

$userInput = Read-Host "This is a draft-setup script. Do you want to proceed with the setup? (Y/N)"
if ($userInput -ne 'Y' -and $userInput -ne 'y') {
    Write-Output "Setup cancelled by the user."
    exit
}

# Step 2 - Navigate to the frontend
Set-Location frontend

# Step 3 - Install frontend dependencies
npm install

# Optional: Start the frontend development server
# Start-Process npm run dev
# Uncomment the above line if you want the script to also start the frontend server.
# You would then manually stop it with Ctrl + C.

# Step 4 - Navigate to the backend
Set-Location ..

Set-Location backend

# Step 5 - Install pipenv
pip install pipenv -or pip3 install pipenv

# Step 6 - Use pipenv to install dependencies from pipfile
pipenv install

# Optional: Start the backend development server
# pipenv run python manage.py runserver
# Uncomment the above line if you want the script to also start the backend server.
# You would then manually stop it with Ctrl + C.

Write-Output "Setup complete! Your React-Django project is ready for development."
# Prevent the PowerShell window from closing automatically
Write-Host "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
