import React from "react";
import * as BooksAPI from "./BooksAPI";

const getBookShelf = (books, book) => {
  let bookInShelf;
  const shelves = Object.keys(books);
  for (let i = 0; i < shelves.length; i++) {
    const shelfBooks = books[shelves[i]];
    bookInShelf = shelfBooks.find((b) => b.id === book.id);
    if (bookInShelf) {
      return bookInShelf.shelf;
    }
  }
  return undefined;
};

const Book = (props) => {
  const { books, book, fetchBooks, setLoading, clearLoading } = props;
  const { title, subtitle, imageLinks } = book;

  const bookShelf = book.shelf || getBookShelf(books, book);
  console.log("24 bookShelf", bookShelf);

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url("${imageLinks && imageLinks.thumbnail}")`,
          }}
        />
        <div className="book-shelf-changer">
          <select
            value={bookShelf}
            onChange={(event) => {
              setLoading();
              BooksAPI.update(book, event.target.value)
                .then(fetchBooks)
                .catch((err) => console.error("error updating book", err))
                .finally(clearLoading);
            }}
          >
            <option value="move" disabled>
              Move to...
            </option>
            <option value="none">None</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{subtitle}</div>
    </div>
  );
};

export default Book;
