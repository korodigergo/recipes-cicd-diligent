import { getRecipes } from "./recipes.js";

function element(tag, attributes = {}, children = []) {
  const element = document.createElement(tag);

  Object.entries(attributes).forEach(([key, value]) => {
    if (key.startsWith("on")) {
      const eventName = key.toLowerCase().substring(2);
      element.addEventListener(eventName, value);
    } else {
      element.setAttribute(key, value);
    }
  });

  children.forEach((child) => {
    if (typeof child === "string") {
      element.appendChild(document.createTextNode(child));
    } else {
      element.appendChild(child);
    }
  });
  return element;
}

function createContainer({ onShow }) {
  const container = element("div", { class: "container" }, [
    element("h1", {}, ["My Recipes"]),
    element("button", { class: "btn btn-primary", onClick: onShow }, [
      "Show Recipes",
    ]),
    element("div", { id: "recipeList" }),
  ]);
  return container;
}

function showIngredients(ingredients){
  for(const ingredient of ingredients){

  }
}

export function setupApp(root) {
  let isVisible = false;

  function handleShow(event) {
    isVisible = !isVisible;
    const list = event.target.parentNode.querySelector("#recipeList");

    if (isVisible) {
      for (const recipe of getRecipes()) {
        list?.appendChild(
          element("div", { class: "card my-3" }, [
            element("div", { class: "card-body" }, [
              element("h5", { class: "card-title" }, [recipe.name]),
              element("h5", { class: "card-subtitle mb-2 text-muted" }, ['Ingredients']),
              element("ul", { class: "card-body" }, recipe.ingredients.map((ingredient) => element('li', {}, [`${ingredient.quantity} ${ingredient.item}`]))),
              element("h5", { class: "card-subtitle mb-2 text-muted" }, ['Instructions']),
              element("ul", { class: "card-body" }, recipe.instructions.map((instruction) => element('li', {}, [instruction])))
            ]),
          ])
        );
      }
    } else {
      list.innerText = "";
    }
  }

  root.appendChild(createContainer({ onShow: handleShow }));
  return root;
}
