// const { Input } = require("postcss");

const templates = {
    bookList: Handlebars.compile(
        document.querySelector('#template-book').innerHTML
    ),
};

class BooksList {
    constructor() {
        this.favoriteBooks = [];
        this.filters = [];

        this.initData();
        this.getElements();
        this.render();
        this.initActions();
    }

    initData() {
        this.data = dataSource.books;
    }

    getElements() {
        this.filterContainer = document.getElementsByClassName('filters');
        this.bookListElements = document.getElementsByClassName('books-list');
    }

    render() {
        for (const book of this.data) {
            const ratingBgc = this.determineRatingBgc(book.rating);
            const ratingWidth = book.rating * 10;

            book.ratingWidth = ratingWidth;
            book.ratingBgc = ratingBgc;

            const generatedHTML = templates.bookList(book);
            this.bookListElements[0].appendChild(utils.createDOMFromHTML(generatedHTML));
        }
    }

    filterBooks() {

        for (const book of this.data) {
            let shouldBeHidden = false;

            for (const filter of this.filters) {
                if (book.details[filter] !== true) {
                    shouldBeHidden = true;
                    break;
                }
            }
            const bookElement = document.querySelector(`.book__image[data-id="${book.id}"]`);
            if (shouldBeHidden) {
                bookElement.classList.add('hidden');
            } else {
                bookElement.classList.remove('hidden');
            }
        }
    }

    initActions() {
        const thisBook = this;
        this.bookListElements[0].addEventListener('dblclick', function (event) {
            event.preventDefault();
            const parentElemnt = event.target.offsetParent;
            if (parentElemnt.classList.contains('book__image')) {
                const dataId = parentElemnt.getAttribute('data-id');
                if (thisBook.favoriteBooks.includes(dataId)) {
                    parentElemnt.classList.remove('favorite');
                    thisBook.favoriteBooks = thisBook.favoriteBooks.filter(item => item !== dataId);

                } else {
                    parentElemnt.classList.add('favorite');
                    thisBook.favoriteBooks.push(dataId);
                }
            }
        });

        this.filterContainer[0].addEventListener('click', function (event) {
            console.log(event);
            if (event.target.tagName === 'INPUT' &&
                event.target.type === 'checkbox' &&
                event.target.name === 'filter') {
                console.log('Checkbox value:', event.target.value);

                const filterValue = event.target.value;

                if (event.target.checked) {
                    if (!thisBook.filters.includes(filterValue)) {
                        thisBook.filters.push(filterValue);
                    }
                } else {
                    const index = thisBook.filters.indexOf(filterValue);
                    if (index !== -1) {
                        thisBook.filters.splice(index, 1);
                    }
                }
            }
            console.log('Current filters:', this.filters);

            thisBook.filterBooks();
        });
    }

    determineRatingBgc(rating) {
        if (rating < 6) {
            return 'linear-gradient(to bottom, #fefcea 0%, #f1da36 100%)';
        }
        else if (rating > 6 && rating <= 8) {
            return 'linear-gradient(to bottom, #b4df5b 0%, #b4df5b 100%)';
        }
        else if (rating > 8 && rating <= 9) {
            return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
        }
        else if (rating > 9) {
            return 'linear-gradient(to bottom, #ff0084 0%, #ff0084 100%)';
        }
    }
}
// eslint-disable-next-line no-unused-vars
const app = new BooksList();

