import React from "react";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";
import { Link } from "react-router-dom";

class SearchScreen extends React.Component {
  state = {
    input: "",
    searchBooks: [],
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.input !== this.state.input) {
      if (this.state.input === "") {
        this.setState({ searchBooks: [] });
        return;
      }
      this.fetchBooks(this.state.input);
    }
  }

  fetchBooks = (input) => {
    const { setLoading, clearLoading } = this.props;
    setLoading();
    BooksAPI.search(input)
      .then((books) => {
        console.log(books);
        if (Array.isArray(books)) {
          this.setState({ searchBooks: books });
        } else {
          this.setState({ searchBooks: [] });
        }
      })
      .catch((err) => console.error("error getting books", err))
      .finally(clearLoading);
  };

  updateInput = (event) => this.setState({ input: event.target.value });

  render() {
    const { hideSearchPage, setLoading, clearLoading, books } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search" onClick={hideSearchPage}>
              Close
            </button>
          </Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.updateInput}
            />
          </div>
        </div>

        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchBooks.map((book) => (
              <li>
                <Book
                  books={books}
                  book={book}
                  setLoading={setLoading}
                  clearLoading={clearLoading}
                  fetchBooks={this.props.fetchBooks}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchScreen;
