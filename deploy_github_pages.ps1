<#
deploy_github_pages.ps1
Publica el sitio estático en GitHub Pages usando la GitHub CLI.
Requisitos:
 - `git` instalado
 - `gh` (GitHub CLI) instalado y autenticado
Uso:
 cd "C:\Users\robay\OneDrive\Escritorio\Programacion Pagina web\Medios Impresos"
 .\deploy_github_pages.ps1
Opcional: pasar branch y directorio
 .\deploy_github_pages.ps1 -Branch "main" -Dir "."
#>
param(
  [string]$Branch = "main",
  [string]$Dir = ".",
  [string]$CommitMessage = "Deploy site to GitHub Pages"
)

# Seguridad: ejecutar desde la carpeta del script
Push-Location (Split-Path -Parent $MyInvocation.MyCommand.Definition)

if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
  Write-Error "GitHub CLI (gh) no está instalado. Instálalo e inicia sesión: https://cli.github.com/"
  Pop-Location; exit 1
}

# Detectar branch actual
$currBranch = (git rev-parse --abbrev-ref HEAD) 2>$null
if (-not $currBranch) { Write-Host "No hay repo git inicializado. Ejecuta deploy_github.ps1 primero."; Pop-Location; exit 1 }

# Push cambios locales (asegúrate de commitear primero)
Write-Host "> Push de la rama $Branch al remoto origin (si existe)"
try { git push origin $Branch } catch { Write-Host "Ignorando error de push (posible ausencia de remoto)." }

# Ejecutar despliegue con gh
Write-Host "> Ejecutando: gh pages deploy --branch $Branch --dir $Dir --message '$CommitMessage'"
$deployCmd = "gh pages deploy --branch $Branch --dir $Dir --message '$CommitMessage'"
Invoke-Expression $deployCmd

Write-Host "\nPublicación finalizada. Comprueba la URL en https://$(gh api user --jq .login).github.io/$(git rev-parse --show-toplevel | Split-Path -Leaf) o en la sección Pages del repo en GitHub."
Pop-Location
