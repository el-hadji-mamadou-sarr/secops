FROM python:3.9-slim

WORKDIR /usr/src/app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    libpq-dev \
    default-libmysqlclient-dev \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
COPY env.sample .env

EXPOSE 5000

CMD ["uvicorn", "src.app:app", "--host", "0.0.0.0", "--port", "5000"]