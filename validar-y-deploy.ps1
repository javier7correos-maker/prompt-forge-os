# validar-y-deploy.ps1
# Correr desde la carpeta del proyecto:
# cd "C:\Users\javie\OneDrive\Documentos\GitHub\prompt-forge-os"
# .\validar-y-deploy.ps1

Write-Host "=== PFOS — Validar y Deploy ===" -ForegroundColor Cyan

# 1. TypeScript
Write-Host "`n[1/4] Verificando TypeScript..." -ForegroundColor Yellow
$tscOutput = & .\node_modules\.bin\tsc --noEmit 2>&1
if ($LASTEXITCODE -ne 0) {
  Write-Host "ERRORES TypeScript:" -ForegroundColor Red
  $tscOutput | ForEach-Object { Write-Host $_ }
  Write-Host "`nCorregir errores antes de continuar." -ForegroundColor Red
  exit 1
}
Write-Host "TypeScript OK — 0 errores" -ForegroundColor Green

# 2. Build
Write-Host "`n[2/4] Probando build de produccion..." -ForegroundColor Yellow
$buildOutput = & npm run build 2>&1
if ($LASTEXITCODE -ne 0) {
  Write-Host "ERROR en build:" -ForegroundColor Red
  $buildOutput | Select-Object -Last 20 | ForEach-Object { Write-Host $_ }
  exit 1
}
Write-Host "Build OK" -ForegroundColor Green

# 3. Verificar que .env.local no está en el commit
Write-Host "`n[3/4] Verificando que .env.local no se sube..." -ForegroundColor Yellow
$gitStatus = git status --porcelain
if ($gitStatus -match "\.env\.local") {
  Write-Host ".env.local aparece en git status — PELIGRO. Verificar .gitignore." -ForegroundColor Red
  exit 1
}
Write-Host ".env.local protegido OK" -ForegroundColor Green

# 4. Deploy
Write-Host "`n[4/4] Subiendo a GitHub..." -ForegroundColor Yellow
$msg = Read-Host "Mensaje del commit (ej: feat: login page)"
if (-not $msg) { $msg = "feat: update" }

git add .
git commit -m $msg
git push

Write-Host "`nDeploy iniciado en Vercel. Revisar: https://vercel.com/dashboard" -ForegroundColor Cyan
