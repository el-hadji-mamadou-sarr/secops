FROM python:3.11-alpine

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY requirements.txt .
# install python dependencies
RUN pip install --upgrade pip && pip install --no-cache-dir -r requirements.txt

COPY . .

# Install node 18 and npm
RUN set -uex; \
    apk update; \
    apk add  ca-certificates curl gnupg; \
    mkdir -p /etc/apk/keyrings; \
    curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key \
     | gpg --dearmor -o /etc/apk/keyrings/nodesource.gpg; \
    NODE_MAJOR=18; \
    echo "deb [signed-by=/etc/apk/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" \
     > /etc/apk/sources.list.d/nodesource.list; \
    apk update; \
    apk add nodejs;

# Install modules and webpack

RUN npm i && npm run build

# Manage Assets & DB 
RUN python manage.py collectstatic --no-input && python manage.py makemigrations && python manage.py migrate


# gunicorn
CMD ["gunicorn", "--config", "gunicorn-cfg.py", "core.wsgi"]
