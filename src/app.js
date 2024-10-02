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
    element("button", { class: "btn btn-primary mb-3", onClick: onShow }, [
      "Show Recipes",
    ]),
    element("div", { id: "recipeList", class: "d-flex flex-wrap gap-3" }), // Use flex-wrap for wrapping cards
  ]);
  return container;
}

export function setupApp(root) {
  let isVisible = false;

  function handleShow(event) {
    isVisible = !isVisible;
    const list = event.target.parentNode.querySelector("#recipeList");

    if (isVisible) {
      list.innerHTML = ""; 

      for (const recipe of getRecipes()) {
        list?.appendChild(
          element("div", { class: "card col-12 col-sm-6 col-md-4" }, [
            element("div", { class: "card-body" }, [
              element("h5", { class: "card-title" }, [recipe.name]),
              element("h6", { class: "card-subtitle mb-2 text-muted" }, ["Ingredients"]),
              element("ul", {}, 
                recipe.ingredients.map((ingredient) => 
                  element('li', {}, [`${ingredient.quantity} ${ingredient.item}`])
                )
              ),
              element("h6", { class: "card-subtitle mb-2 text-muted" }, ["Instructions"]),
              element("ol", {}, 
                recipe.instructions.map((instruction) => 
                  element('li', {}, [instruction])
                )
              ),
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
