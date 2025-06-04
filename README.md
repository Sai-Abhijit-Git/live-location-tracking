# Live Location Tracking App

A mobile-friendly real-time location tracking web application built with Node.js, Express, Socket.IO, and Leaflet.js.

## Features

🔥 **Real-time location sharing** via WebSockets
📱 **Mobile-friendly** responsive design  
🗺️ **Interactive maps** with Leaflet.js
🆓 **Free hosting** ready for Render
🔒 **Privacy-focused** - no data persistence

## Live Demo

- **Share Location**: Visit `/share` on mobile device
- **Track Location**: Visit `/track` to see live map
- **Home**: Main landing page with navigation

## Local Development

```bash
npm install
npm start
```

Visit `http://localhost:3000`

## Deploy to Render

1. Push code to GitHub repository
2. Connect repository to Render
3. Create new Web Service
4. Use these settings:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node.js

## Technology Stack

- **Backend**: Node.js + Express + Socket.IO
- **Frontend**: Vanilla JavaScript + Leaflet.js
- **Maps**: OpenStreetMap (free)
- **Hosting**: Render (free tier)

## How It Works

1. **Share Screen**: Uses Geolocation API to get device location
2. **Real-time Updates**: Sends location via WebSocket every few seconds
3. **Track Screen**: Displays live map with moving marker
4. **Mobile Optimized**: Works perfectly on iOS/Android browsers

## Browser Support

✅ Chrome/Safari (iOS & Android)  
✅ Firefox  
✅ Edge  
⚠️ Requires HTTPS for geolocation (Render provides this automatically)
