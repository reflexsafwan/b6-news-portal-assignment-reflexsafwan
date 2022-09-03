
const loadCatagories = () => {
    const url = ('https://openapi.programming-hero.com/api/news/categories')
    fetch(url)
        .then(res => res.json())
        .then(data => displayCatagories(data.data.news_category))
        .catch(error => console.log(error));
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
        toggleSpiner(true)
    });
}

const loadingNews = (catagoryID) => {
    const url = ` https://openapi.programming-hero.com/api/news/category/${catagoryID}`
    fetch(url)
        .then(res => res.json())
        .then(catagory => displayNews(catagory.data));


}
const displayNews = (catagory) => {
    // console.log(catagory)
    const showCard = document.getElementById('card-conatiner');
    showCard.textContent = ""
    const cardNumber = document.getElementById('post-number');
    cardNumber.innerText = catagory.length;
    catagory.forEach(card => {
        // console.log(card._id)
        const cardBody = document.createElement('div');
        cardBody.classList.add("row", "g-0", "my-4");

        cardBody.innerHTML = `
                <div class="col-md-4 ">
                <img src="${card.image_url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${card.title ? card.title : "not found"}</h5>
                    <p class="card-text"> ${card.details.length > 100 ? card.details.slice(0, 250) + '...' : 'not found'}</p >
                    <div class="d-lg-flex justify-content-evenly">
                    <div class="d-flex">
                      <img class="rounded-circle" width = 40px src="${card.author.img}" alt="">
                      <div>
                        <h4>${card.author.name ? card.author.name : "Author Not Found"}</h4>
                      </div>
                    </div>
                    <div>
                        <div class ="d-lg-flex">
                            <i class="fa-regular fa-eye"></i>
                            <p>${card.total_view ? card.total_view : "No views"}</p>
                        </div>
                            
                         </div>
                    <div>
                      <button onclick = "loadNewsDetails('${card._id}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Showdetails</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            </div >
    `


        showCard.appendChild(cardBody)

        toggleSpiner(false);
    });




}

const loadNewsDetails = (news_id) => {
    // console.log(news_id)
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`
    fetch(url)
        .then(res => res.json())
        .then(news => showNewsdetails(news.data[0]))

}
const showNewsdetails = (news) => {
    console.log(news)
    const modalId = document.getElementById('modal-dialog');
    modalId.textContent = '';
    const modalDiv = document.createElement('div');
    modalDiv.classList.add("modal-content",);
    modalDiv.innerHTML = `
                        <div class="modal-header">
                              <h5 class="modal-title" id="exampleModalLabel">${news.author.name ? news.author.name : "No Author Found"}</h5>
                              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                            <P> Published Date: ${news.author.published_date}</p>
                            <img class ="w-100" src="${news.author.img}">
                            </div>
                            <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
    `
    modalId.appendChild(modalDiv)


}

const toggleSpiner = isLoading => {
    const loaderSection = document.getElementById('loader')
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    }
    else {
        loaderSection.classList.add('d-none')
    }
}



loadCatagories()