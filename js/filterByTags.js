export async function filterTags(func, query){
    const response = await fetch(`https://dummyjson.com/recipes/tag/${query}`)
    const data = await response.json()
    func(data)
}

function filteredTags(data){

    console.log(data);
}

filterTags(filteredTags, "Pizza")