#
# deploy_github_pages.ps1
# Publica el sitio en GitHub Pages usando un push directo a la rama gh-pages
# (sin depender del subcomando `gh pages`).
# Requisitos:
#  - git instalado
#  - gh (GitHub CLI) instalado y autenticado
# Uso:
#  cd "C:\Users\robay\OneDrive\Escritorio\Programacion Pagina web\Medios Impresos"
#  .\deploy_github_pages.ps1
# Opcional: elegir branch origen y directorio (el dir se incluye en el mensaje únicamente)
#  .\deploy_github_pages.ps1 -Branch "main" -Dir "."

param(
  [string]$Branch = "main",
  [string]$Dir = ".",
  [string]$CommitMessage = "Deploy site to GitHub Pages"
)

# Seguridad: ejecutar desde la carpeta del script
Push-Location (Split-Path -Parent $MyInvocation.MyCommand.Definition)

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  Write-Error "git no está instalado. Instálalo antes de continuar: https://git-scm.com/"
  Pop-Location; exit 1
}
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

# Publicar en GitHub Pages: push forzado de Branch a gh-pages
Write-Host "> Publicando GitHub Pages con: git push origin ${Branch}:gh-pages"
try { git push origin "${Branch}:gh-pages" } catch { Write-Error "No se pudo publicar en gh-pages"; Pop-Location; exit 1 }

# Opcional: disparar build para ver estado inmediato (best-effort)
$remoteUrl = git config --get remote.origin.url
$repoSlug = $null
if ($remoteUrl -match "github.com[:/]([^/]+/[^/.]+)(?:\.git)?$") { $repoSlug = $Matches[1] }
if ($repoSlug) {
  Write-Host "> Disparando build de Pages para $repoSlug"
  try { gh api -X POST "/repos/$repoSlug/pages/builds" | Out-Null } catch { Write-Host "Aviso: no se pudo disparar build via gh api" }
}

Write-Host "\nPublicación finalizada. Comprueba la URL en https://$(gh api user --jq .login).github.io/$(git rev-parse --show-toplevel | Split-Path -Leaf) o en la sección Pages del repo en GitHub."
Pop-Location
