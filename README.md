# Devify - Spotify Edition Portfolio

Devify is a high-fidelity, interactive software developer portfolio designed with the exact aesthetic and user experience of the Spotify desktop application. It transforms traditional resume elements into a musical journey, where projects are "tracks," skills are "genres," and your professional story is the "liner notes."

## 🎵 Key Features

### 💿 Project Playlists
- **Featured Collections**: Browse key projects in a grid layout. Clicking a card opens a detailed modal with comprehensive descriptions, live demos, and repository links.
- **Popular Tracks**: View projects in a list format, complete with "star counts" (acting as track popularity) and tech stack metadata.
- **Immersive Lyrics View**: "Play" a project to enter an immersive full-screen view where the project's description is rendered as synchronized lyrics against a vibrant, dynamic background.

### 🎤 Immersive Bio ("Liner Notes")
- Clicking the **Play** button in the hero section or the **About** button launches a specialized "Bio View."
- Your professional background is presented in a full-screen, minimalist interface inspired by Spotify's artist biographies, featuring bold typography and smooth animations.

### 🔍 AI-Powered Discovery
- **Gemini Search**: An integrated search bar powered by Google's Gemini API. Users can ask questions like "What projects use React?" or "Tell me about Alex's experience at Tech Giant Inc," and receive concise, personality-driven responses.

### 🎨 Authentic UI/UX
- **Player Bar**: A persistent bottom bar showing the "currently playing" project, playback controls, and volume sliders.
- **Sidebar Navigation**: Fully functional navigation between Home, Search, and Library views.
- **Responsive Animations**: Custom Spotify-like easing, slide-up transitions for modals, and hover scales for a premium feel.

## 🛠️ Technology Stack

- **Frontend**: [React](https://react.dev/) (v19)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **AI Brain**: [Google Gemini API](https://ai.google.dev/) (@google/genai)
- **Typography**: Inter (System-optimized)

## 📁 Project Structure

```text
/
├── components/          # Reusable UI components (Sidebar, PlayerBar, etc.)
├── services/            # API integration services (Gemini API)
├── constants.tsx        # Project data, developer info, and skill definitions
├── types.ts             # TypeScript interfaces and Enums
├── App.tsx              # Main application logic and view routing
└── index.html           # Root HTML with custom keyframes and styles
```

## 🚀 Getting Started

1. Ensure the `process.env.API_KEY` is configured in your environment for the Gemini AI features to function.
2. The application uses ESM modules and is designed for modern browser environments.

---

*Built with 💚 and code by Alex Jean.*
