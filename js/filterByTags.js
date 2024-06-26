export async function filterTags(func, query){
    const response = await fetch(`https://dummyjson.com/recipes/tag/${query}`)
    const data = await response.json()
    func(data) 
}

let clicked
function filteredTags(){
    document.querySelectorAll('.filter-tag').forEach((item) => {
        item.addEventListener('click', ((data) => {
            document.querySelectorAll('.filter-tag').forEach((i) => {
                i.classList.remove('bg-red-600')
            })
            data.target.classList.add('bg-red-600')
            clicked = data.target.innerHTML
            filterTags(renderCards, clicked)
        }))
    })
}

function renderCards(data) {
    const cardContainer = document.querySelector("#card-container");
    cardContainer.innerHTML = ""
    data.recipes.forEach(recipe => {
        const card = document.createElement("div");
        card.id = recipe.id
        card.classList.add("card", "bg-slate-800", "p-4", "rounded-lg", "shadow-lg", "text-white", "w-72", "flex", "flex-col", "justify-between");
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
                
                    <label class="custom-modal for="">
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
        if(JSON.parse(localStorage.getItem("status")) == "Guest"){
            card.querySelector('.save-recipe').disabled = true
            card.querySelector('.save-recipe').title = "Login for this feature"
        }
        cardContainer.appendChild(card);
    });
}

filterTags(filteredTags, clicked)