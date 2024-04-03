async function getRecipes() {
    const response = await fetch("https://dummyjson.com/recipes");
    const data = await response.json();
    getNavbarBackground(data);
    renderCards(data);
    // console.log(data);
}

function getNavbarBackground(data) {
    const randomImage = data.recipes[Math.floor(Math.random() * data.recipes.length)].image;
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
                <div class="flex gap-2">

                        <label for="tw-modal" onclick="showModal(this)" class="flex-1 cursor-pointer rounded px-4 py-4 text-center bg-slate-600 rounded cursor-pointer hover:text-slate-900 hover:bg-sky-100 transition-all duration-300 font-bold">MORE INFO</label>
                        <input type="checkbox"  id="tw-modal" class="peer fixed appearance-none opacity-0">
            
                        <label for="tw-modal" class="pointer-events-none invisible fixed inset-0 flex cursor-pointer items-center
                        justify-center overflow-hidden overscroll-contain bg-slate-700/30 opacity-0
                        transition-all duration-200 ease-in-out peer-checked:pointer-events-auto peer-checked:visible
                        peer-checked:opacity-100 peer-checked:[&>*]:translate-y-0 peer-checked[&>*]:scale-100">
                    
                            <label class="max-h-[calc{100vh - 5em}] h-fit max-w-lg scale-90 overflow-auto overscroll-contain
                            rounded-md bg-white p-6 text-black shadow-2xl transition z-50" for="">
                                <h3 class="FONT-BOLD font-bold text-xl mb-2">MODAL WORKIN'</h3>
                                <img id="modalImg" class="rounded" src="" alt="">
                                <p class="py-3"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos accusamus ad nulla, hic eius repudiandae est ut beatae. Voluptate illum sed consequatur sequi ex eaque pariatur maiores ea dolor. Explicabo.</p>
                            </label>
                        </label>
                    <button id="save" onclick="saveFavorite(this)" class="flex-1 p-2 bg-sky-700 rounded cursor-pointer hover:text-slate-900 hover:bg-sky-100 transition-all duration-300 font-bold">Save recipe</button>
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

getRecipes()