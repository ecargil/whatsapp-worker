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
| `?q=34612345678` | `34612345678` | https://web.whatsapp.com/send/?phone=34612345678 |
| `?q=+34 612 34 56 78` | `34612345678` | https://web.whatsapp.com/send/?phone=34612345678 |
| `?q=(34) 612-345-678` | `34612345678` | https://web.whatsapp.com/send/?phone=34612345678 |
| `?q=0034612345678` | `34612345678` | https://web.whatsapp.com/send/?phone=34612345678 |

## ✨ Features

- Removes spaces, dashes, parentheses, and other non-numeric characters
- Converts `00XX` prefix to international format `+XX`
- Opens WhatsApp Web directly with the conversation ready
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

### Option 1: GitHub Actions (Recommended)

Automatic deployment on every push to `main`:

1. **Get Cloudflare API Token:**
   - Go to https://dash.cloudflare.com/profile/api-tokens
   - Click "Create Token" → Use "Edit Cloudflare Workers" template
   - Copy the generated token

2. **Add Token to GitHub:**
   - Go to your repo → Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `CLOUDFLARE_API_TOKEN`
   - Value: Paste your token
   - Click "Add secret"

3. **Push to main branch:**
   ```bash
   git push origin main
   ```
   GitHub Actions will automatically deploy! ✨

### Option 2: Cloudflare Dashboard (Direct GitHub Integration)

1. **Connect GitHub to Cloudflare:**
   - Go to https://dash.cloudflare.com
   - Workers & Pages → Create application → Pages → Connect to Git
   - Click "Connect GitHub" and authorize Cloudflare
   - Select repository: `whatsapp-worker`

2. **Configure Build Settings:**
   - Framework preset: `None`
   - Build command: (leave empty)
   - Build output directory: `/`
   - Root directory: `/`

3. **Environment Variables:**
   - No environment variables needed

4. **Deploy:**
   - Click "Save and Deploy"
   - Every push to `main` will auto-deploy

### Option 3: Manual Deployment

```bash
npm install -g wrangler
wrangler login
wrangler deploy
```

## 📄 License

CC BY-NC 4.0 - Attribution required, non-commercial use only
