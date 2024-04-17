if(!localStorage.getItem("status") || JSON.parse(localStorage.getItem("status")) == "Guest"){
    alert("Please Login For This Feature!")
    window.location.href = "login.html";
}

const user = localStorage.getItem("currentUser")

let ids = JSON.parse(localStorage.getItem('savedRecipes'))
async function showSaved(){
    ids.forEach(async (id) => {
        if(id.user == user){
        const response = await fetch(`https://dummyjson.com/recipes/${id.saved}`)
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
                    <button class="text-lg font-bold text-red-600 hover:scale-105 transition-all" onclick="removeFromSaved(this)">Remove</button>
                </div>
               

        `;
        container.appendChild(card); 
        
        }
    })
}
let hasSaved = ids.some((item) => item.user === user)

if(!hasSaved){
    document.getElementById('msg').innerHTML = "No saved recipes yet."
}

function removeFromSaved(recipe){
    const target = recipe.parentElement.parentElement.id
    const index = ids.indexOf(target)
    ids.splice(index, 1)
    document.getElementById(target).style.display = "none"
    localStorage.setItem('savedRecipes', JSON.stringify(ids))
    hasSaved = ids.some(item => item.user === user)
    if(!hasSaved){
        document.getElementById('msg').innerHTML = "No saved recipes yet."
    }
}

showSaved()