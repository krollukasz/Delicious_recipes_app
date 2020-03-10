import { elements } from "./base";
import { limitRecipeTitle } from "./searchView";

export const toggleLikeBtn = isLiked => {
  const iconString = isLiked ? "fas" : "far";
  document.querySelector(".recipe__love i").setAttribute("class", `${iconString} fa-heart recipe__love--recipe`);
  // <i class="fas fa-heart"></i>
  // <i class="far fa-heart recipe__love--recipe"></i>
};

export const toggleLikeMenu = numLikes => {
  elements.likesMenu.style.visibility = numLikes > 0 ? "visible" : "hidden";
};

export const renderLike = like => {
  const markup = `
    <li>
      <a class="likes__link" href="#${like.id}">
        <figure class="likes__fig">
          <img src="${like.image}" alt="${like.title}">
        </figure>
        <div class="likes__data">
          <h4 class="likes__name">${limitRecipeTitle(like.title)}</h4>
          <p class="likes__author">${like.author}</p>
        </div>
      </a>
    </li>
  `;
  elements.likesList.insertAdjacentHTML("beforeend", markup);
};

export const deleteLike = id => {
  const el = document.querySelector(`.likes__link[href*="${id}"]`).parentElement;
  if (el) el.parentElement.removeChild(el);
};