const savedRecipesContainer = document.getElementById('saved-recipes-container');
const clearRecipesButton = document.getElementById('clear-recipes-button');

// function createRecipeCard(recipeData) {
//     const cardBackgroundColor = recipeData.colors[0];
//     const titleBorderColor = recipeData.colors[1]; 

//     const cardStyle = `padding: 15px; margin: 15px 0; border: 1px solid #ddd; border-radius: 8px; box-shadow: 2px 2px 5px rgba(0,0,0,0.1); position: relative; background: ${cardBackgroundColor};`;
//     const titleStyle = `color: #333; border-bottom: 2px solid ${titleBorderColor}; padding-bottom: 5px;`;
//     const buttonContainerStyle = 'text-align: right; margin-top: 10px;';
//     const buttonStyle = 'background-color: #28a745; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer; transition: background-color 0.3s;';

//     const ingredientsArray = Array.isArray(recipeData.ingredients) ? recipeData.ingredients : (recipeData.ingredients ? String(recipeData.ingredients).split('\n').filter(i => i.trim()) : []);
    
//     const ingredientsHtml = ingredientsArray.map(item => `<li>${item}</li>`).join('');

//     return `
//         <div data-recipe-title="${recipeData.title.replace(/"/g, '&quot;')}" style="${cardStyle}">
//             <h3 style="${titleStyle}">${recipeData.title}</h3>
            
//             ${recipeData.restrictions ? `<p style="font-style: italic; color: #555;">Restrictions: ${recipeData.restrictions}</p>` : ''}

//             <h4>Ingredients:</h4>
//             <ul style="padding-left: 20px;">
//                 ${ingredientsHtml}
//             </ul>

//             <h4>Instructions:</h4>
//             <p>${recipeData.instructions}</p>
            
//             <div style="${buttonContainerStyle}">
//                 <button class="save-button" style="${buttonStyle}">Save Recipe</button>
//             </div>
//         </div>
//     `;
// }

// function displayRecipeCards(recipe) {
//     savedRecipesContainer.innerHTML = ''; // Clear existing content

//     // Generate and append HTML for each recipe
//     savedRecipesContainer.innerHTML += createRecipeCard(recipe);

// }

function loadSavedRecipes() {
    savedRecipesContainer.innerHTML = ''; 
    let hasRecipes = false;
    let recipesHtml = '';

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        if (key && key.startsWith('recipe-')) {
            const recipeData = localStorage.getItem(key);
            
            recipesHtml += recipeData;
            hasRecipes = true;
        }
    }

    savedRecipesContainer.innerHTML = recipesHtml;

    if (!hasRecipes) {
        savedRecipesContainer.innerHTML = '<p>You have not saved any recipes yet.</p>';
    }
}

function clearSavedRecipes() {
    if (confirm("Are you sure you want to clear all saved recipes? This cannot be undone.")) {
       
        for (let i = localStorage.length - 1; i >= 0; i--) {
            const key = localStorage.key(i);
            if (key && key.startsWith('recipe-')) {
                localStorage.removeItem(key);
            }
        }
        loadSavedRecipes(); 
    }
}


document.addEventListener('DOMContentLoaded', loadSavedRecipes);

clearRecipesButton.addEventListener('click', clearSavedRecipes);

window.loadSavedRecipes = loadSavedRecipes;