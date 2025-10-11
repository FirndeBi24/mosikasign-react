#!/bin/bash

# Script de test pour vérifier que le package est prêt à être publié
# Usage: ./test-installation.sh

echo "🧪 Test d'installation du package @mosikasign/react"
echo "=================================================="
echo ""

# Vérifier qu'on est dans le bon dossier
if [ ! -f "package.json" ]; then
    echo "❌ Erreur: package.json non trouvé"
    echo "   Exécutez ce script depuis le dossier packages/mosikasign-react/"
    exit 1
fi

echo "✅ package.json trouvé"

# Vérifier que node_modules existe
if [ ! -d "node_modules" ]; then
    echo "⚠️  node_modules non trouvé. Installation des dépendances..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Erreur lors de l'installation des dépendances"
        exit 1
    fi
fi

echo "✅ Dépendances installées"

# Builder le package
echo ""
echo "📦 Build du package..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Erreur lors du build"
    exit 1
fi

echo "✅ Build réussi"

# Vérifier que dist/ existe
if [ ! -d "dist" ]; then
    echo "❌ Le dossier dist/ n'a pas été créé"
    exit 1
fi

echo "✅ Dossier dist/ créé"

# Vérifier les fichiers essentiels dans dist/
essential_files=("index.js" "index.esm.js" "index.d.ts")
for file in "${essential_files[@]}"; do
    if [ ! -f "dist/$file" ]; then
        echo "❌ Fichier manquant: dist/$file"
        exit 1
    fi
    echo "✅ dist/$file présent"
done

# Vérifier la taille du bundle
index_size=$(wc -c < "dist/index.js" | tr -d ' ')
esm_size=$(wc -c < "dist/index.esm.js" | tr -d ' ')

echo ""
echo "📊 Taille des bundles:"
echo "   - index.js: $(echo "scale=2; $index_size / 1024" | bc)KB"
echo "   - index.esm.js: $(echo "scale=2; $esm_size / 1024" | bc)KB"

# Test de simulation npm pack
echo ""
echo "📦 Test de npm pack (simulation)..."
npm pack --dry-run > /dev/null 2>&1

if [ $? -ne 0 ]; then
    echo "❌ Erreur lors du test npm pack"
    exit 1
fi

echo "✅ npm pack test réussi"

# Récapitulatif
echo ""
echo "=================================================="
echo "✅ Tous les tests sont passés!"
echo ""
echo "📦 Le package est prêt à être publié"
echo ""
echo "Prochaines étapes:"
echo "  1. npm login"
echo "  2. npm publish --access public"
echo ""
echo "Ou pour tester localement d'abord:"
echo "  npm link"
echo ""

