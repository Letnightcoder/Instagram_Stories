# Instagram Stories Clone

A modern, responsive Instagram Stories clone built with React, TypeScript, Vite, and Tailwind CSS. This project demonstrates how to create an interactive story viewing experience similar to Instagram's stories feature.



## 🌟 Features

- Responsive story viewer with smooth transitions
- Progress bar for story duration
- Navigation between stories and users
- Touch/click controls for navigation
- Story pause on press/hold
- Keyboard navigation support
- Loading states and animations
- Viewed stories tracking

## 🚀 Tech Stack

- [React](https://reactjs.org/) - UI Library
- [TypeScript](https://www.typescriptlang.org/) - Type Safety
- [Vite](https://vitejs.dev/) - Build Tool
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Lucide Icons](https://lucide.dev/) - Icons

## 📦 Installation

1. Install dependencies:

```powershell
npm install
```

2. Start the development server:

```powershell
npm run dev
```

## 🎮 Usage

- Click on any user avatar to view their stories
- Navigate between stories:
  - Click left side: Previous story
  - Click right side: Next story
  - Press and hold: Pause current story
  - Press ESC or click X: Exit viewer
  - Use arrow keys for keyboard navigation

## 🛠️ Project Structure

```
src/
├── components/          # React components
│   ├── StoryViewer.tsx # Main story viewing modal
│   ├── StoryList.tsx   # Horizontal list of story avatars
│   ├── StoryAvatar.tsx # Individual user avatar
│   └── ProgressBar.tsx # Story progress indicator
├── data/
│   └── stories.ts      # Mock story data
├── types/
│   └── index.ts        # TypeScript interfaces
└── App.tsx             # Main application component
```

## 🧪 Development

- Run development server:

```powershell
npm run dev
```

- Build for production:

```powershell
npm run build
```

- Preview production build:

```powershell
npm run preview
```

## 🙏 Acknowledgments

- Design inspired by Instagram
- Images from [pixabay](https://www.pixabay.com/)
