# Stripe App

## Nom et Prénom
**El Hadji Mamadou SARR**

## Description du Projet
Cette application fait partie du projet E5 DevSecOps Docker ESTIAM Paris. Il s'agit d'une application e-commerce Django avec intégration Stripe pour le traitement des paiements.

## Architecture Technique



### Infrastructure as Code

Le projet utilise un seul fichier `docker-compose.yml` pour orchestrer tous les services :

```yaml
Services actuels:
├── nginx (Reverse Proxy)    # Port 80
├── stripe-app (Django)      # Port 8000 (interne)

Réseaux:
├── web_network (Frontend)
└── db_network (Backend)
```

### Stack Technologique
- **Backend**: Django 4.x (Python 3.11-alpine)
- **Paiements**: Stripe API
- **Reverse Proxy**: Nginx (Alpine)
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
      - "5085:5085"
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
cd stripe-app

# 2. Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos clés Stripe et mots de passe

# 3. Démarrer tous les services avec un seul fichier
docker-compose up --build -d

# 4. Vérifier que tous les services sont actifs
docker-compose ps
```

## Sécurité et Bonnes Pratiques

### Optimisations Docker


### Tests d'Intégration
```bash
# Test de l'API
curl -X GET http://localhost:5085/api/

# Test du paiement Stripe
curl -X POST http://localhost:5085/checkout/
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