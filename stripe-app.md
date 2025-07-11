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

```yaml
Services:
├── nginx (Reverse Proxy)    # Port 80, 443, 5005
├── stripe-app (Django)      # Port interne (sans exposition directe)

Réseaux:
├── web_network (Frontend)
└── db_network (Backend)

Volumes:
├── stripe_static (Fichiers statiques)
└── stripe_media (Médias)
```

### Stack Technologique
- **Backend**: Django 4.x (Python 3.11-alpine3.18)
- **Paiements**: Stripe API
- **Reverse Proxy**: Nginx (Alpine minimal)
- **Conteneurisation**: Docker + Docker Compose

### Variables d'Environnement
```env
DEBUG=True
SECRET_KEY=your-secret-key-here
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
```

### Déploiement avec Docker

#### 1. Configuration des réseaux
```yaml
networks:
  db_network:
    driver: bridge
  web_network:
    driver: bridge
```

#### 2. Service Django
```yaml
services:
  rocket-django:
    container_name: rocket_django
    restart: always
    build: .
    networks:
      - db_network
      - web_network
```

#### 3. Service Nginx (Reverse Proxy)
```yaml
  nginx:
    container_name: nginx
    restart: always
    image: "nginx:latest"
    ports:
      - "5005:5005"
    volumes:
      - ./nginx:/etc/nginx/conf.d
    networks:
      - web_network
    depends_on: 
      - rocket-django
```

### Commandes de Déploiement

#### Déploiement avec l'Architecture Centralisée

```bash
# 1. Préparer l'environnement
git clone https://github.com/el-hadji-mamadou-sarr/secops.git

# 3. Démarrer tous les services avec un seul fichier docker-compose.yml
docker-compose up --build -d

# 4. Vérifier que tous les services sont actifs
docker-compose ps

# 5. Tester l'accès aux services
curl http://localhost        # Nginx reverse proxy
curl http://localhost:5005   # Accès direct (pentest)
```

### Configuration du Reverse Proxy

Le fichier `nginx/nginx.conf` est configuré aisni:

```nginx
events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    
    sendfile on;
    keepalive_timeout 65;
    
    include /etc/nginx/conf.d/*.conf;
}
```

### Configuration Spécifique Stripe

Le fichier `nginx/conf.d/stripe-app.conf` gère le routage :

```nginx
upstream stripe_backend {
    server stripe-app:5005;
}

server {
    listen 80;
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
- **Accès direct**: Port 5005 exposé pour les tests de pénétration (whitebox)
- **Isolation réseau**: Séparation web_network et db_network

### Tests d'Intégration
```bash
# Test via reverse proxy
curl -X GET http://localhost/

# Test accès direct (pentest)
curl -X GET http://localhost:5005/

# Test des fichiers statiques
curl -X GET http://localhost/static/

# Test du paiement Stripe
curl -X POST http://localhost/checkout/
```

## Accès à l'Application

### URLs Principales
- **Frontend**: http://localhost
- **Admin**: http://localhost/admin/
- **API**: http://localhost/api/
- **Health Check**: http://localhost/health

### Comptes de Test
- **Admin**: admin@example.com
- **Stripe Test**: Utiliser les cartes de test Stripe
  - Visa: 4242 4242 4242 4242
  - Expiration: 12/25, CVC: 123

### Logs
```bash
# Logs des conteneurs
docker-compose logs -f

```

---
*Projet réalisé dans le cadre de la formation E5 DevSecOps Docker - ESTIAM Paris*