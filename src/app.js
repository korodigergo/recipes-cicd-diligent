import { getRecipes } from "./recipes.js";


function element(tag, attributes = {}, children = []) {
  const element = document.createElement(tag);

  Object.entries(attributes).forEach(([key, value]) => {
    if (key.startsWith('on')) {
      const eventName = key.toLowerCase().substring(2)
      element.addEventListener(eventName, value);
    } else {
      element.setAttribute(key, value);
    }
  })

  children.forEach((child) => {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child))
    } else {
      element.appendChild(child);
    }
  })
  return element;
}

function createContainer({ onShow }) {
  const container = element('div', { class: 'container' }, [
    element('h1', {}, ['My Recipes']),
    element('button', { class: 'btn btn-primary', onClick: onShow }, ['Show Recipes']),
    element('div', { id: 'recipeList' }),
  ])
  return container;
}

export function setupApp(root) {
  
  let isVisible = false;
  
  function handleShow(event) {
    isVisible = !isVisible;
    const list = event.target.parentNode.querySelector('#recipeList');
    
    
    if (isVisible) {    
      for(const recipe of getRecipes()){

        list?.appendChild(element('h1', {}, [recipe.name]));
        list?.appendChild(element('h2', {}, [recipe.servings]));
      }  
    } else {
      list.innerText = '';
    }
  }

  root.appendChild(createContainer({ onShow: handleShow }))
  return root;
}
