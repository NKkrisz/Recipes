async function getRecipes() {
    const response = await fetch("https://dummyjson.com/recipes");
    const data = await response.json();
    getNavbarBackground(data);
    renderCards(data);
    // console.log(data);
}

function getNavbarBackground(data) {
    const randomImage = data.recipes[Math.floor(Math.random() * data.recipes.length)].image;
    console.log(randomImage);
    document.querySelector('#nav').classList.add(`bg-[url('${randomImage}')]`)
}

function renderCards(data) {
    const cardContainer = document.querySelector("#card-container");
    data.recipes.forEach(recipe => {
        console.log(recipe);
        const card = document.createElement("div");
        card.classList.add("card", "w-1/4", "bg-slate-800", "p-4", "rounded-lg", "shadow-lg", "text-white");
        card.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.name}" class="card-image/>
            <div class="card-content">
                <h2 class="card-title">${recipe.name}</h2>
                <p class="card-description">${recipe.tags}</p>
            </div>
        `;
        cardContainer.appendChild(card);
    });
}

getRecipes()