# Deploy

This documents how alyashour.dev is deployed on my server behind Caddy using Docker Compose.

## Prerequisites

- Docker and Docker Compose installed on the server.
- DNS A/AAAA records for alyashour.dev, www.alyashour.dev, alyashour.com, www.alyashour.com pointing at the server's IP.
- Ports 80 and 443 (tcp + udp) open in the firewall.
- Caddy stack already running from `~/server` (Caddyfile + compose.yaml as configured).

## Build the Image

```bash
docker build -t localhost/portfolio .
```

## Start (or restart) Stack

```bash
cd ~/server
docker compose up -d
```

## Redeploy after Site Changes

```bash
cd ~/apps/alyashour.dev
git pull
docker build -t localhost/portfolio .
cd ~/server
docker compose up -d portfolio
```
