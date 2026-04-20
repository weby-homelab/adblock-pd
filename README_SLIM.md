# 🛡️ ADBlock-Private-DNS (Hardened Fork)

**ADBlock-Private-DNS (ADBlock-PD)** — це максимально очищений, безпечний та ребрендований форк AdGuard Home v0.107.74, створений командою **Weby Homelab**.

Цей проект призначений для тих, хто цінує функціональність оригінального DNS-сервера, але хоче мати повний контроль над своєю приватністю: без телеметрії, без авто-оновлень та без зв'язків з інфраструктурою AdGuard.

## ✨ Ключові особливості

1.  **🚀 Пурген Updater:** Видалено модуль `internal/updater`. Система ніколи не завантажить сторонній код без вашого відома.
2.  **🔒 DNS Hardening:**
    *   Вимкнено Safe Browsing та Parental Control (обнулені суфікси, запити йдуть на loopback).
    *   Реалізація WHOIS замінена на порожню для захисту IP клієнтів.
3.  **🔇 Zero Telemetry:** Всі посилання у фронтенді на трекери AdGuard замінені на заглушки.
4.  **🎨 New Identity:** Новий сучасний SVG логотип та назва **ADBlock-PD**.
5.  **🔄 Self-Healing:** Вбудований DNS-based `HEALTHCHECK` для автоматичного рестарту при зависанні.

## 🚀 Як запустити

```bash
docker build -t adblock-pd .

docker run -d --name adblock-pd \
  -v $(pwd)/data:/opt/adblock-pd/data \
  -v $(pwd)/conf:/opt/adblock-pd/conf \
  -p 53:53/udp -p 53:53/tcp \
  -p 80:80/tcp \
  -p 443:443/tcp -p 443:443/udp \
  -p 853:853/tcp -p 853:853/udp \
  --restart always \
  adblock-pd
```

---
**Weby Homelab** - Your Privacy, Your Rules.
