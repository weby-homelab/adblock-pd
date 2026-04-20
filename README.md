# 🛡️ ADBlock-Private-DNS (Hardened Fork) v0.9.1

<p align="center">
  <img src="https://raw.githubusercontent.com/weby-homelab/adblock-pd/main/client/src/components/ui/svg/logo.tsx" width="400" alt="ADBlock-PD Logo">
</p>

**ADBlock-Private-DNS (ADBlock-PD)** — це максимально очищений, безпечний та ребрендований форк AdGuard Home, створений командою **Weby Homelab**.

## ✨ Ключові особливості

1.  **🚀 Пурген Updater:** Модуль `internal/updater` повністю видалено. Система ніколи не завантажить сторонній код та не буде "стукати" за оновленнями.
2.  **🔒 DNS Hardening:**
    *   **Zero Phone-Home:** Видалено дефолтні суфікси для Safe Browsing та Parental Control. Запити більше не надсилаються на сервери AdGuard.
    *   **WHOIS Privacy:** Реалізація WHOIS замінена на порожню (`whois.Empty`). IP вашої мережі не покидають сервера.
3.  **🔇 Zero Telemetry:** Всі посилання у фронтенді (React) на трекери та аналітику замінені на заглушки.
4.  **🎨 New Identity:** Новий адаптивний SVG логотип (світла/темна теми) та повний ребрендинг.
5.  **🔄 Self-Healing:** Вбудований DNS-based `HEALTHCHECK` для автоматичного рестарту при зависанні.
6.  **🇺🇦 UA-Ready:** Часовий пояс `Europe/Kyiv` за замовчуванням.

## 🚀 Як запустити (Docker)

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
Made with ❤️ in Kyiv under air raid sirens and blackouts.
**Weby Homelab** - Your Privacy, Your Rules.
