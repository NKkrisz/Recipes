//Get recipes from dummyjson API
async function getRecipes() {
    const response = await fetch("https://dummyjson.com/recipes");
    const data = await response.json();
    getNavbarBackground(data);
    renderCards(data);
    // console.log(data);
}

//Makes navbar have a random background image
function getNavbarBackground(data) {
    const randomImage = data.recipes[Math.floor(Math.random() * data.recipes.length)].image;
    document.querySelector('#nav').style.backgroundImage = `url('${randomImage}')`
    
}

//Render cards: image, title, name, tags, more info button, save recipe button
function renderCards(data) {
    const cardContainer = document.querySelector("#card-container");
    data.recipes.forEach(recipe => {
        // console.log(recipe);
        const card = document.createElement("div");
        card.classList.add("custom-card");
        card.id = recipe.id
        card.innerHTML = `
                <div>
                    <img src="${recipe.image}" alt="${recipe.name}" class="card-image rounded-md"/>
                    <h2 class="card-title">${recipe.name}</h2>
                    <p class="card-description">${recipe.tags}</p>
                </div>
                <div class="flex gap-2">
                    <label for="tw-modal" class="more-info">More Info</label>
                    <input type="checkbox" id="tw-modal" class="peer fixed appearance-none opacity-0">
        
                    <label for="tw-modal" class="pointer-events-none invisible fixed inset-0 flex cursor-pointer items-center
                    justify-center overflow-hidden overscroll-contain bg-slate-700/30 opacity-0
                    transition-all duration-200 ease-in-out peer-checked:pointer-events-auto peer-checked:visible
                    peer-checked:opacity-100 peer-checked:[&>*]:translate-y-0 peer-checked[&>*]:scale-100">
                
                        <label class="custom-modal" for="">
                            <h3 class=" FONT-BOLD ">MODAL WORKIN'</h3>
                            <img class="rounded" src="" alt="">
                            <p class="py-3"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos accusamus ad nulla, hic eius repudiandae est ut beatae. Voluptate illum sed consequatur sequi ex eaque pariatur maiores ea dolor. Explicabo.</p>
                        </label>
                    
                    </label>
                    
                    <button id="save" onclick="saveFavorite(this)" class="save-recipe">Save recipe</button>
                </div>
        `;
        cardContainer.appendChild(card);
    });
}

function showModal(recipe){
    let img = recipe.parentElement.parentElement.children[0].children[0].src;
    let name = recipe.parentElement.parentElement.children[0].children[1].innerHTML;
    document.getElementById('modalImg').src = img
    document.querySelector('.FONT-BOLD').innerHTML = name
}


//Searches recipes through dummyjson API
async function searchRecipes() {
    const response = await fetch(`https://dummyjson.com/recipes/search?q=${document.querySelector("#search-input").value}`);
    const data = await response.json();
    document.querySelectorAll(".card").forEach(card => card.remove());
    renderCards(data)
}

//Save recipes into local storage to show on different page, and changes button based on status
let list = []
function saveFavorite(recipe){
    const saved = recipe.parentElement.parentElement.id

    if(!list.includes(saved)){
        list.push(saved)
        localStorage.setItem('savedRecipes', JSON.stringify(list))
    }else{
        list.pop(saved)
        localStorage.setItem('savedRecipes', JSON.stringify(list))
    }

    if(recipe.innerText != "Remove save"){
        recipe.innerText = "Remove save"
    }else{
        recipe.innerText = "Save recipe"
    }
}

document.querySelector("#search-button").addEventListener("click", searchRecipes);

//Get recipes on site loads
getRecipes()