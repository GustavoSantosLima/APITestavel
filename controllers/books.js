class BooksController {
    constructor(Books){
        this.Books = Books;
    }

    getAll(){
        return this.Books.findAll({})
            .then(result => result);
    }
}

export default BooksController;