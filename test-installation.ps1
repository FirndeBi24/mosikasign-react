# Script de test pour vérifier que le package est prêt à être publié
# Usage: .\test-installation.ps1

Write-Host "🧪 Test d'installation du package @mosikasign/react" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

# Vérifier qu'on est dans le bon dossier
if (-Not (Test-Path "package.json")) {
    Write-Host "❌ Erreur: package.json non trouvé" -ForegroundColor Red
    Write-Host "   Exécutez ce script depuis le dossier packages\mosikasign-react\" -ForegroundColor Red
    exit 1
}

Write-Host "✅ package.json trouvé" -ForegroundColor Green

# Vérifier que node_modules existe
if (-Not (Test-Path "node_modules")) {
    Write-Host "⚠️  node_modules non trouvé. Installation des dépendances..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Erreur lors de l'installation des dépendances" -ForegroundColor Red
        exit 1
    }
}

Write-Host "✅ Dépendances installées" -ForegroundColor Green

# Builder le package
Write-Host ""
Write-Host "📦 Build du package..." -ForegroundColor Cyan
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erreur lors du build" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build réussi" -ForegroundColor Green

# Vérifier que dist/ existe
if (-Not (Test-Path "dist")) {
    Write-Host "❌ Le dossier dist\ n'a pas été créé" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Dossier dist\ créé" -ForegroundColor Green

# Vérifier les fichiers essentiels dans dist/
$essentialFiles = @("index.js", "index.esm.js", "index.d.ts")
foreach ($file in $essentialFiles) {
    if (-Not (Test-Path "dist\$file")) {
        Write-Host "❌ Fichier manquant: dist\$file" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ dist\$file présent" -ForegroundColor Green
}

# Vérifier la taille du bundle
$indexSize = (Get-Item "dist\index.js").Length
$esmSize = (Get-Item "dist\index.esm.js").Length

Write-Host ""
Write-Host "📊 Taille des bundles:" -ForegroundColor Cyan
Write-Host "   - index.js: $([math]::Round($indexSize / 1KB, 2))KB"
Write-Host "   - index.esm.js: $([math]::Round($esmSize / 1KB, 2))KB"

# Test de simulation npm pack
Write-Host ""
Write-Host "📦 Test de npm pack (simulation)..." -ForegroundColor Cyan
npm pack --dry-run > $null 2>&1

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erreur lors du test npm pack" -ForegroundColor Red
    exit 1
}

Write-Host "✅ npm pack test réussi" -ForegroundColor Green

# Récapitulatif
Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "✅ Tous les tests sont passés!" -ForegroundColor Green
Write-Host ""
Write-Host "📦 Le package est prêt à être publié" -ForegroundColor Cyan
Write-Host ""
Write-Host "Prochaines étapes:"
Write-Host "  1. npm login"
Write-Host "  2. npm publish --access public"
Write-Host ""
Write-Host "Ou pour tester localement d'abord:"
Write-Host "  npm link"
Write-Host ""

