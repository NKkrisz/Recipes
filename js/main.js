async function getRecipes() {
    const response = await fetch("https://dummyjson.com/recipes");
    const data = await response.json();
    getNavbarBackground(data);
}

function getNavbarBackground(data) {
    const randomImage = data.recipes[Math.floor(Math.random() * data.recipes.length)].image;
    console.log(randomImage);
    document.querySelector('#nav').classList.add(`bg-[url('${randomImage}')]`)
}

getRecipes()