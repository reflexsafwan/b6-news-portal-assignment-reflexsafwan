
const loadCatagories = () => {
    const url = ('https://openapi.programming-hero.com/api/news/categories')
    fetch(url)
        .then(res => res.json())
        .then(data => displayCatagories(data.data.news_category))
}


const displayCatagories = (catagories) => {
    // console.log(catagories)
    const categoriesContainer = document.getElementById('catagory-container');
    catagories.forEach((catagory) => {
        // console.log(catagory)
        const ul = document.createElement('ul')
        ul.classList.add('d-flex')

        ul.innerHTML = `
            <a onclick= "loadingNews('${catagory.category_id}')" href = "#">
                 <li> ${catagory.category_name}</li>
           </a>
              `
        categoriesContainer.appendChild(ul)
    });
}

const loadingNews = (catagoryID) => {
    const url = ` https://openapi.programming-hero.com/api/news/category/${catagoryID}`
    fetch(url)
        .then(res => res.json())
        .then(catagory => displayNews(catagory.data));

}
const displayNews = (catagory) => {
    const showCard = document.getElementById('card-conatiner');
    showCard.textContent = ""
    const cardNumber = document.getElementById('post-number');
    cardNumber.innerText = catagory.length;
    catagory.forEach(card => {

        const cardBody = document.createElement('div');
        cardBody.classList.add('row');
        cardBody.classList.add('g-0');
        cardBody.innerHTML = `
                <div class="col-md-4">
                <img src="${card.image_url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                <h5 class="card-title">${card.title}</h5>
                <p class="card-text"> ${card.details}</p >
            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                </div >
            </div >
    `


        showCard.appendChild(cardBody)
    });

}





loadCatagories()