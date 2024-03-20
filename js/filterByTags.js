export async function filterTags(func, query){
    const response = await fetch(`https://dummyjson.com/recipes/tag/${query}`)
    const data = await response.json()
    func(data) 
}



let clicked
function filteredTags(asd){
    document.querySelectorAll('.tagItem').forEach((item) => {
        item.addEventListener('click', ((data) => {
            clicked = data.target.innerHTML
            filterTags(renderCards, clicked)
            console.log(asd);
        }))
    })
}

function renderCards(data) {
    const cardContainer = document.querySelector("#card-container");
    data.recipes.forEach(recipe => {
        console.log(recipe);
        // const card = document.createElement("div");
        // card.classList.add("card", "w-1/4", "bg-slate-800", "p-4", "rounded-lg", "shadow-lg", "text-white");
        // card.innerHTML = `
        //     <img src="${recipe.image}" alt="${recipe.name}" class="card-image/>
        //     <div class="card-content">
        //         <h2 class="card-title">${recipe.name}</h2>
        //         <p class="card-description">${recipe.tags}</p>
        //     </div>
        // `;
        // cardContainer.appendChild(card);
    });
}


filterTags(filteredTags, clicked)