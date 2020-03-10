import { elements } from "./base";

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
  elements.searchInput.value = ""
};

export const clearResults = () => {
  elements.searchResultsList.innerHTML = "";
  elements.searchResultsPages.innerHTML = "";
};

export const highlightSelected = id => {
  const resultsArr = Array.from(document.querySelectorAll(".results__link"));
  resultsArr.forEach(el => {
    el.classList.remove("results__link--active");
  });
  document.querySelector(`.results__link[href*="${id}"]`).classList.add("results__link--active");
};

export const limitRecipeTitle = (title, limit = 17) => {
  const newTitle = [];
  if (title.length > limit) {
    title.split(" ").reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur);
      }
      return acc + cur.length;
    }, 0);

    // return the result
    return `${newTitle.join(" ")}...`;
  }
}

const renderRecipe = recipe => {
  const markup = `
    <li>
      <a class="results__link" href="#${recipe.recipe_id}">
        <figure class="results__fig">
          <img src="${recipe.image_url}" alt="${recipe.title}">
        </figure>
        <div class="results__data">
          <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
          <p class="results__author">${recipe.publisher}</p>
        </div>
      </a>
    </li>
  `;
  elements.searchResultsList.insertAdjacentHTML("beforeend", markup);
};

// Button type: "prev" or "next"
const createButton = (page, type) => `
  <button class="btn-inline results__btn--${type}" data-goto=${type === "prev" ? page - 1 : page + 1}>
    <span>Page ${type === "prev" ? page - 1 : page + 1}</span>
    <i class="fas fa-caret-left icon-${type === "prev" ? page - 1 : page + 1}"></i>
  </button>
`;

const renderButtons = (page, resultsNumber, resultsPerPage) => {
  const pages = Math.ceil(resultsNumber / resultsPerPage);

  let button;
  if (page === 1 && pages > 1) {
    // Only button to go to next page
    button = createButton(page, "next");
  } else if (page < pages) {
    // Both buttons
    button = `
      ${createButton(page, "prev")}
      ${createButton(page, "next")}
    `;
  } else if (page === pages && pages > 1) {
    // Only button to go to previous page
    button = createButton(page, "prev");
  }

  elements.searchResultsPages.insertAdjacentHTML("afterbegin", button);
};

export const renderResults = (recipes, page = 1, resultsPerPage = 10) => {
  // Set the number of results displayed per page
  const start = (page - 1) * resultsPerPage;
  const end = page * resultsPerPage;
  recipes.slice(start, end).forEach(renderRecipe);

  // Render pagination buttons
  renderButtons(page, recipes.length, resultsPerPage);
};