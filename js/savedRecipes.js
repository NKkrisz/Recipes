async function showSaved(){
    const ids = JSON.parse(localStorage.getItem('savedRecipes'))
    ids.forEach((id) => {
        console.log(id);
    })
    const response = await fetch(`https://dummyjson.com/recipes/${id}`)
    const data = await response.json()
    console.log(data);
}

showSaved()