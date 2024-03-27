async function getRecipes() {
    const response = await fetch("https://dummyjson.com/recipes");
    const data = await response.json();
    getNavbarBackground(data);
    renderCards(data);
    // console.log(data);
}

function getNavbarBackground(data) {
    const randomImage = data.recipes[Math.floor(Math.random() * data.recipes.length)].image;
    // console.log(randomImage);
    document.querySelector('#nav').classList.add(`bg-[url('${randomImage}')]`)
   
}


function renderCards(data) {
    const cardContainer = document.querySelector("#card-container");
    data.recipes.forEach(recipe => {
        // console.log(recipe);
        const card = document.createElement("div");
        card.classList.add("card", "bg-slate-800", "p-4", "rounded-lg", "shadow-lg", "text-white", "w-72", "flex", "flex-col", "justify-between",);
        card.id = recipe.id
        card.innerHTML = `
                <div>
                    <img src="${recipe.image}" alt="${recipe.name}" class="card-image rounded-md"/>
                    <h2 class="card-title text-xl font-mono my-5">${recipe.name}</h2>
                    <p class="card-description italic font-bold mb-3">${recipe.tags}</p>
                </div>
                <div>
                    <button class="p-2 bg-slate-600 rounded cursor-pointer hover:text-slate-600 hover:bg-slate-100 transition-all duration-300 font-bold">More info</button>
                    <button id="save" onclick="saveFavorite(this)" class="p-2 bg-sky-700 rounded cursor-pointer hover:text-slate-900 hover:bg-sky-100 transition-all duration-300 font-bold">Save recipe</button>
                </div>

        `;
        cardContainer.appendChild(card);
    });
}

async function searchRecipes() {
    const response = await fetch(`https://dummyjson.com/recipes/search?q=${document.querySelector("#search-input").value}`);
    const data = await response.json();
    document.querySelectorAll(".card").forEach(card => card.remove());
    renderCards(data)
}

let list = []
function saveFavorite(recipe){
    const saved = recipe.parentElement.parentElement.id

    if(!list.includes(saved)){
        list.push(saved)
        localStorage.setItem('savedRecipes', list)
    }else{
        list.pop(saved)
        localStorage.setItem('savedRecipes', list)
    }

    if(recipe.innerText != "Remove save"){
        recipe.innerText = "Remove save"
    }else{
        recipe.innerText = "Save recipe"
    }   
}

document.querySelector("#search-button").addEventListener("click", searchRecipes);

getRecipes()