# Stripe App - Projet E5 DevSecOps Docker ESTIAM Paris

## Nom et Prénom
**El Hadji Mamadou SARR**

## Description du Projet
Cette application fait partie du projet E5 DevSecOps Docker ESTIAM Paris. Il s'agit d'une application e-commerce Django avec intégration Stripe pour le traitement des paiements, déployée dans un environnement conteneurisé optimisé.

## Contexte du Projet
Dans le cadre du projet E5 DevSecOps, notre équipe d'ingénieurs DevSecOps a pour mission de déployer une stack complète avec une infrastructure as code utilisant un seul fichier Docker Compose. L'objectif est de créer des applications légères et accessibles depuis l'extérieur, avec un reverse proxy centralisé.

## Architecture Technique

### Infrastructure as Code

Le projet utilise un seul fichier `docker-compose.yml` centralisé pour orchestrer tous les services :

#### 2. Service Django
```yaml
services:
  stripe-app:
    container_name: stripe_app
    restart: always
    build: ./stripe-app
    environment:
      - DEBUG=True
      - STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY}
      - STRIPE_PUBLISHABLE_KEY=${STRIPE_PUBLISHABLE_KEY}
      - SECRET_KEY=${SECRET_KEY}
    networks:
      - web_network
      - db_network
    volumes:
      - stripe_media:/media
      - stripe_static:/staticfiles
```

#### 3. Service Nginx (Reverse Proxy)
```yaml
  nginx:
    container_name: nginx_proxy
    image: nginx:alpine
    restart: always
    ports:
      - "5085:5005"
    volumes:
      - ./nginx/conf.d:/etc/nginx/conf.d
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf
      - stripe_static:/staticfiles
      - stripe_media:/media
    depends_on:
      - stripe-app
    networks:
      - web_network
```
#### 4. Configuration des Réseaux
```yaml
  db_network:
    driver: bridge
  web_network:
    driver: bridge
```

### Stack Technologique
- **Backend**: Django 4.x (Python 3.11-alpine3.18)
- **Paiements**: Stripe API
- **Reverse Proxy**: Nginx (Alpine minimal)
- **Conteneurisation**: Docker + Docker Compose

### Variables d'Environnement
```env
STRIPE_SECRET_KEY=your_secret_key_here
STRIPE_PUBLISHABLE_KEY=your_publishable_key_here
```

#### Déploiement avec l'Architecture Centralisée

```bash
# 1. Préparer l'environnement
git clone https://github.com/el-hadji-mamadou-sarr/secops.git

# 2. Configurer les variables d'environnement
cp .env.example .env

# 3. Démarrer tous les services avec un seul fichier docker-compose.yml
docker-compose up --build -d

# 4. Vérifier que tous les services sont actifs
docker-compose ps

# 5. Tester l'accès
curl http://localhost:5085  
```

### Configuration du Reverse Proxy

Le fichier `nginx/conf.d/stripe-app.conf` gère le routage :

```nginx
upstream stripe_backend {
    server stripe-app:5005;
}

server {
    listen 5005;
    server_name localhost;

    location / {
        proxy_pass http://stripe_backend;
        proxy_set_header Host $host;
    }

    location /static/ {
        alias /staticfiles/;
    }

    location /media/ {
        alias /media/;
    }
}
```

## Sécurité et Bonnes Pratiques

### Optimisations Docker
- **Images légères**: Utilisation d'Alpine Linux pour réduire la taille des images
- **Volumes partagés**: Gestion optimisée des fichiers statiques et médias

### Aspects DevSecOps
- **Infrastructure as Code**: Un seul fichier docker-compose.yml pour tout déployer
- **Reverse Proxy**: Nginx centralise l'accès aux services
- **Isolation réseau**: Séparation web_network et db_network

## Accès à l'Application

### Comptes de Test
- **Admin**: admin@example.com
- **Stripe Test**: Utiliser les cartes de test Stripe
  - Visa: 4242 4242 4242 4242
  - Expiration: 12/25, CVC: 123

---
*Projet réalisé dans le cadre de la formation E5 DevSecOps Docker - ESTIAM Paris*