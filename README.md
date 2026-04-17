# 🤖 ChatGPT Clone - Free AI Chatbot

> A complete, production-ready ChatGPT-like web application using **100% FREE AI** (Hugging Face).

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green.svg?style=for-the-badge)

## ✨ Key Features

### 🎨 Modern UI
- **ChatGPT-style design** - Clean, responsive interface
- **Message bubbles** - User messages right (purple), AI left (white)
- **Smooth animations** - Slide-in messages, typing indicator
- **Mobile responsive** - Works perfectly on phones & tablets
- **Dark/Light ready** - Easy to customize

### 🤖 AI Features
- **Real AI responses** - Uses free Hugging Face API (Mistral model)
- **Conversation memory** - Maintains full chat history context
- **Typing animation** - Shows when AI is thinking
- **Auto-scroll** - Always shows latest messages
- **Error handling** - Graceful error messages

### ⚡ Performance
- **Fast responses** - First response ~10-15s, others ~2-5s
- **Lightweight** - Minimal dependencies
- **Optimized** - Production-ready code
- **Scalable** - Easy to add features

### 🔒 Security & Privacy
- **No paid APIs** - 100% free forever
- **No tracking** - Open source, transparent
- **Local processing** - Your messages go to Hugging Face (not stored)
- **Environment variables** - Secure key management

## 🚀 Quick Start

### Prerequisites
- Node.js v14+ ([Download](https://nodejs.org/))
- Free Hugging Face account ([Sign up](https://huggingface.co/))

### 1. Get Free API Key
```bash
# Visit: https://huggingface.co/settings/tokens
# Sign up → Create token → Copy it
```

### 2. Setup Project
```bash
# Install dependencies
npm install
cd client && npm install && cd ..
```

### 3. Configure
```bash
# Create .env file
cp .env.example .env

# Edit .env and add your token:
# HUGGINGFACE_API_KEY=hf_your_token_here
```

### 4. Run
```bash
# Terminal 1 - Backend
npm start

# Terminal 2 - Frontend
cd client && npm run dev
```

### 5. Chat!
Open http://localhost:5173 and start chatting! 🎉

## 📋 What's Included

```
chatgpt-clone/
├── 📄 SETUP.md                 # Detailed setup guide
├── 📄 QUICKSTART.md            # 5-minute quick start
├── 📄 README.md                # This file
├── 📝 .env.example             # Environment template
├── 📦 package.json             # Backend dependencies
│
├── 🖥️  server/
│   └── server.js               # Express API server
│       ├── POST /chat          # Chat endpoint
│       └── GET /health         # Health check
│
└── 🎨 client/
    ├── vite.config.js          # Vite config
    ├── index.html              # HTML entry
    └── src/
        ├── main.jsx            # React entry
        ├── App.jsx             # Main component
        ├── index.css           # Global styles
        ├── App.css             # App styles
        └── components/
            ├── ChatWindow.jsx
            ├── ChatWindow.css
            ├── Message.jsx
            ├── Message.css
            ├── InputBox.jsx
            └── InputBox.css
```

## 🔧 API Documentation

### POST /chat
Send messages and get AI response.

**Request:**
```bash
curl -X POST http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "Hello!"},
      {"role": "assistant", "content": "Hi there!"},
      {"role": "user", "content": "How are you?"}
    ]
  }'
```

**Response:**
```json
{
  "reply": "I'm doing great, thanks for asking!",
  "model": "mistralai/Mistral-7B-Instruct-v0.1",
  "tokens_used": 45
}
```

### GET /health
Check server status.

```bash
curl http://localhost:3000/health
```

**Response:**
```json
{
  "status": "Server is running",
  "ai_model": "mistralai/Mistral-7B-Instruct-v0.1"
}
```

## 🎯 Available AI Models

All free! Choose any Hugging Face model:

| Model | Speed | Quality | Notes |
|-------|-------|---------|-------|
| `mistralai/Mistral-7B-Instruct-v0.1` | ⭐⭐⭐ | ⭐⭐⭐ | **Recommended** |
| `meta-llama/Llama-2-7b-chat-hf` | ⭐⭐ | ⭐⭐⭐ | Very good |
| `tiiuae/falcon-7b-instruct` | ⭐⭐ | ⭐⭐ | Fast |
| `gpt2` | ⭐⭐⭐⭐ | ⭐ | Super fast |

**Change model in `.env`:**
```env
HF_MODEL=mistralai/Mistral-7B-Instruct-v0.1
```

## 📱 Screenshots

### Desktop View
```
┌─────────────────────────────────────────┐
│ 🤖 ChatGPT     [New Chat] 🗑️       │
├─────────────────────────────────────────┤
│                                         │
│  👤 Hello, how are you?                │
│                                         │
│  🤖 I'm doing great! How can I help?   │
│                                         │
│  👤 Tell me about yourself              │
│                                         │
│  🤖 (typing indicator...)               │
│                                         │
├─────────────────────────────────────────┤
│ [Type message...] [➤]                   │
└─────────────────────────────────────────┘
```

## 🛠️ Customization

### Change Colors
Edit `client/src/index.css`:
```css
:root {
  --primary-color: #667eea;      /* Purple */
  --secondary-color: #764ba2;    /* Pink */
  --background: #f5f5f5;         /* Light gray */
}
```

### Change AI System Prompt
Edit `server/server.js` (around line 50):
```javascript
messages: [
  {
    role: "system",
    content: "You are a helpful AI assistant that specializes in..." // Edit here
  },
  ...formattedMessages
]
```

### Change UI Text
Edit `client/src/App.jsx`:
```javascript
content: '👋 Hello! I\'m your AI assistant. Ask me anything!' // Edit here
```

## 🚀 Deployment

### Frontend (Vercel - Free)
```bash
cd client
npm run build
# Upload 'dist' folder to vercel.com
```

### Backend (Railway - Free)
1. Push code to GitHub
2. Connect repo to railway.app
3. Add environment variable: `HUGGINGFACE_API_KEY`
4. Deploy!

**Update frontend API URL** in `client/src/App.jsx`:
```javascript
// Before deployment, change:
fetch('http://localhost:3000/chat')
// To:
fetch('https://your-railway-app.railway.app/chat')
```

## 🐛 Troubleshooting

### "Cannot connect to server"
```bash
# Check if server is running
curl http://localhost:3000/health

# If not, restart:
npm start
```

### "Invalid Hugging Face API key"
- Get new token: https://huggingface.co/settings/tokens
- Update `.env` file
- Restart server

### "Rate limit reached"
- Free tier: 30k requests/month
- Wait a few minutes and retry
- Or upgrade to Pro ($9/month)

### "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### "Port already in use"
```bash
# Kill process on port 3000
lsof -i :3000
kill -9 <PID>

# Or use different port:
PORT=3001 npm start
```

See [SETUP.md](./SETUP.md) for more troubleshooting.

## 📊 Performance

| Metric | Value |
|--------|-------|
| First response | ~10-15 seconds |
| Subsequent responses | ~2-5 seconds |
| Message context | Full conversation |
| Model size | ~7 billion parameters |
| Free tier requests/month | 30,000 |
| Cost | **$0** ✅ |

## 🔐 Security Notes

- ✅ API key stored locally in `.env` (git-ignored)
- ✅ No user data collected
- ✅ No tracking/analytics
- ✅ CORS enabled for local development
- ⚠️ In production, restrict CORS origins

## 💻 Tech Stack

### Backend
- **Express.js** - Lightweight web framework
- **Node.js** - JavaScript runtime
- **node-fetch** - HTTP client
- **dotenv** - Environment variables
- **CORS** - Cross-origin support

### Frontend
- **React 18** - UI library
- **Vite** - Lightning fast build tool
- **CSS3** - Styling & animations
- **Responsive Design** - Mobile-first

## 📈 Project Roadmap

- [x] Basic chat interface
- [x] Free AI integration
- [x] Message history
- [x] Error handling
- [ ] Dark mode
- [ ] Multiple AI models selector
- [ ] Conversation export
- [ ] Voice input/output
- [ ] User authentication
- [ ] Message search
- [ ] Chat history persistence
- [ ] Rate limiting UI

## 🤝 Contributing

Found a bug or have an improvement?

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

MIT License - Free to use and modify. See [LICENSE](./LICENSE) file.

## ❓ FAQ

**Q: Is this completely free?**
A: Yes! Hugging Face free tier offers 30k requests/month at $0.

**Q: Can I use different AI models?**
A: Yes! Any Hugging Face model works. See "Available AI Models" section.

**Q: How do I deploy this?**
A: See "Deployment" section. Free options: Vercel (frontend) + Railway (backend).

**Q: Does it work without internet?**
A: No, requires internet connection for Hugging Face API.

**Q: Can I modify the code?**
A: Absolutely! It's MIT licensed. Modify freely.

**Q: What if I hit rate limits?**
A: Free tier has limits. Wait a moment or upgrade to Pro.

**Q: Can I use this commercially?**
A: Yes, MIT license allows commercial use.

## 📞 Support

- 📖 **Setup Help**: See [SETUP.md](./SETUP.md)
- ⚡ **Quick Start**: See [QUICKSTART.md](./QUICKSTART.md)
- 🐛 **Issues**: Check troubleshooting section
- 💬 **Questions**: Open a GitHub issue

## 🙏 Acknowledgments

- Hugging Face - Free AI API
- Mistral AI - Amazing model
- React team - Excellent framework
- Vite team - Fast build tool

---

<div align="center">

### ⭐ If you found this helpful, please give it a star!

**Made with ❤️ for the open source community**

[⬆ back to top](#-chatgpt-clone---free-ai-chatbot)

</div>
