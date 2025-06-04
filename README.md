# Dual N-Back Cognitive Training Game

A modern web-based implementation of the Dual N-Back cognitive training game, designed to improve working memory and fluid intelligence.

## 🎮 Game Overview

The Dual N-Back is a scientifically-backed cognitive training exercise where players must remember both visual positions and letters from N steps back in a sequence. This implementation features a beautiful, modern UI with glass morphism effects and smooth animations.

## ✨ Features

- **Visual-Only Gameplay**: Letters are displayed directly on the grid for better accessibility
- **Configurable Difficulty**: Adjust N-level from 1 to 5
- **Modern UI Design**: 
  - Glass morphism effects
  - Gradient backgrounds
  - Smooth animations and transitions
  - Responsive design
- **Game Statistics**: Track your performance and accuracy
- **Local Storage**: Settings and statistics are saved locally

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/dual-n-back-app.git
cd dual-n-back-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🎯 How to Play

1. **Watch the Grid**: A blue square will appear in one of the 9 positions with a letter
2. **Remember N-Back**: Compare the current position and letter with what appeared N trials ago
3. **Press Keys**:
   - Press **'A'** if the position matches N trials back
   - Press **'L'** if the letter matches N trials back
   - You can press both, one, or neither depending on matches
4. **Track Progress**: Your accuracy is displayed after each session

## 🛠️ Tech Stack

- **React** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Local Storage** for data persistence

## 📦 Project Structure

```
src/
├── components/         # React components
│   ├── ui/            # Reusable UI components
│   └── ...            # Game-specific components
├── hooks/             # Custom React hooks
├── types/             # TypeScript type definitions
└── lib/               # Utility functions
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.