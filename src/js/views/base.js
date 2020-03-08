export const elements = {
  searchForm: document.querySelector(".search"),
  searchInput: document.querySelector(".search__field"),
  searchResults: document.querySelector(".results"),
  searchResultsList: document.querySelector(".results__list"),
  searchResultsPages: document.querySelector(".results__pages"),
  recipe: document.querySelector(".recipe")
};

export const elementStrings = {
  loader: "loader"
};

export const renderLoader = parent => {
  const loader = `
    <div class="${elementStrings.loader}">
      <i class="fas fa-redo"></i>
    </div>
  `;
  parent.insertAdjacentHTML("afterbegin", loader);
};

export const clearLoader = () => {
  const loader = document.querySelector(`.${elementStrings.loader}`);
  if (loader) loader.parentElement.removeChild(loader);
};