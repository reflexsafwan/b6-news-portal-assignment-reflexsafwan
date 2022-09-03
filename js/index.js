
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
    // console.log(catagory)
    const showCard = document.getElementById('card-conatiner');
    showCard.textContent = ""
    const cardNumber = document.getElementById('post-number');
    cardNumber.innerText = catagory.length;
    catagory.forEach(card => {
        // console.log(card._id)
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
                    <p class="card-text"> ${card.details.length > 100 ? card.details.slice(0, 250) + '...' : 'not found'}</p >
                    <div class="d-flex justify-content-evenly">
                    <div class="d-flex">
                      <img class="rounded-circle" width = 40px src="${card.author.img}" alt="">
                      <div>
                        <h4>${card.author.name}</h4>
                      </div>
                    </div>
                    <div>
                        <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                        </div>
                        <p>${card.total_view}</p>
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
    const modalDiv = document.createElement('div');
    modalDiv.classList.add('modal-content');
    modalDiv.innerHTML = `
                        <div class="modal-header">
                              <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                              ...
                            </div>
                            <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
    `
    modalId.appendChild(modalDiv)


}



loadCatagories()