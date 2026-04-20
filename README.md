# HackBlock API

API REST pour l'application HackBlock.

## Installation

```bash
npm install
npm start
```

## Endpoints

- `GET /api/health` — Vérification de l'état de l'API
- `GET /api/sites` — Liste tous les sites
- `POST /api/sites` — Ajoute un site
- `PUT /api/sites/:id` — Met à jour un site (bloquer/débloquer)
- `DELETE /api/sites/:id` — Supprime un site
- `POST /api/prank` — Génère un lien piège

## Variables d'environnement

Créez un fichier `.env` :

```
PORT=3000
API_SECRET=votre_secret_ici
```
