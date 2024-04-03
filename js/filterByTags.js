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
        card.classList.add("card", "bg-slate-800", "p-4", "rounded-lg", "shadow-lg", "text-white", "w-72", "flex", "flex-col", "justify-between");
        card.innerHTML = `
        <div>
            <img src="${recipe.image}" alt="${recipe.name}" class="card-image rounded-md"/>
            <h2 class="card-title ">${recipe.name}</h2>
            <p class="card-description">${recipe.tags}</p>
        </div>
        <div class="flex gap-2">
            <label for="tw-modal" onclick="showModal(this)"  class="more-info">More Info</label>
            <input type="checkbox" id="tw-modal" class="peer fixed appearance-none opacity-0">

            <label for="tw-modal" class="pointer-events-none invisible fixed inset-0 flex cursor-pointer items-center
            justify-center overflow-hidden overscroll-contain bg-slate-700/30 opacity-0
            transition-all duration-200 ease-in-out peer-checked:pointer-events-auto peer-checked:visible
            peer-checked:opacity-100 peer-checked:[&>*]:translate-y-0 peer-checked[&>*]:scale-100">
        
                <label class="custom-modal" for="">
                    <h3 class=" FONT-BOLD font-bold text-xl mb-5">'</h3>
                    <img id="modalImg" class="rounded" src="" alt="">
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


filterTags(filteredTags, clicked)