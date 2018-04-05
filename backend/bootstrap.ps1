$env:FLASK_APP = "./src/main.py"
$venv = pipenv --venv
$cmd = $venv + "/Scripts/Activate.ps1"
Invoke-Expression $cmd
#source $(pipenv --venv)/bin/activate
flask run -h 0.0.0.0