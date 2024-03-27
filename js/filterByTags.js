export async function filterTags(func, query){
    const response = await fetch(`https://dummyjson.com/recipes/tag/${query}`)
    const data = await response.json()
    func(data) 
}

let clicked
function filteredTags(){
    document.querySelectorAll('.tagItem').forEach((item) => {
        item.addEventListener('click', ((data) => {
            document.querySelectorAll('.tagItem').forEach((i) => {
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
        card.classList.add("card", "bg-slate-800", "p-4", "rounded-lg", "shadow-lg", "text-white", "w-72", "flex", "flex-col", "justify-between");
        card.innerHTML = `
                <div>
                    <img src="${recipe.image}" alt="${recipe.name}" class="card-image rounded-md"/>
                    <h2 class="card-title text-xl font-mono my-5">${recipe.name}</h2>
                    <p class="card-description italic font-bold mb-3">${recipe.tags}</p>
                </div>
                <div>
                    <button class="p-2 bg-slate-600 rounded cursor-pointer hover:text-slate-600 hover:bg-slate-100 transition-all duration-300 font-bold">More info</button>
                    <button id="save" class="p-2 bg-sky-700 rounded cursor-pointer hover:text-slate-900 hover:bg-sky-100 transition-all duration-300 font-bold">Save recipe</button>
                </div>
        `;
        cardContainer.appendChild(card);
    });
}


filterTags(filteredTags, clicked)