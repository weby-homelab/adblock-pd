# 🛡️ ADBlock-Private-DNS (Hardened Fork) v0.9.1

**ADBlock-Private-DNS (ADBlock-PD)** is a highly sanitized, secure, and rebranded fork of AdGuard Home, developed by **Weby Homelab**.

## ✨ Key Features

1.  **🚀 Purged Updater:** The `internal/updater` module is physically removed. The system will never download third-party code or phone home for updates.
2.  **🔒 DNS Hardening:**
    *   **Zero Phone-Home:** Default suffixes for Safe Browsing and Parental Control are neutralized. No more data leaks to AdGuard servers.
    *   **WHOIS Privacy:** WHOIS implementation is replaced with a stub (`whois.Empty`). Your network IPs never leave the server.
3.  **🔇 Zero Telemetry:** All frontend links to AdGuard trackers and analytics are replaced with neutral stubs.
4.  **🎨 New Identity:** Modern adaptive SVG logo (supports light/dark modes) and full project rebranding.
5.  **🔄 Self-Healing:** Built-in DNS-based `HEALTHCHECK` for automatic container restart on failure.
6.  **🇺🇦 Localized:** `Europe/Kyiv` timezone set by default.

## 🚀 Quick Start (Docker)

```bash
docker pull webyhomelab/adblock-pd:0.9.1

docker run -d --name adblock-pd \
  -v /opt/adblock-pd/data:/opt/adblock-pd/data \
  -v /opt/adblock-pd/conf:/opt/adblock-pd/conf \
  -p 53:53/udp -p 53:53/tcp \
  -p 80:80/tcp \
  -p 443:443/tcp -p 443:443/udp \
  -p 853:853/tcp -p 853:853/udp \
  --restart always \
  webyhomelab/adblock-pd:latest
```

---
**Weby Homelab** - Your Privacy, Your Rules.
