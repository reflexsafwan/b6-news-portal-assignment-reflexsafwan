
const loadCatagories = () => {
    const url = ('https://openapi.programming-hero.com/api/news/categories')
    fetch(url)
        .then(res => res.json())
        .then(data => displayCatagories(data.data.news_category))
}


const displayCatagories = (catagories) => {
    const categoriesContainer = document.getElementById('catagory-container');
    catagories.forEach((catagory) => {
        // console.log(catagory)
        const ul = document.createElement('ul')
        ul.classList.add('d-flex')

        ul.innerHTML = `
              <li> ${catagory.category_name}</li>
              `
        categoriesContainer.appendChild(ul)
    });





}
loadCatagories()