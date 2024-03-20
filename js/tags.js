export async function getTags(func){
    const response = await fetch('https://dummyjson.com/recipes/tags')
    const data = await response.json()
    func(data)
}

function renderTags(data){
    const container = document.getElementById('filters')
    data.forEach((item) => {
        container.innerHTML += `
        <button class="text-slate-100 font-bold font-mono duration-300 transition-all hover:bg-sky-700 bg-sky-700/60 rounded-md p-3">${item}</button>
        `
    })
}

getTags(renderTags)
