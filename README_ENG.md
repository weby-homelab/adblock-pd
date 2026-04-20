<p align="center">
  <a href="README_ENG.md">
    <img src="https://img.shields.io/badge/🇬🇧_English-00D4FF?style=for-the-badge&logo=readme&logoColor=white" alt="English README">
  </a>
  <a href="README.md">
    <img src="https://img.shields.io/badge/🇺🇦_Українська-FF4D00?style=for-the-badge&logo=readme&logoColor=white" alt="Українська версія">
  </a>
</p>

<br>

# 🛡️ ADBlock-Private-DNS (ADBlock-PD)

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/weby-homelab/adblock-pd/master/logo-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/weby-homelab/adblock-pd/master/logo-light.svg">
    <img alt="ADBlock-PD Logo" src="https://raw.githubusercontent.com/weby-homelab/adblock-pd/master/logo-light.svg" width="400">
  </picture>
</p>

<p align="center">
  <em>The ultimate, heavily hardened fork of AdGuard Home for those who demand absolute privacy.</em>
</p>

<p align="center">
  <a href="https://hub.docker.com/r/webyhomelab/adblock-pd"><img src="https://img.shields.io/docker/pulls/webyhomelab/adblock-pd?style=for-the-badge&logo=docker&color=00d4ff" alt="Docker Pulls"></a>
  <a href="https://github.com/weby-homelab/adblock-pd/releases/latest"><img src="https://img.shields.io/github/v/release/weby-homelab/adblock-pd?style=for-the-badge&logo=github&color=0072ff" alt="Latest Release"></a>
  <a href="https://github.com/weby-homelab/adblock-pd/blob/master/LICENSE.txt"><img src="https://img.shields.io/badge/License-GPL_v3-blue.svg?style=for-the-badge" alt="License"></a>
</p>

---

## 🎯 What is this?
**ADBlock-Private-DNS (ADBlock-PD)** is a fork of the popular AdGuard Home DNS server (based on v0.107.74). Created by **Weby Homelab**, the sole purpose of this project is to **completely sever all ties with AdGuard's infrastructure (and any other external entity)**. We took a powerful filtering engine and fully "sanitized" it.

Your DNS server should belong exclusively to you. No telemetry, no hidden requests, and no downloading of third-party code without your explicit consent.

### 🏗️ Architecture

```mermaid
graph TD
    %% Styling
    classDef client fill:#0072ff,stroke:#00d4ff,stroke-width:2px,color:#fff,font-weight:bold,rx:10,ry:10;
    classDef server fill:#1a1a2e,stroke:#00d4ff,stroke-width:3px,color:#fff,font-weight:bold,rx:15,ry:15;
    classDef filter fill:#ff4d00,stroke:#ff8c00,stroke-width:2px,color:#fff,font-weight:bold,rx:10,ry:10;
    classDef block fill:#e84545,stroke:#903749,stroke-width:2px,color:#fff,stroke-dasharray: 5 5,rx:10,ry:10;
    classDef upstream fill:#16c79a,stroke:#11999e,stroke-width:2px,color:#fff,font-weight:bold,rx:10,ry:10;
    classDef subg fill:none,stroke:#444,stroke-width:1px,stroke-dasharray: 5 5;

    %% Components
    subgraph Clients ["📱 Your Devices"]
        C1("💻 Laptop") ::: client
        C2("📱 Smartphone") ::: client
        C3("📺 Smart TV / IoT") ::: client
    end

    subgraph ADBlock_PD ["🛡️ ADBlock-PD (Docker: debian-slim)"]
        direction TB
        Proto["🔒 DoH / DoT / DoQ"]:::server
        Engine["⚡ DNS & Filtering Engine"]:::server
        Proto --> Engine
        
        subgraph Hardening ["🔒 Security & Hardening"]
            H1["🔇 Zero Telemetry"]
            H2["🚀 No Updater (Anti-RCE)"]
            H3["🔄 Auto-Heal (Healthcheck)"]
        end
        Engine -.-> Hardening
    end

    subgraph Logic ["⚙️ Filtering Logic"]
        direction LR
        Rules["🛑 Blocklists & Rules"]:::filter
    end

    subgraph Outcomes ["🌐 Resolution"]
        Null["🕳️ Blackhole (0.0.0.0)"]:::block
        U1["🌍 Upstream (Cloudflare/ControlD)"]:::upstream
    end

    %% Connections
    C1 -->|Encrypted DNS| Proto
    C2 -->|Encrypted DNS| Proto
    C3 -->|Plain/Encrypted| Proto

    Engine ==> Logic
    Logic =="Ads / Trackers / Phishing"==> Null
    Logic =="Clean Traffic"==> U1
```

## ✨ Key Hardening Features

### 🚀 Purged Updater (RCE Protection)
The original `internal/updater` module has been physically removed from the source code. The server will **never** ping `static.adtidy.org` to check for updates. This eliminates a potential Remote Code Execution (RCE) vector through compromised updates or malicious infrastructure.

### 🔒 DNS Hardening & Zero Phone-Home
- **SafeBrowsing & Parental Control:** In the original version, these features send hashes of your queries to AdGuard servers. In **ADBlock-PD**, the suffixes are nullified, and requests are forcefully redirected to `127.0.0.1`. The features are isolated.
- **WHOIS Privacy:** The built-in WHOIS client has been replaced with a dummy stub (`whois.Empty`). The IP addresses of devices in your network are never transmitted to external servers (e.g., `whois.arin.net`).

### 🔇 Zero Telemetry & Rebranding
All links in the web interface (React) that led to AdGuard trackers, analytics, or external documentation have been replaced with neutral stubs. The project has received a new adaptive SVG logo and a complete visual identity overhaul.

### 🔄 Self-Healing Architecture
The container is equipped with a built-in `HEALTHCHECK` based on the `host` utility. Every 30 seconds, the system verifies the vitality of the DNS resolver (`127.0.0.1:53`). If the service hangs, Docker will automatically restart it, guaranteeing a stable internet connection in your network.

### 🐧 Lightweight & Secure Base
The final Docker image is based on `debian:bullseye-slim`. The service runs as an unprivileged user (`UID 10001`), utilizing the `--no-permcheck` flag for a secure startup in an isolated Docker environment. The default timezone is set to `Europe/Kyiv`.

---

## 🚀 Quick Start (Docker)

The recommended way to deploy ADBlock-PD is via Docker.

### Option 1: Docker CLI

```bash
docker run -d --name adblock-pd \
  -v $(pwd)/data:/opt/adblock-pd/data \
  -v $(pwd)/conf:/opt/adblock-pd/conf \
  -p 53:53/udp -p 53:53/tcp \
  -p 80:80/tcp -p 3000:3000/tcp \
  -p 443:443/tcp -p 443:443/udp \
  -p 853:853/tcp -p 853:853/udp \
  --restart always \
  webyhomelab/adblock-pd:latest
```

### Option 2: Docker Compose

Create a `docker-compose.yml` file:

```yaml
version: "3.8"
services:
  adblock-pd:
    image: webyhomelab/adblock-pd:latest
    container_name: adblock-pd
    restart: always
    ports:
      - "53:53/tcp"
      - "53:53/udp"
      - "80:80/tcp"        # Web Admin
      - "3000:3000/tcp"    # Initial Setup Wizard
      - "443:443/tcp"      # DoH / HTTPS
      - "443:443/udp"      # HTTP/3
      - "853:853/tcp"      # DoT
      - "853:853/udp"      # DoQ
    volumes:
      - ./data:/opt/adblock-pd/data
      - ./conf:/opt/adblock-pd/conf
```

Run it:
```bash
docker-compose up -d
```

> **Note:** After the first launch, navigate to `http://<your-ip>:3000` to complete the initial setup wizard.

---

## 🛠 Building from Source

If you want to build the project yourself, you will need Docker (for the multi-stage build process).

```bash
git clone https://github.com/weby-homelab/adblock-pd.git
cd adblock-pd
docker build -t adblock-pd:local .
```

---

## 📜 License & Disclaimer

This project is distributed under the **GNU General Public License v3.0 (GPL-3.0)**. 
It is provided "AS IS". The Weby Homelab team assumes no liability for any network disruptions, data loss, or other consequences resulting from the use of this software.

---
<p align="center">
  <b>Made with ❤️ in Kyiv under air raid sirens and blackouts.</b><br>
  Weby Homelab - Security First. Your Privacy, Your Rules.
</p>
