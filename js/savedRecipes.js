async function showSaved(){
    const ids = JSON.parse(localStorage.getItem('savedRecipes'))
    ids.forEach(async (id) => {
        const response = await fetch(`https://dummyjson.com/recipes/${id}`)
        const data = await response.json()
        const container = document.getElementById('savedRecipes')   
        const card = document.createElement("div");
        card.classList.add("card", "bg-slate-800", "p-4", "rounded-lg", "shadow-lg", "text-white", "w-72", "flex", "flex-col", "justify-between",);
        card.id = data.id
        card.innerHTML = `
                <div>
                    <img src="${data.image}" alt="${data.name}" class="card-image rounded-md"/>
                    <h2 class="card-title text-xl font-mono my-5">${data.name}</h2>
                    <p class="card-description italic font-bold mb-3">${data.tags}</p>
                </div>
               

        `;
        container.appendChild(card); 
   
     })
}

showSaved()