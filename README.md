# 🐛 Debug My Dinner

A recipe website built with React and Vite, powered by
[TheMealDB](https://www.themealdb.com/) — an open, crowd-sourced
database of recipes from around the world.

## What it does

- Browse and search thousands of recipes from around the world
- Filter by category (cuisine, meal type, dietary preference)
- View full recipe details including ingredients and instructions
- **Featured recipes** on the home page
- **Random recipe generator** — for when you can't decide what to make
- Responsive design for mobile and desktop
- Custom 404 page

[▶ Watch demo](https://github.com/ingzenegger/NTVLokaverkefni_onn1/public/DebugMyDinner_scrRecording.mp4)

## Getting started

Prerequisites: [Node.js](https://nodejs.org/) (npm is included)

```bash
git clone https://github.com/your-username/debug-my-dinner.git
cd debug-my-dinner
npm install
npm run dev
```

Then open http://localhost:5173 in your browser.

## What I'd improve next

- **Smarter filter state** — currently the header dropdown resets when
  navigating between pages. Ideally filter selections would persist in
  the URL so users can navigate freely without losing their place
- **Better category organisation** — the API mixes ingredients (beef,
  seafood), meal types (dessert, starter) and dietary preferences
  (vegan, vegetarian) into one flat list. I'd separate these into
  logical groups
- More homepage suggestions: a starter, main and dessert trio
- Filter by ingredient
- Save favourites to local storage
- Dark mode
- Visual polish on the home page slider and filter dropdown

## Built with

- React, Vite, JavaScript
- [TheMealDB API](https://www.themealdb.com/)

## Credits

- Project name and bug logo created with assistance from ChatGPT
- Loading animation (pan flipping food) by
  [vinodjangid07](https://uiverse.io/vinodjangid07/polite-rat-20)
  via [UIVerse](https://uiverse.io/)
- Final project for Programming Part 1 at
  [NTV](https://ntv.is/namsflokkur/forritun/), Fall 2025