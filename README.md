# WhatsApp Number Cleaner

Cloudflare Worker that parses and cleans phone numbers, then redirects to WhatsApp conversations.

## 🎯 Purpose

This worker accepts any phone number format (with spaces, dashes, parentheses, international prefixes) and automatically cleans it to redirect to the correct WhatsApp conversation URL.

## 🚀 Usage

```
https://wa-cleaner.yourname.workers.dev/?action=ACTION&q=PHONE_NUMBER
```

### Actions

| Action | Description | Example URL |
|--------|-------------|-------------|
| `wchat` (default) | Open WhatsApp chat | `?action=wchat&q=34612345678` |
| `wcall` | Call via WhatsApp | `?action=wcall&q=34612345678` |
| `call` | Call via phone app | `?action=call&q=34612345678` |

If no action is specified, defaults to `wchat`.

### Examples

**WhatsApp Chat (default):**
| Input | Cleaned | Redirects to |
|-------|---------|-------------|
| `?action=wchat&q=34612345678` | `34612345678` | https://web.whatsapp.com/send/?phone=34612345678 |
| `?q=+34 612 34 56 78` | `34612345678` | https://web.whatsapp.com/send/?phone=34612345678 |

**WhatsApp Call:**
| Input | Cleaned | Redirects to |
|-------|---------|-------------|
| `?action=wcall&q=34612345678` | `34612345678` | https://wa.me/34612345678?call |

**Phone Call:**
| Input | Cleaned | Redirects to |
|-------|---------|-------------|
| `?action=call&q=34612345678` | `34612345678` | tel:34612345678 |

## ✨ Features

- Removes spaces, dashes, parentheses, and other non-numeric characters
- Converts `00XX` prefix to international format `+XX`
- Multiple actions:
  - **wchat**: Opens WhatsApp Web chat
  - **wcall**: Initiates WhatsApp call
  - **call**: Opens phone dialer (tel: protocol)
- Returns 400 error for invalid/empty numbers

## 🔌 Browser Extension Integration

### Option 1: Context Menu Search

Perfect for use with **Context Menu Search** extension:

**WhatsApp Chat:**
```json
{
  "id": "whatsapp-chat",
  "type": "search",
  "name": "WhatsApp Chat",
  "link": "https://wa-cleaner.yourname.workers.dev/?action=wchat&q=TESTSEARCH",
  "enabled": true
}
```

**WhatsApp Call:**
```json
{
  "id": "whatsapp-call",
  "type": "search",
  "name": "WhatsApp Call",
  "link": "https://wa-cleaner.yourname.workers.dev/?action=wcall&q=TESTSEARCH",
  "enabled": true
}
```

**Phone Call:**
```json
{
  "id": "phone-call",
  "type": "search",
  "name": "Phone Call",
  "link": "https://wa-cleaner.yourname.workers.dev/?action=call&q=TESTSEARCH",
  "enabled": true
}
```

**Usage:** Select any phone number on a webpage → Right-click → Choose action

### Option 2: One Click (Recommended)

More visual option with **One Click** extension:

**Configuration:**

1. **WhatsApp Chat**
   - Name: `WhatsApp Chat`
   - URL: `https://wa-cleaner.yourname.workers.dev/?action=wchat&q=%s`
   - Icon: `https://static.whatsapp.net/rsrc.php/v3/yz/r/ujTY9i_Jhs1.png`

2. **WhatsApp Call**
   - Name: `WhatsApp Call`
   - URL: `https://wa-cleaner.yourname.workers.dev/?action=wcall&q=%s`
   - Icon: `https://static.whatsapp.net/rsrc.php/v3/yz/r/ujTY9i_Jhs1.png`

3. **Phone Call**
   - Name: `Phone Call`
   - URL: `https://wa-cleaner.yourname.workers.dev/?action=call&q=%s`
   - Icon: `https://cdn-icons-png.flaticon.com/512/724/724664.png`

**Usage:** Select phone number → Visual popup appears → Click icon

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
