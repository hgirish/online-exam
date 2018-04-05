$env:FLASK_APP = "./src/main.py"
$env:FLASK_DEBUG = 1
$venv = pipenv --venv
$cmd = [io.path]::Combine($venv, 'Scripts', 'Activate.ps1')
#$cmd = $venv + "\Scripts\Activate.ps1"
Write-Host $cmd 
if (Test-Path -IsValid $cmd) {
  Write-Host "Activating Virtual Env"
  Invoke-Expression $cmd
  #source $(pipenv --venv)/bin/activate
  python -m flask run
  # Deactivate environment
  deactivate 
}
else {
  Write-Host $cmd + " does not exist"
}