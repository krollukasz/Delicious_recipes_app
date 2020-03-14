import { Fraction } from "fractional";
import { elements } from "./base";

export const clearRecipe = () => {
  elements.recipe.innerHTML = "";
};

const formatCount = count => {
  if (count) {
    // count = 0.5 ==> 1/2 
    // count = 2.5 ==> 2 1/2
    const newCount = Math.round(count * 10000) / 10000;
    const [int, dec] = newCount.toString().split(".").map(el => parseInt(el, 10));

    if (!dec) return newCount;

    if (int === 0) {
      const fr = new Fraction(newCount);
      return `${fr.numerator}/${fr.denominator}`;
    } else {
      const fr = new Fraction(newCount - int);
      return `${int} ${fr.numerator}/${fr.denominator}`;
    }
  }
  return "?";
};

const createIngredient = ingredient => `
  <li class="recipe__item">
    <div class="recipe__icon">
      <i class="fas fa-check"></i>
    </div>
    <div class="recipe__count">${formatCount(ingredient.count)}</div>
    <div class="recipe__ingredient">
      <span class="recipe__unit">${ingredient.unit}</span>
      ${ingredient.ingredient}
    </div>
  </li>
`;

export const renderRecipe = (recipe, isLiked) => {
  const markup = `
    <figure class="recipe__fig">
      <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img">
      <h1 class="recipe__title">
        <span>${recipe.title}</span>
      </h1>
    </figure>
    
    <div class="recipe__details">
      <div class="recipe__info">
        <div class="recipe__info--icon">
          <i class="far fa-clock"></i>
        </div>
        <span class="recipe__info--data recipe__info--data--minutes">${recipe.time}</span>
        <span class="recipe__info-text"> minutes</span>
      </div>
      <div class="recipe__info">
        <div class="recipe__info--icon">
          <i class="fas fa-male"></i>
        </div>
        <span class="recipe__info--data recipe__info--data--people">${recipe.servings}</span>
        <span class="recipe__info-text"> servings</span>
        
        <div class="recipe__info--buttons">
          <button class="btn-tiny btn-decrease">
            <i class="fas fa-minus"></i>
          </button>
          <button class="btn-tiny btn-increase">
            <i class="fas fa-plus"></i>
          </button>
        </div>
      </div>
      <button class="recipe__love header__likes">          
        <i class="${isLiked ? "fas" : "far"} fa-heart recipe__love--recipe"></i>
      </button>
    </div>

    <div class="recipe__ingredients">
      <ul class="recipe__ingredients--list">
        ${recipe.ingredients.map(el => createIngredient(el)).join("")}      
      </ul>
      <button class="btn-small recipe__btn recipe__btn--add">
        <div class="search__icon">
          <i class="fas fa-shopping-cart"></i>
        </div>
        <span>Add to shopping list</span>
      </button>
    </div>

    <div class="recipe__directions">
      <h2 class="heading-2">How to cook it</h2>
      <p class="recipe__directions--text">
        This recipe was carefully designed and tested by
        <span class="recipe__by">${recipe.author}</span>. Please check out directions at their website.
      </p>
      <a class="btn-small recipe__btn" href="${recipe.url}" target="_blank">
        <span>Directions</span>
        <div class="search__icon">          
          <i class="fas fa-angle-right"></i>
        </div>
      </a>
    </div>
  `;
  elements.recipe.insertAdjacentHTML("afterbegin", markup);
};

export const servingsIngredientsUpdate = recipe => {
  // Update servings
  document.querySelector(".recipe__info--data--people").textContent = recipe.servings;

  // Update ingredients
  const countElements = Array.from(document.querySelectorAll(".recipe__count"));
  countElements.forEach((el, i) => {
    el.textContent = formatCount(recipe.ingredients[i].count);
  });
};