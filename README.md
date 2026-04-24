# Michelin Adonis - Michelin Guide Explorer

Une application web pour explorer les restaurants du guide Michelin avec filtres avancés et sauvegarde de favoris.
L'application est déployé sur http://164.90.197.34/, mais je vous conseil d'accéder à l'application en local, car elle est plus avancée et représente mieux notre travail.

## 🚀 Démarrage Rapide (Docker)

**3 étapes simples pour lancer l'application :**

### 1️⃣ Cloner le repository
```bash
git clone https://github.com/kps-243/michelin-adonis.git
cd michelin-adonis
```

### 2️⃣ Créer le fichier `.env`
```bash
cp .env.example .env
```

### 3️⃣ Lancer l'application
```bash
docker compose up --build
```

✅ L'application démarre automatiquement avec :
- **Migrations de base de données** exécutées
- **Seeders** (données de test + 10,000+ restaurants)
- **3 utilisateurs de test** créés

---

## 📍 Accès à l'Application

Une fois `docker compose up --build` lancé, accédez à :

| Service | URL | Objectif |
|---------|-----|----------|
| **Application** | http://127.0.0.1:3333 | Consultez les restaurants |
| **Adminer** | http://127.0.0.1:8081 | Gérez la base de données (interface web) |

---

## 🔑 Identifiants de Test

L'application crée automatiquement 3 utilisateurs de test (via seeders) :

1. **Alice Dupont** - `alice@example.com` / `password`
2. **Bob Martin** - `bob@example.com` / `password`
3. **Claire Bernard** - `claire@example.com` / `password`

---

## 🛠️ Développement (Mode local)

Pour développer sans Docker :

```bash
# Installer les dépendances
npm install

# Configurer la base de données locale
# Modifier `.env` avec DB_HOST=localhost et votre base locale

# Lancer les migrations
npm run migrate

# Démarrer le serveur en mode dev
npm run dev
```

**Scripts disponibles** :

```bash
npm run dev       # Développement avec rechargement en direct
npm run build     # Build pour la production
npm run migrate   # Exécuter les migrations et seeders
npm run test      # Lancer les tests
npm run lint      # Vérifier le code
npm run format    # Formater le code
```

---

## Structure du Projet

```
michelin-adonis/
├── app/              # Code applicatif (contrôleurs, modèles, vues)
├── database/
│   ├── migrations/   # Schéma de base de données
│   └── seeders/      # Données de test
├── data/             # Fichiers statiques (restaurants.jsonl, etc.)
├── config/           # Configuration (DB, auth, etc.)
├── Dockerfile        # Configuration Docker
├── docker-compose.yml # Services Docker (app, postgres, adminer)
├── .env.example      # Modèle de variables d'environnement
└── package.json      # Dépendances et scripts
```