# Security Policy 🔐

## Supported Versions

The following versions are currently supported with security updates:

| Version | Supported |
| :--- | :--- |
| main | ✅ Security updates |
| 1.0.x | ⚠️ Best-effort |

## Reporting a Vulnerability

We take all security bugs seriously. Thank you for improving the security of the Noosphere Research Hub.

### To report a vulnerability

1. **Private Issue**: Use a [GitHub Security Advisory](https://github.com/acidgreenservers/Noosphere-Research/security/advisories/new) (preferred).
2. **Email**: Contact the maintainers at [acidgreenservers@proton.me](mailto:acidgreenservers@proton.me).

We will acknowledge your report within **24 hours** and provide a detailed response within **48 hours**.

## Handling Sensitive Data

- **API Keys**: All AI tools use ephemeral API keys provided by the user via OpenRouter. These keys are held in memory only (`ApiKeyContext`) and are **never** persisted in `localStorage`, `sessionStorage`, or logs.
- **Wiping**: Keys are automatically wiped on page refresh.
- **Secrets**: No project secrets or backend keys are stored in the client-side code.

## Hardening Checklist

- [x] Ephemeral API key management (Memory only)
- [x] Sanitized user inputs for tool interactions
- [x] Security headers for GitHub Pages (standard defaults)
- [x] No sensitive PII collected by the platform
- [x] Dependency scanning via GitHub Actions

## Contact

- **Security Maintainer**: @acidgreenservers
