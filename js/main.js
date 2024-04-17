//Force user to login or select guest visit
if(!localStorage.getItem("status")){
    alert("Please Login Or Select Guest Visit!")
    window.location.href = "login.html";
}

//Get recipes from dummyjson API
async function getRecipes() {
    const response = await fetch("https://dummyjson.com/recipes");
    const data = await response.json();
    getNavbarBackground(data);
    renderCards(data);
    // console.log(data);
    loadSaved()
}

//Makes navbar have a random background image
function getNavbarBackground(data) {
    const randomImage = data.recipes[Math.floor(Math.random() * data.recipes.length)].image;
    document.querySelector('#nav').style.backgroundImage = `url('${randomImage}')`
}

document.getElementById('logout').addEventListener('click', logOut)
function logOut(){
    localStorage.removeItem("status")
    localStorage.removeItem("currentUser")
    window.location.href = "login.html"
}

//Render cards: image, title, name, tags, more info button, save recipe button
function renderCards(data) {
    const cardContainer = document.querySelector("#card-container");
    data.recipes.forEach(recipe => {
        const card = document.createElement("div");
        card.classList.add("custom-card");
        card.id = recipe.id
        card.innerHTML = `    
            <img src="${recipe.image}" alt="${recipe.name}" class="card-image rounded-md"/>
            <div class="flex flex-col gap-2 h-full place-content-between">
                <h2 class="card-title">${recipe.name}</h2>
                
                <div className="flex flex-col">
                    <p class="card-description"></p>
                    <p id="instruction" class="hidden">${recipe.instructions}</p>
                    
                    <div className="flex">
                        <label for="tw-modal" class="more-info">More Info</label>
                        <input type="checkbox" id="tw-modal" class="peer fixed appearance-none opacity-0">
                    
                        <label for="tw-modal" class="pointer-events-none invisible fixed inset-0 flex cursor-pointer items-center
                        justify-center overflow-hidden overscroll-contain bg-slate-700/30 opacity-0
                        transition-all duration-200 ease-in-out peer-checked:pointer-events-auto peer-checked:visible
                        peer-checked:opacity-100 peer-checked:[&>*]:translate-y-0 peer-checked[&>*]:scale-100">
                    
                        <label class="custom-modal" for="" >
                                <h3 class=" FONT-BOLD font-bold text-xl mb-5">MODAL WORKIN'</h3>
                                <img id="modalImg" class="rounded" src="" alt="">
                                <p id="instructions" class="py-3 text-justify font-mono font-semibold"></p>
                            </label>
                    
                        </label>
                    
                        <button id="save" onclick="saveFavorite(this)" class="save-recipe">Save recipe</button>
                    </div>
                </div>
            </div>
        `;
        recipe.tags.forEach(tag => {
            card.querySelector('.card-description').innerHTML += `<span class="card-tag">${tag}</span>`
        });
        card.querySelector(".more-info").addEventListener("click", () => showModal(recipe));
        card.querySelector(".more-info").addEventListener("click", () => saveFavorite(recipe));
        if(JSON.parse(localStorage.getItem("status")) == "Guest"){
            card.querySelector('.save-recipe').disabled = true
            card.querySelector('.save-recipe').title = "Login for this feature"
        }
        cardContainer.appendChild(card);
    });
}

function showModal(recipe){
    document.getElementById('modalImg').src = recipe.image
    document.getElementById('instructions').innerHTML = recipe.instructions.join(" ")
    document.querySelector('.FONT-BOLD').innerHTML = recipe.name
}


//Searches recipes through dummyjson API
async function searchRecipes() {
    document.querySelector('#card-container').innerHTML = ""
    const response = await fetch(`https://dummyjson.com/recipes/search?q=${document.querySelector("#search-input").value}`);
    const data = await response.json();
    renderCards(data)
}

//Save recipes into local storage to show on different page, and changes button based on status
let list = []

let ids = JSON.parse(localStorage.getItem('savedRecipes'))

if(ids){
    ids.forEach((data) => {
        list.push(data)
    })
}

function saveFavorite(recipe){
    const user = localStorage.getItem('currentUser')
    const saved = recipe.parentElement.parentElement.parentElement.parentElement.id
    const isSaved = list.some(item => item.saved === saved && item.user === user)

    if(isSaved){
        list = list.filter(item => item.saved!== saved || item.user!== user)
        localStorage.setItem('savedRecipes', JSON.stringify(list))
        recipe.innerText = "Save recipe"
    }else{
        list.push({saved: saved, user: user})
        localStorage.setItem('savedRecipes', JSON.stringify(list))
        recipe.innerText = "Remove save"
    }
}
document.querySelector("#search-button").addEventListener("click", searchRecipes);

//Get recipes on site loads
getRecipes()

//Load saved recipes and change button status if they are saved
function loadSaved(){
    if(ids){
        ids.forEach((id) => {   
            if(id.user == user){
                (document.getElementById(id.saved)).querySelector(".save-recipe").innerHTML = "Remove save"
                list.push(id)
            }
        })
    }
}

//Check if user is guest then disable view recipe button and save buttons

if(JSON.parse(localStorage.getItem("status")) == "Guest"){
    document.querySelector('#savedRecipe').style.visibility = "hidden"
    document.getElementById('logout').innerHTML = "Login"
}
