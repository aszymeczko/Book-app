const templates = {
    bookList: Handlebars.compile(
        document.querySelector('#template-book').innerHTML
    ),
};

const bookListElements = document.getElementsByClassName('books-list');

function render() {
    for (const book of dataSource.books) {
        const generatedHTML = templates.bookList(book);
        bookListElements[0].appendChild(utils.createDOMFromHTML(generatedHTML));
    }
}

render();


let favoriteBooks = [];

function initActions() {
    const imagesList = document.getElementsByClassName('book__image');

    for (const image of imagesList) {
        image.addEventListener('dblclick', function (event) {
            event.preventDefault();

            const dataId = image.getAttribute('data-id');

            if (favoriteBooks.includes(dataId)) {
                image.classList.remove('favorite');
                favoriteBooks = favoriteBooks.filter(item => item !== dataId);
                // const index = favoriteBooks.indexOf(dataId);
                // favoriteBooks.splice(index, 1);

            } else {
                image.classList.add('favorite');
                favoriteBooks.push(dataId);
            }
            console.log(favoriteBooks);
        });
    }
}

initActions();