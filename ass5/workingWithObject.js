const bookLibrary = {
    books: [],
  
    addBook(book) {
      this.books.push(book);
    },
  
    getBooksByAuthor(author) {
      return this.books.filter(book => book.author === author);
    },
  
    removeBook(title) {
      this.books = this.books.filter(book => book.title !== title);
    },
  
    getAllBooks() {
      return this.books.map(book => book.title);
    }
  };
  

  bookLibrary.addBook({ title: "Book One", author: "Author A", yearPublished: 2020 });
  bookLibrary.addBook({ title: "Book Two", author: "Author B", yearPublished: 2018 });
  bookLibrary.addBook({ title: "Book Three", author: "Author A", yearPublished: 2021 });
  
  console.log(bookLibrary.getBooksByAuthor("Author A"));
  bookLibrary.removeBook("Book Two");
  console.log(bookLibrary.getAllBooks());
  