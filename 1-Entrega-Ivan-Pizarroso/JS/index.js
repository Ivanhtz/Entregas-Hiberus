//Global Variables
const body = document.getElementById("body");
const buttonAddNews = document.querySelector(".article__header--add");
const buttonBurguer = document.querySelector(".burguer__menu");
let newsContainer = document.querySelector(".news");
const formNewsContainer = document.querySelector(".main__section--form");
const formNewsContainerUpdate = document.querySelector(".main__section--form-update");
const formNews = document.getElementById("form__add");
const formNewsUpdate = document.getElementById("form__update");
const buttonFormClose = document.querySelector(".buttons__close");
const buttonFormModify = document.getElementById("button__update");
let countNews = document.querySelector(".count");
let newsExit;
let indexExit;
let arrayNews = [];




// Functions
function loadData() {
    let dataExist = localStorage.getItem("dates");

    if (dataExist === null || typeof dataExist === 'undefined') {
        const news1 = {
            "title": "Somos los mejores 1",
            "image": "./assets/images/image1.svg",
            "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit"
        }

        arrayNews.push(news1);

        const news2 = {
            "title": "Somos los mejores 2",
            "image": "./assets/images/image2.svg",
            "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit"
        }

        arrayNews.push(news2);

        const news3 = {
            "title": "Somos los mejores 3",
            "image": "./assets/images/image3.svg",
            "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit"
        }

        arrayNews.push(news3);

        localStorage.setItem("dates", JSON.stringify(arrayNews));

    }
};

function init() {
    console.log(`🔹🔹🔹🔹🔹🔹🔹🔹🔹`);
    console.log(`🔹Arrancando...👾 🔹`);
    console.log(`🔹🔹🔹🔹🔹🔹🔹🔹🔹`);

    let dates = loadData();

    let numberNews = JSON.parse(localStorage.getItem("dates")).length;
    countNews.innerText = numberNews;

    printData();
}

function createNew(news) {

    const newNews = {
        title: news.title,
        image: news.url,
        text: news.text
    }

    arrayNews.push(newNews);

    location.reload();

    return newNews;
}

function saveData() {
    localStorage.setItem('dates', JSON.stringify(arrayNews));

    let numberNews = JSON.parse(localStorage.getItem("dates")).length;
    countNews.innerText = numberNews;

    printData();
}

function printData() {
    newsContainer.innerHTML = '';

    arrayNews = JSON.parse(localStorage.getItem("dates"));

    if (arrayNews === null) {
        arrayNews = [];
    } else {

        arrayNews.forEach(element => {

            newsContainer.innerHTML += `
            
                <article class="main__section--article border">
                    <header>
                        <h3>${element.title}</h3>
                        <div class="buttons">
                            <div class="button__update">
                                <img src="./assets/images/update.svg" alt="iconupdate" id="update" name="${element.title}">
                            </div>
                            <div class="button__delete">
                                <img src="./assets/images/delete.svg" alt="icondelete" id="delete" name="${element.title}">
                            </div>
                        </div>
                    </header>

                    <div class="article__body">
                        <figure>
                            <img src=${element.image} alt="image article">
                            <figcaption>Imagen 1</figcaption>
                        </figure>

                        <div class="article__text">
                            <p>
                                ${element.text}
                            </p>
                        </div>
                    </div>

                    <div class="read__more">
                        <a href="#">Leer mas</a>
                    </div>
                </article>
            
            `;
        });
    }
}

function deleteNews(title) {

    let indexArray = arrayNews.findIndex(element => element.title === title);

    arrayNews.splice(indexArray, 1);

    saveData();

    location.reload();

}

function editNews(noticia, index) {

    let newsOfArray = arrayNews[index]

    newsOfArray.title = document.querySelector("#title__update").value;
    newsOfArray.image = document.querySelector("#image__update").value;
    newsOfArray.text = document.querySelector("#text__update").value;

    saveData();

    location.reload();
}


function updateNews(title) {

    let indexArray = arrayNews.findIndex(element => element.title === title);

    let news = arrayNews[indexArray];

    formNewsContainerUpdate.classList.toggle("is-active");

    document.querySelector("#title__update").value = news.title;
    document.querySelector("#image__update").value = news.image;
    document.querySelector("#text__update").value = news.text;

    newsExit = news;
    indexExit = indexArray;

}



// Events
body.addEventListener('load', init());

buttonAddNews.addEventListener('click', () => {
    formNews.reset();

    formNewsContainer.classList.toggle("is-active");
});

buttonFormClose.addEventListener('click', () => formNewsContainer.classList.toggle("is-active"));

document.getElementById('button__update--close').addEventListener('click', () => formNewsContainerUpdate.classList.toggle("is-active"));

formNews.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.querySelector("#title").value;
    const url = document.querySelector("#image").value;
    const text = document.querySelector("#text").value;

    const news = {
        title: title,
        url: url,
        text: text
    }

    createNew(news);

    saveData();

    formNews.reset();

    formNewsContainer.classList.toggle("is-active");

})

newsContainer.addEventListener('click', (e) => {

    e.preventDefault();

    if (e.target.matches("#delete")) {

        let name = e.target.attributes.name.value;

        if (confirm('Estás Seguro que quieres borrar la noticia?')) {

            deleteNews(name);
        }
    }

    if (e.target.matches("#update")) {

        let name = e.target.attributes.name.value;

        updateNews(name);
    }
})

buttonFormModify.addEventListener('click', () => {

    editNews(newsExit, indexExit);

    formNewsContainerUpdate.classList.toggle("is-active");
});

buttonBurguer.addEventListener('click', () => document.querySelector(".mobile__menu").classList.toggle("show"));




//****PAGINATED
let thisPage = 1;
let limit = 2;
let list = document.querySelectorAll('.news .main__section--article');

function loadItem() {
    let beginGet = limit * (thisPage - 1);
    let endGet = limit * thisPage - 1;

    list.forEach((item, key) => {
        if (key >= beginGet && key <= endGet) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    })

    listPage();
}

loadItem();

function listPage() {
    let count = Math.ceil(list.length / limit);

    document.querySelector('.listPage').innerHTML = '';

    if (thisPage != 1) {
        let prev = document.createElement('li');
        prev.innerText = 'PREV';
        prev.setAttribute('onclick', "changePage(" + (thisPage - 1) + ")");
        document.querySelector('.listPage').appendChild(prev);
    }

    for (i = 1; i <= count; i++) {
        let newPage = document.createElement('li');
        newPage.innerText = i;

        if (i == thisPage) {
            newPage.classList.add('prueba');
        }
        newPage.setAttribute('onclick', "changePage(" + i + ")");
        document.querySelector('.listPage').appendChild(newPage);
    }

    if (thisPage != count) {
        let next = document.createElement('li');
        next.innerText = 'NEXT';
        next.setAttribute('onclick', "changePage(" + (thisPage + 1) + ")");
        document.querySelector('.listPage').appendChild(next);
    }
}

function changePage(i) {
    thisPage = i;
    loadItem();
}

// !PAGINATED