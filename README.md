# Kabaw.ai Chat Client

A modern React-based chat application with real-time WebSocket communication and cross-origin support.

## Features

- ✨ Real-time messaging via WebSocket
- 🔄 Automatic reconnection with exponential backoff
- 🎨 Modern UI built with Tailwind CSS
- 🔌 Cross-origin WebSocket support
- 📱 Responsive design
- 🚀 Built with React 19 and Vite

## Quick Start

### Prerequisites

- Node.js (v16+)
- Go server running on `ws://localhost:8080/ws`

### Installation

```bash
npm install
```

### Development

Start the development server on `http://localhost:6969`:

```bash
npm run dev
```

### Build

Create optimized production build:

```bash
npm build
```

### Preview

Preview production build locally:

```bash
npm run preview
```

## Cross-Origin WebSocket Configuration

This application demonstrates proper cross-origin WebSocket support.

### Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Browser Client                        │
│  HTML/CSS/JS served on http://localhost:6969 (Vite)     │
└──────────────────────────────────────────────────────────┘
                          ↓
                  WebSocket Connection
                          ↓
┌──────────────────────────────────────────────────────────┐
│                   WebSocket Server                        │
│     Go server running on ws://localhost:8080/ws          │
│                (Different Port = CORS)                   │
└──────────────────────────────────────────────────────────┘
```

### How It Works

#### Server-Side (Go)

The WebSocket server enables cross-origin connections using CORS:

```go
var upgrader = websocket.Upgrader{
    CheckOrigin: func(r *http.Request) bool {
        // Allow connections from any origin (development)
        return true
    },
}
```

**Key Points:**
- `CheckOrigin` returns `true` for all requests, allowing any domain/port
- Bypasses browser's same-origin policy for WebSocket upgrades
- Necessary because client (port 6969) ≠ server (port 8080)

#### Client-Side (JavaScript/React)

The client connects via WebSocket from a different origin:

```javascript
// Served from http://localhost:6969
// Connects to ws://localhost:8080
const wsUrl = `ws://localhost:8080/ws?username=${username}&channel=general`;
const ws = new WebSocket(wsUrl);
```

**Browser Behavior:**
- Detects different port → cross-origin request
- Checks server's `CheckOrigin` response
- Server returns `true` → connection allowed
- WebSocket established successfully

### Testing Steps

1. **Start WebSocket Server (Port 8080)**

   ```bash
   cd ../backend  # Navigate to Go server
   go run main.go
   ```

2. **Start Chat Client (Port 6969)**

   ```bash
   npm install
   npm run dev
   ```

3. **Open in Browser**

   - Navigate to `http://localhost:6969`
   - Status indicator shows connection state
   - Send/receive messages in real-time

### Production Security

For production deployments, restrict origins to specific domains:

```go
CheckOrigin: func(r *http.Request) bool {
    origin := r.Header.Get("Origin")
    allowedOrigins := map[string]bool{
        "https://yourdomain.com": true,
        "https://app.yourdomain.com": true,
    }
    return allowedOrigins[origin]
}
```

## Project Structure

```
chat-client/
├── src/
│   ├── components/
│   │   ├── ChatHeader.jsx      # Connection status & user info
│   │   └── MessageList.jsx     # Message display with styling
│   ├── hooks/
│   │   └── useWebSocket.js     # WebSocket connection logic
│   ├── utils/
│   │   └── helpers.js          # Utility functions
│   ├── App.jsx                 # Main app component
│   ├── App.css                 # App styles
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles with Tailwind
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Key Components

### useWebSocket Hook

Manages WebSocket connection lifecycle:

- **Connection**: Establishes WebSocket to server
- **Auto-reconnect**: Reconnects after 3 seconds on disconnect
- **Message handling**: Parses and stores incoming messages
- **Duplicate prevention**: Prevents multiple connections in React Strict Mode

```javascript
const { messages, status, userId, sendMessage } = useWebSocket(url, username);
```

### ChatHeader Component

Displays application header with connection status:
- Animated status indicator (green/yellow/red)
- Connection state display
- User ID preview

### MessageList Component

Renders chat messages with:
- Different styling for sent vs received messages
- Username and timestamp
- System messages for connection events
- Auto-scroll to latest message

## Styling

Uses **Tailwind CSS** for all component styling:

- Utility-first approach
- Responsive design
- Built-in form styling with `@tailwindcss/forms`
- Minimal custom CSS

### Color Scheme

- **Connected**: Green (#31a24c)
- **Connecting**: Yellow (#f7b928)
- **Disconnected**: Red (#fa3e3e)
- **Primary**: Blue (#0084ff)
- **Background**: Gray (#f0f2f5)

## Development Notes

### Debugging

- Browser DevTools → Network tab to inspect WebSocket messages
- Console logs WebSocket events: "WS Connected", "WS Message", etc.
- Check browser console for connection errors

### Common Issues

**Messages duplicating in dev:**
- Caused by React Strict Mode double-invoking effects
- Fixed with connection state checking
- Only occurs in development mode

**Cannot connect to WebSocket:**
- Ensure Go server is running on port 8080
- Check firewall allows local port connections
- Verify `CheckOrigin` returns `true` on server

**CORS errors:**
- Add `CheckOrigin` configuration to Go server
- Ensure client WebSocket URL matches server endpoint
- Check browser console for detailed error messages

## Technologies

- **React 19.2** - UI framework
- **Vite 7.2** - Build tool and dev server
- **Tailwind CSS 3.4** - Utility CSS framework
- **WebSocket** - Real-time communication
- **Go** - Backend server (separate repository)

## License

MIT
