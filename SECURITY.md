# Security Policy

## Supported Versions

Currently, the following versions of ADBlock-Private-DNS are supported with security updates:

| Version | Supported          |
| ------- | ------------------ |
| v0.9.x  | :white_check_mark: |
| < v0.9  | :x:                |

## Reporting a Vulnerability

**ADBlock-Private-DNS (ADBlock-PD)** is a heavily hardened fork created by **Weby Homelab**. Our primary focus is on privacy, removing telemetry, and eliminating potential Remote Code Execution (RCE) vectors present in the original upstream codebase (such as the auto-updater).

If you discover a vulnerability in our specific hardening patches, build process, or implementation:

1. **Do NOT open a public issue.**
2. Send an email to **[contact@srvrs.top](mailto:contact@srvrs.top)** with the subject `[SECURITY] ADBlock-PD Vulnerability Report`.
3. Include a detailed description of the issue, steps to reproduce it, and (if possible) a proof-of-concept.

We will acknowledge your report within 48 hours and work with you to resolve the issue as quickly as possible.

### Upstream Vulnerabilities
Since ADBlock-PD is a fork of AdGuard Home, some vulnerabilities may stem from the upstream codebase. 
- If the vulnerability is related to the core DNS/filtering engine, we recommend checking if it has been reported to the original developers.
- However, if the upstream vulnerability affects ADBlock-PD, please report it to us so we can patch our fork immediately. We will not wait for upstream patches if our users are at risk.

## Our Security Mandate
- **Zero Telemetry:** We proactively remove all code that attempts to phone home.
- **No Auto-Updates:** We believe auto-updaters are a security risk. All updates must be applied manually via Docker image pulls.
- **Unprivileged Execution:** We enforce running the service as an unprivileged user (`UID 10001`) in Docker.

Thank you for helping keep ADBlock-PD safe and private! 🛡️🇺🇦
