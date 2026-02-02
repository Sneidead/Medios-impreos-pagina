<#
deploy_github.ps1
Uso: Ejecutar en PowerShell dentro de la carpeta del proyecto.
Requisitos: git y GitHub CLI (`gh`) instalados y autenticados.
Ejemplo:
  cd "c:\Users\robay\OneDrive\Escritorio\Programacion Pagina web\Medios Impresos"
  .\deploy_github.ps1 -RepoName "mediosimpresos" -Visibility "public"
#>
param(
  [string]$RepoName = "mediosimpresos",
  [ValidateSet("public","private")][string]$Visibility = "public"
)

# Cambiar al directorio del script (espera que se ejecute desde la raíz del proyecto)
Push-Location (Split-Path -Parent $MyInvocation.MyCommand.Definition)

Write-Host "> Iniciando despliegue a GitHub desde: " (Get-Location)

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  Write-Error "git no está instalado. Instala git antes de continuar: https://git-scm.com/"
  Pop-Location; exit 1
}
if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
  Write-Error "GitHub CLI (gh) no está instalado. Instálalo e inicia sesión: https://cli.github.com/"
  Pop-Location; exit 1
}

# Inicializar git si es necesario
if (-not (Test-Path .git)) {
  git init
  Write-Host "Repositorio git inicializado."
}

# Crear .gitignore si no existe
if (-not (Test-Path .gitignore)) {
  @"
.DS_Store
Thumbs.db
node_modules/
.env
.vscode/
.idea/
# Archivos temporales de OneDrive
~$*
"@ | Out-File -Encoding UTF8 .gitignore
  Write-Host "Se creó .gitignore"
}

# Agregar, commit
git add -A
# Evitar fallar si no hay cambios
try { git commit -m "Initial commit: sitio Medios Impresos" } catch { Write-Host "Sin cambios para commitear (o commit previo)." }

# Crear repo remoto y empujar usando gh
$createCmd = "gh repo create $RepoName --$Visibility --source=. --remote=origin --push --confirm"
Write-Host "> Ejecutando: $createCmd"
Invoke-Expression $createCmd

Write-Host "> Push completado (si no hubo errores)."

Write-Host "Siguientes pasos sugeridos:\n - Abre: https://github.com/$(gh api user --jq .login)/$RepoName\n - Habilita GitHub Pages en Settings → Pages (o usa 'gh' si tienes el plugin pages): 'gh pages deploy --branch main --dir .'"

Pop-Location
Write-Host "> Script finalizado."