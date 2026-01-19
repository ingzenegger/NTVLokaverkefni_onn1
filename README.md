# Debug My Dinner - recipe website

Debug My Dinner is a recipe website built with React and Vite.
The data comes from [TheMealDB](https://www.themealdb.com/): an open, crowd-sourced database of recipes from around the world.

## Project requirements

Debug My Dinner was created as Inga M Beck's final project for Programming, part1 (Forritun 1. hluti) at [NTV](https://ntv.is/namsflokkur/forritun/).
The basic requirements for the project were to create a recipe website using React with the following items/components:

1.  Home page
2.  Page listing all recipes
3.  Page providing recipe details
4.  Functional filtering by category
5.  404 page
6.  1 elective requirement: A search functionality

Some use cases were provided as well to consider details such as error handling.

### Other features

- Featured recipes
- Random recipe generator for those times you are just not in the mood to choose
- Responsive design for mobile and desktop

## Getting started

To get a local copy up and running, follow these simple steps.

Prerequisites:

- Node.js: Ensure you have Node.js installed.
- npm. Usually comes with Node.js

Installation & Setup:

1. Clone the repo:

```
git clone https://github.com/your-username/your-project-name.git
```

2. Install dependencies

```
npm install
```

3. Start the development server:

```
npm run dev
```

4. Open your browser: The site will be running at http://localhost:5173

## Future improvements

- Filtering selection in header updating with the URL/user selections:
  -- for example: User filters for Italian cuisine in header dropdown, picks a pasta recipe. Header filtering shows "Select catogory" and "Italian". In recipe detail page user clicks "category pasta" bringing them to "browsing pasta recipes" and thus updating dropdown selectors to "Pasta" and "select area"

- Adjusting the API category list, either sorting alphabetically OR by seperating ingredient category (beef, pork, seafood, goat etc) and then types (dessert, starter, breakfast etc), and the diet preferences (Vegan, vegetarian).

- More suggestions for the user, such as providing a starter, main and dessert suggestion on the homepage

- Add filtering for ingredients

- Add dark mode

- Make slider on home page and filter dropdown in header more visually appealing with CSS

## Sources

- API: TheMealDB

- Branding: Title and Bug logo were created with the assitance of ChatGPT.

- UI Components: Loader (pan flipping food) is by [vinodjangid07](https://uiverse.io/vinodjangid07/polite-rat-20) via [UIVerse](https://uiverse.io/), a library of Open-Source UI.
