import axios from "axios";

export default class Recipe {
  constructor(id) {
    this.id = id;
  };

  async getRecipe() {
    try {
      const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
      this.title = res.data.recipe.title;
      this.author = res.data.recipe.publisher;
      this.image = res.data.recipe.image_url;
      this.url = res.data.recipe.source_url;
      this.ingredients = res.data.recipe.ingredients;
    } catch (error) {
      console.log(error);
      alert("Something went wrong...");
    };
  };

  calcTime() {
    // Assuming that I need 15 min for each 3 ingredients
    const ingredientsNumber = this.ingredients.length;
    const periods = Math.ceil(ingredientsNumber / 3);
    this.time = periods * 15;
  };

  calcServings() {
    this.servings = 4;
  };

  parseIngredients() {
    const unitsLong = ["tablespoons", "tablespoon", "ounces", "ounce", "teaspoons", "teaspoon", "cups", "pounds"];
    const unitsShort = ["tbsp", "tbsp", "oz", "oz", "tsp", "tsp", "cup", "pound"];
    const units = [...unitsShort, "g", "kg"];

    const newIngredients = this.ingredients.map(el => {
      // 1) Uniform units
      let ingredient = el.toLowerCase();
      unitsLong.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, unitsShort[i]);
      });

      // 2) Remove parentheses
      ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");

      // 3) Parse ingredients into count, unit and ingredient
      const arrayIngredient = ingredient.split(" ");
      const unitIndex = arrayIngredient.findIndex(element => units.includes(element));

      let objIngredient;
      if (unitIndex > -1) {
        // There is a unit
        // Ex. 4 1/2 cups, arrCount is [4, 1/2]
        // Ex. 4 cups, arrCount is [4]
        const arrCount = arrayIngredient.slice(0, unitIndex);

        let count;
        if (arrCount === 1) {
          count = eval(arrayIngredient[0].replace("-", "+"));
        } else {
          count = eval(arrayIngredient.slice(0, unitIndex).join("+"));
        }

        objIngredient = {
          count, 
          unit: arrayIngredient[unitIndex],
          ingredient: arrayIngredient.slice(unitIndex + 1).join(" ")
        };
      } else if (parseInt(arrayIngredient[0], 10)) {
        // There is no unit, but 1st element is a number
        objIngredient = {
          count: parseInt(arrayIngredient[0], 10),
          unit: "",
          ingredient: arrayIngredient.slice(1).join(" ")
        };
      } else if (unitIndex === -1) {
        // There is no unit and no number in 1st position
        objIngredient = {
          count: 1,
          unit: "",
          ingredient
        };
      };

      return objIngredient;
    });
    this.ingredients = newIngredients;
  };

  servingsUpdate(type) {
    // Update servings
    const newServings = type === "dec" ? this.servings - 1 : this.servings + 1;

    // Update ingredients
    this.ingredients.forEach(ing => {
      ing.count *= (newServings / this.servings);
    });

    this.servings = newServings;
  };
};