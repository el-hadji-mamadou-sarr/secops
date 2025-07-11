# Rocket E-commerce v1.0.7 - Guide de Déploiement Docker

## Vue d'ensemble
Ce projet contient une application e-commerce multi-services avec les services suivants :
- **stripe-app**: Application Django pour le traitement des paiements
- **fastapi-server**: Backend FastAPI pour les services API
- **velocity-front**: Application frontend (Nginx)
- **velocity-back**: Backend Node.js pour les services Velocity
- **nginx**: Proxy inverse pour le routage des requêtes

## Prérequis
- Docker installé sur votre système
- Docker Compose installé
- Compte Docker Hub

## Construction et Publication des Images sur Docker Hub

### Étape 1 : Connexion à Docker Hub
```bash
docker login
```
Entrez vos identifiants Docker Hub lorsque demandé.

### Étape 2 : Construction de Toutes les Images avec Docker Compose
```bash
docker compose build
```

Ceci va construire tous les services définis dans le fichier docker-compose.yml.

### Étape 3 : Étiquetage des Images pour Docker Hub
Après la construction, étiquetez chaque image avec votre nom d'utilisateur Docker Hub :

```bash
# Étiqueter stripe-app
docker tag secops-stripe-app gloatingorc/stripe-app:latest

# Étiqueter fastapi-server
docker tag secops-fastapi-server gloatingorc/fastapi-server:latest

# Étiqueter velocity-front
docker tag secops-velocity-front gloatingorc/velocity-front:latest

# Étiqueter velocity-back
docker tag secops-velocity-back gloatingorc/velocity-back:latest
```

### Étape 4 : Publication des Images sur Docker Hub
```bash
# Publier toutes les images
docker push gloatingorc/stripe-app:latest
docker push gloatingorc/fastapi-server:latest
docker push gloatingorc/velocity-front:latest
docker push gloatingorc/velocity-back:latest
```

### Étape 5 : Vérifier les Images sur Docker Hub
Visitez https://hub.docker.com et vérifiez que vos dépôts ont été créés avec succès.

## Alternative : Construction et Publication en Une Commande

Vous pouvez également modifier votre docker-compose.yml pour inclure les noms d'images et utiliser docker-compose pour publier :

```yaml
services:
  stripe-app:
    build: ./stripe-app
    image: gloatingorc/stripe-app:latest
    
  fastapi-server:
    build: ./fastapi-server
    image: gloatingorc/fastapi-server:latest
    
  velocity-front:
    build: ./velocity-front
    image: gloatingorc/velocity-front:latest
    
  velocity-back:
    build: ./velocity-back
    image: gloatingorc/velocity-back:latest
```

Puis exécutez :
```bash
docker compose build
docker compose push
```

## Exécution de l'Application

### Avec le fichier docker-compose.yml (construction locale) :
```bash
# Démarrer tous les services
docker compose up -d

# Arrêter tous les services
docker compose down

# Voir les logs
docker compose logs -f
```

### Avec le fichier docker-compose-hub.yml (images Docker Hub) :
```bash
# Démarrer tous les services avec les images Docker Hub
docker compose -f docker-compose-hub.yml up -d

# Arrêter tous les services
docker compose -f docker-compose-hub.yml down

# Voir les logs
docker compose -f docker-compose-hub.yml logs -f
```

## Points d'Accès des Services

- **Stripe App**: http://localhost:5085
- **FastAPI Server**: http://localhost:5006 (direct) ou http://localhost:5006 (via nginx)
- **Velocity Front**: http://localhost:5007
- **Velocity Back**: http://localhost:5008

## Variables d'Environnement

Assurez-vous de définir les variables d'environnement suivantes :
- `STRIPE_SECRET_KEY`: Votre clé secrète Stripe
- `STRIPE_PUBLISHABLE_KEY`: Votre clé publique Stripe

## Dépannage

### Supprimer tous les conteneurs et images :
```bash
# Arrêter et supprimer tous les conteneurs
docker compose down
```

### Voir les logs des conteneurs :
```bash
docker logs <nom_du_conteneur>
```

### Reconstruire un service spécifique :
```bash
docker compose build <nom_du_service>
```

## Dépôts Docker Hub

Les dépôts suivants sont disponibles sur Docker Hub :
- `gloatingorc/stripe-app`
- `gloatingorc/fastapi-server`
- `gloatingorc/velocity-front`
- `gloatingorc/velocity-back`