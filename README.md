# WhatsApp Number Cleaner

Cloudflare Worker that parses and cleans phone numbers, then redirects to WhatsApp conversations.

## 🎯 Purpose

This worker accepts any phone number format (with spaces, dashes, parentheses, international prefixes) and automatically cleans it to redirect to the correct WhatsApp conversation URL.

## 🚀 Usage

```
https://wa-cleaner.yourname.workers.dev/?q=PHONE_NUMBER
```

### Examples

| Input | Cleaned | Redirects to |
|-------|---------|-------------|
| `?q=34612345678` | `34612345678` | https://wa.me/34612345678 |
| `?q=+34 612 34 56 78` | `34612345678` | https://wa.me/34612345678 |
| `?q=(34) 612-345-678` | `34612345678` | https://wa.me/34612345678 |
| `?q=0034612345678` | `34612345678` | https://wa.me/34612345678 |

## ✨ Features

- Removes spaces, dashes, parentheses, and other non-numeric characters
- Converts `00XX` prefix to international format `+XX`
- Redirects directly to WhatsApp Web/App
- Returns 400 error for invalid/empty numbers

## 🔌 Browser Extension Integration

Perfect for use with **Context Menu Search** extension:

```json
{
  "id": "whatsapp-cleaner",
  "type": "search",
  "name": "WhatsApp Cleaner",
  "link": "https://wa-cleaner.yourname.workers.dev/?q=TESTSEARCH",
  "enabled": true
}
```

Select any phone number on a webpage → Right-click → "WhatsApp Cleaner" → Opens WhatsApp chat

## 📦 Deployment

### Manual Deployment

```bash
npm install -g wrangler
wrangler login
wrangler deploy
```

### Auto-Deployment from GitHub

This project includes GitHub Actions for automatic deployment:

1. Get your Cloudflare API Token:
   - Go to https://dash.cloudflare.com/profile/api-tokens
   - Create Token → Use "Edit Cloudflare Workers" template
   - Copy the token

2. Add to GitHub Secrets:
   - Go to your repo → Settings → Secrets and variables → Actions
   - New repository secret: `CLOUDFLARE_API_TOKEN`
   - Paste your token

3. Push to `main` branch → Auto-deploys! ✨

## 📄 License

MIT
