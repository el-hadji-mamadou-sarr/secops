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

## Dockerfile - Configuration de l'Image

Le `Dockerfile` dans le répertoire `stripe-app/` définit l'image Docker optimisée pour l'application Django :

```dockerfile
FROM python:3.11-alpine3.18

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY requirements.txt .
# install python dependencies
RUN pip install --upgrade pip && pip install --no-cache-dir -r requirements.txt

COPY . .

# Install node 18 and npm
RUN apk add --no-cache nodejs npm

# Install modules and webpack
RUN npm i && npm run build

# Manage Assets & DB 
RUN python manage.py collectstatic --no-input  && python manage.py makemigrations && python manage.py migrate

# gunicorn
CMD ["gunicorn", "--config", "gunicorn-cfg.py", "core.wsgi"]
```

### Explication du Dockerfile

#### Image de Base
- **`python:3.11-alpine3.18`** : Image légère Alpine Linux avec Python 3.11
- Réduction de 80% de la taille par rapport à une image Debian standard

#### Variables d'Environnement
- **`PYTHONDONTWRITEBYTECODE=1`** : Empêche Python de créer des fichiers .pyc
- **`PYTHONUNBUFFERED=1`** : Assure l'affichage immédiat des logs

#### Installation des Dépendances
1. **Dependencies Python** : Installation via `pip` avec cache désactivé
2. **Node.js & npm** : Ajout pour la gestion des assets frontend
3. **Build Frontend** : Compilation des assets avec webpack

#### Configuration Django
- **`collectstatic`** : Collecte des fichiers statiques
- **`makemigrations & migrate`** : Préparation et application des migrations de base de données

#### Serveur de Production
- **Gunicorn** : Serveur WSGI pour la production avec configuration personnalisée

### Optimisations DevSecOps
- **Multi-stage non utilisé** : Image simple pour une application légère
- **Cache Docker** : Ordonnancement des couches pour optimiser le cache
- **Sécurité** : Utilisation d'Alpine pour réduire la surface d'attaque

## Captures d'Écran et Démonstrations

### 1. Transactions Stripe Dashboard
*Capture d'écran du tableau de bord Stripe montrant les transactions de test de l'application*

<img width="1558" height="310" alt="Screenshot from 2025-07-11 13-39-49" src="https://github.com/user-attachments/assets/2e07b588-4b8d-42ab-a621-059b3203923f" />

Cette capture montre les transactions de test effectuées via l'application Django. Le dashboard Stripe permet de visualiser :
- Les paiements réussis avec les montants
- Les méthodes de paiement utilisées (cartes de test)
- Les détails des transactions et leur statut
- L'intégration correcte entre l'application et l'API Stripe

### 2. Optimisation de la Taille d'Image Docker
*Comparaison des tailles d'images avant et après optimisation*

<img width="830" height="59" alt="Screenshot from 2025-07-11 13-15-50" src="https://github.com/user-attachments/assets/2e253449-7401-44ad-8b6d-f7155742606c" />

**Aprés**

<img width="830" height="44" alt="Screenshot from 2025-07-11 13-21-59" src="https://github.com/user-attachments/assets/dc4d060d-26bb-4737-a169-565acfe27c71" />

Cette comparaison illustre l'impact des optimisations DevSecOps :
- **Avant optimisation** : Image Python standard (~1.42GB)
- **Après optimisation** : Image Alpine Linux (~300MB)
- **Réduction de 80%** grâce à l'utilisation d'Alpine et à la réduction des couches
- **Techniques appliquées** : Multi-stage builds, cache Docker, nettoyage des packages

### 3. Images Docker Hub
*Capture d'écran du repository Docker Hub avec les images déployées*

<img width="1551" height="264" alt="Screenshot from 2025-07-11 17-34-35" src="https://github.com/user-attachments/assets/425e36f0-5c95-4ed2-8105-6429431d38ce" />

Le repository Docker Hub montre :
- L'image `gloatingorc/stripe-app:latest` optimisée
- La taille compacte de l'image (environ 200MB)
- Les tags disponibles et la date de dernière mise à jour
- L'intégration avec le pipeline CI/CD pour les déploiements automatisés

### 4. Page de Paiement de l'Application
*Interface utilisateur de la page de paiement avec intégration Stripe*

<img width="593" height="822" alt="Screenshot from 2025-07-11 13-39-23" src="https://github.com/user-attachments/assets/cc07c6a6-a078-4180-a515-b7a54695325b" />

L'interface de paiement démontre :
- L'intégration native de Stripe Elements dans l'application Django
- Le formulaire de paiement sécurisé avec validation en temps réel
- L'interface utilisateur responsive et professionnelle
- Les éléments de sécurité (HTTPS, tokens, validation côté client)

## Accès à l'Application

### Comptes de Test
- **Admin**: admin@example.com
- **Stripe Test**: Utiliser les cartes de test Stripe
  - Visa: 4242 4242 4242 4242
  - Expiration: 12/25, CVC: 123

## Répartition des Tâches de l'Équipe

### Équipe DevSecOps
**Chef de Projet & DevSecOps Engineer**: El Hadji Mamadou SARR

#### Répartition des Responsabilités

**Phase 1 - Conception & Architecture**
- Analyse des besoins et définition de l'architecture
- Choix des technologies et frameworks
- Conception du schéma d'architecture technique
- Définition des bonnes pratiques DevSecOps

**Phase 2 - Développement & Conteneurisation**
- Configuration des Dockerfiles optimisés
- Mise en place du reverse proxy Nginx

**Phase 3 - Infrastructure & Déploiement**
- Configuration Docker Compose centralisé
- Mise en place des réseaux et volumes
- Tests d'intégration et de déploiement
- Optimisation des images Docker

**Phase 4 - Sécurité & Monitoring**
- Audit de sécurité des conteneurs
- Configuration des variables d'environnement
- Tests de sécurité et validation
- Documentation complète

## Schéma de l'Architecture du Projet
<img width="1127" height="364" alt="Screenshot from 2025-07-11 17-32-28" src="https://github.com/user-attachments/assets/bb4ed966-910b-4c37-a879-1e52bb5382c7" />


## Choix des Technologies

### Conteneurisation - Docker
- **Infrastructure as Code** : Définition reproductible des environnements
- **Isolation** : Environnements isolés et consistants dev/test/prod
- **Portabilité** : Deploy anywhere principle - cloud agnostic
- **Versioning** : Gestion des versions d'images et rollback facilité
- **CI/CD Integration** : Intégration native avec les pipelines

### Orchestration - Docker Compose
- **Multi-services** : Gestion coordonnée de plusieurs conteneurs
- **Networking** : Gestion automatique des réseaux entre services
- **Volumes** : Persistance des données et partage entre conteneurs
- **Environment Management** : Gestion centralisée des variables d'environnement
- **Scaling** : Possibilité de scaling horizontal simple

### Reverse Proxy - Nginx
- **Load Balancing** : Répartition de charge entre instances
- **SSL Termination** : Gestion centralisée des certificats
- **Caching** : Mise en cache des contenus statiques
- **Security** : Point d'entrée unique avec filtrage
- **Monitoring** : Logs centralisés et métriques

### Base d'Images - Alpine Linux
- **Security** : Surface d'attaque réduite
- **Performance** : Temps de build et déploiement rapides
- **Resource Efficiency** : Consommation mémoire/CPU optimisée
- **Container Registry** : Réduction des coûts de stockage et transfert

### Stratégie DevOps
**Infrastructure as Code :**
- Un seul fichier `docker-compose.yml` pour tout l'environnement
- Configuration par variables d'environnement
- Reproductibilité garantie sur tous les environnements

**Continuous Integration :**
- Build automatique des images Docker
- Tests d'intégration sur containers
- Push automatique vers Docker Hub

**Continuous Deployment :**
- Déploiement par pull des images depuis registry
- Blue-green deployment possible
- Rollback rapide par tag d'image

## Hébergement et Cloud

### Repository Git
**GitHub Repository**: https://github.com/el-hadji-mamadou-sarr/secops

**Structure DevOps :**
```
secops/
├── docker-compose.yml          # Orchestration principale
├── docker-compose-hub.yml      # Version avec images Docker Hub
├── stripe-app/
│   ├── Dockerfile             # Image optimisée Alpine
│   ├── requirements.txt       # Dependencies Python
│   └── src/                   # Code source Django
├── nginx/
│   ├── nginx.conf            # Configuration principale
│   └── conf.d/               # Configurations des services
└── README.md                 # Documentation de déploiement
```

### Docker Hub Registry
**Images hébergées :**
- `gloatingorc/stripe-app:latest` 

**Pipeline DevOps :**
```bash
# Build et push vers Docker Hub
docker build -t gloatingorc/stripe-app:latest ./stripe-app
docker push gloatingorc/stripe-app:latest

# Déploiement depuis Docker Hub
docker-compose -f docker-compose-hub.yml up -d
```

### Avantages DevOps

1. **Déploiement One-Click** : Un seul fichier docker-compose.yml
2. **Images Optimisées** : 80% de réduction de taille
3. **Sécurité by Design** : Isolation réseau et principe du moindre privilège
4. **Scalabilité** : Architecture ready pour orchestrateurs (Kubernetes)
5. **Maintenance** : Mise à jour centralisée via registries

---
*Projet réalisé dans le cadre de la formation E5 DevSecOps Docker - ESTIAM Paris*
