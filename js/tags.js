export async function getTags(func){
    const response = await fetch('https://dummyjson.com/recipes/tags')
    const data = await response.json()
    func(data)
}

function renderTags(data){
    const container = document.getElementById('filters')
    data.forEach((item) => {
        container.innerHTML += `
        <button class="filter-tag">${item}</button>
        `
    })
}

getTags(renderTags)
