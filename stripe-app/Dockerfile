FROM python:3.11-alpine3.18

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY requirements.txt .
# install python dependencies
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Install node 18 and npm
RUN apk add --no-cache nodejs npm

# Install modules and webpack
RUN npm i
RUN npm run build

# Manage Assets & DB 
RUN python manage.py collectstatic --no-input 
RUN python manage.py makemigrations
RUN python manage.py migrate

# gunicorn
CMD ["gunicorn", "--config", "gunicorn-cfg.py", "core.wsgi"]