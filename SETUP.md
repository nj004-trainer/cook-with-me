# Cook With Me - Setup & Deployment Guide

---

## 🎯 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Quick Start (Docker)](#quick-start-docker)
3. [Local Development Setup](#local-development-setup)
4. [Database Seeding](#database-seeding)
5. [Self-Hosted Deployment](#self-hosted-deployment)
6. [Troubleshooting](#troubleshooting)

---

## ✅ Prerequisites

### For Docker (Recommended)
- Docker (v20.10+): [Install Docker](https://docs.docker.com/get-docker/)
- Docker Compose (v2.0+): [Install Docker Compose](https://docs.docker.com/compose/install/)
- 2GB RAM minimum
- Port 3000, 5000, 27017 available

### For Local Development
- Node.js (v16+): [Install Node.js](https://nodejs.org/)
- MongoDB (v5.0+): [Install MongoDB](https://www.mongodb.com/docs/manual/installation/)
- npm or yarn package manager
- Git

---

## 🚀 Quick Start (Docker)

### Step 1: Clone Repository
```bash
git clone https://github.com/nj004-trainer/cook-with-me.git
cd cook-with-me
```

### Step 2: Start Services
```bash
docker-compose up -d
```

This will:
- Pull MongoDB image
- Build backend service
- Build frontend service
- Start all containers on network

### Step 3: Seed Database
```bash
docker exec cook-with-me-backend npm run seed
```

Wait for success message: `Database seeded successfully!`

### Step 4: Access Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api/health
- **MongoDB Admin**: localhost:27017

---

## 💻 Local Development Setup

### Backend Setup

#### 1. Install Dependencies
```bash
cd backend
npm install
```

#### 2. Configure Environment
Create `.env` file:
```
MONGODB_URI=mongodb://localhost:27017/cook-with-me
PORT=5000
NODE_ENV=development
```

#### 3. Start Backend
```bash
npm run dev
```

Expected output:
```
Server running on http://localhost:5000
MongoDB Connected: localhost
```

#### 4. Seed Database
In a new terminal:
```bash
npm run seed
```

### Frontend Setup

#### 1. Install Dependencies
```bash
cd frontend
npm install
```

#### 2. Configure Environment
Create `.env.local` file:
```
REACT_APP_API_URL=http://localhost:5000
```

#### 3. Start Frontend
```bash
npm start
```

Expected output:
```
On Your Network: http://localhost:3000
Local: http://localhost:3000
```

---

## 🗄️ Database Seeding

### What Gets Seeded?
- **100 Recipes**: 5 unique + 95 classic variations
- **500 Comments**: Distributed across recipes with random names
- **Like System**: Ready to use (tracks session-based likes)

### Seed Commands

**Docker:**
```bash
docker exec cook-with-me-backend npm run seed
```

**Local:**
```bash
cd backend
npm run seed
```

### Clear & Reseed
```bash
# Docker
docker exec cook-with-me-backend node data/seedRecipes.js

# Local
cd backend
node data/seedRecipes.js
```

---

## 🌐 Self-Hosted Deployment

### Recommended: Ubuntu 20.04 / 22.04 VPS

#### Step 1: Prerequisites on Server

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verify installations
docker --version
docker-compose --version
```

#### Step 2: Clone Repository

```bash
cd /opt
sudo git clone https://github.com/nj004-trainer/cook-with-me.git
sudo chown -R $USER:$USER cook-with-me
cd cook-with-me
```

#### Step 3: Configure Environment

Create `backend/.env`:
```
MONGODB_URI=mongodb://admin:your-secure-password@mongodb:27017/cook-with-me?authSource=admin
PORT=5000
NODE_ENV=production
```

Create `frontend/.env.production.local`:
```
REACT_APP_API_URL=https://your-domain.com/api
```

#### Step 4: Update Docker Compose

Edit `docker-compose.yml`:
```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:latest
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: your-secure-password
    volumes:
      - mongodb_data:/data/db
    restart: unless-stopped

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    depends_on:
      - mongodb
    environment:
      MONGODB_URI: mongodb://admin:your-secure-password@mongodb:27017/cook-with-me?authSource=admin
      PORT: 5000
      NODE_ENV: production
    restart: unless-stopped

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend
    restart: unless-stopped

volumes:
  mongodb_data:
```

#### Step 5: Start Services

```bash
sudo docker-compose up -d
sudo docker-compose logs -f backend
```

Wait for: `Server running on http://localhost:5000`

#### Step 6: Seed Database

```bash
sudo docker exec cook-with-me-backend npm run seed
```

#### Step 7: Setup Nginx Reverse Proxy

Install Nginx:
```bash
sudo apt install -y nginx
```

Create config `/etc/nginx/sites-available/cook-with-me`:
```nginx
upstream cook_frontend {
    server localhost:3000;
}

upstream cook_backend {
    server localhost:5000;
}

server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://cook_frontend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api/ {
        proxy_pass http://cook_backend/api/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }
}
```

Enable config:
```bash
sudo ln -s /etc/nginx/sites-available/cook-with-me /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### Step 8: Setup SSL with Let's Encrypt

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

Nginx will auto-redirect to HTTPS.

#### Step 9: Monitor & Maintain

View logs:
```bash
sudo docker-compose logs -f backend
sudo docker-compose logs -f frontend
sudo docker-compose logs -f mongodb
```

Restart services:
```bash
sudo docker-compose restart
```

Update application:
```bash
cd /opt/cook-with-me
git pull origin main
sudo docker-compose up -d --build
```

---

## 🔧 Environment Variables Reference

### Backend

| Variable | Default | Description |
|----------|---------|-------------|
| `MONGODB_URI` | `mongodb://localhost:27017/cook-with-me` | MongoDB connection string |
| `PORT` | `5000` | Backend server port |
| `NODE_ENV` | `development` | Environment mode |

### Frontend

| Variable | Default | Description |
|----------|---------|-------------|
| `REACT_APP_API_URL` | `http://localhost:5000` | Backend API URL |
| `PORT` | `3000` | Frontend port (Docker) |

---

## 🐛 Troubleshooting

### MongoDB Connection Issues

**Error**: `MongoServerError: connect ECONNREFUSED`

**Solutions**:
```bash
# Check MongoDB is running
docker ps | grep mongodb

# Restart MongoDB
docker-compose restart mongodb

# Verify connection string
echo $MONGODB_URI
```

### Frontend Not Connecting to Backend

**Error**: `Failed to fetch recipes` or CORS errors

**Solutions**:
```bash
# Check backend is running
curl http://localhost:5000/api/health

# Verify REACT_APP_API_URL
echo $REACT_APP_API_URL

# Check browser console for details
# Open DevTools (F12) > Console
```

### Port Already in Use

**Error**: `bind: address already in use`

**Solutions**:
```bash
# Find process using port
sudo lsof -i :3000
sudo lsof -i :5000

# Kill process
sudo kill -9 <PID>

# Or change port in docker-compose.yml
```

### Seed Script Not Working

**Error**: `Cannot find module 'mongoose'`

**Solutions**:
```bash
# Rebuild backend
docker-compose build --no-cache backend

# Or install locally
cd backend
npm install
npm run seed
```

### Docker Out of Disk Space

```bash
# Clean up unused containers/images
docker system prune -a

# View disk usage
docker system df
```

### Cannot Access Application After Restart

```bash
# Check all services running
docker-compose ps

# Check logs
docker-compose logs

# Restart everything
docker-compose down
docker-compose up -d
docker exec cook-with-me-backend npm run seed
```

---

## 📊 Performance Tuning

### Increase Node.js Memory

Edit `docker-compose.yml`:
```yaml
backend:
  environment:
    - NODE_OPTIONS=--max_old_space_size=512
```

### Optimize MongoDB

Add to `docker-compose.yml`:
```yaml
mongodb:
  command: mongod --wiredTigerCacheSizeGB 1
```

### Enable Nginx Gzip Compression

Add to Nginx config:
```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript;
gzip_min_length 1000;
```

---

## 🔐 Security Best Practices

1. **Change MongoDB Credentials**
   - Update `MONGO_INITDB_ROOT_PASSWORD` in docker-compose.yml

2. **Use HTTPS**
   - Set up SSL with Let's Encrypt (see Step 8)

3. **Firewall Configuration**
   ```bash
   sudo ufw default deny incoming
   sudo ufw default allow outgoing
   sudo ufw allow 22/tcp  # SSH
   sudo ufw allow 80/tcp  # HTTP
   sudo ufw allow 443/tcp # HTTPS
   sudo ufw enable
   ```

4. **Hide MongoDB Port**
   - Only expose internally; remove `ports: - "27017:27017"` from docker-compose.yml

5. **Regular Updates**
   ```bash
   sudo apt update && sudo apt upgrade -y
   docker pull mongo:latest
   docker-compose up -d --pull always
   ```

---

## 📞 Support

For issues or questions:
1. Check this guide's troubleshooting section
2. Review backend logs: `docker-compose logs backend`
3. Check browser console (F12) for frontend errors
4. Open a GitHub issue with error details

---

**Last Updated**: March 9, 2026