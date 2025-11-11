#!/bin/bash

# Quick bootstrap script for the MySQL2 Helper Lite project.
# Installs backend dependencies and prepares the sample React component.

set -euo pipefail

echo "MySQL2 Helper Lite - project setup"
echo "----------------------------------"

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is required (v16 or newer recommended)."
  exit 1
fi

echo "Node.js $(node --version) detected."
echo

echo "[1/2] Installing backend dependencies..."
pushd backend >/dev/null

if [ ! -f ".env" ]; then
  cp .env.example .env
  echo "Created backend/.env from template. Remember to update the values."
fi

npm install
popd >/dev/null
echo

if [ ! -f mysql2-helper-website.jsx ]; then
  echo "mysql2-helper-website.jsx not found. Please pull the latest repository contents."
else
  echo "[2/2] React component is ready at mysql2-helper-website.jsx"
  echo "Copy it into any React project's App component to get started."
fi

echo
echo "Setup complete."
echo "- Backend: cd backend && npm run dev"
echo "- Seed data (optional): cd backend && npm run seed"
echo "- API health check: curl http://localhost:3001/api/health"
