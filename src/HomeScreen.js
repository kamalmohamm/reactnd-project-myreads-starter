import React from "react";
import Book from "./Book";
import { shelfNameMapper } from "./utils";
import { Link } from "react-router-dom";

class HomeScreen extends React.Component {
  componentDidMount() {
    this.props.fetchBooks();
  }

  render() {
    const { showSearchPage, setLoading, clearLoading, books } = this.props;
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              {Object.keys(books).map((key) => {
                const shelfBooks = books[key];
                return (
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">{shelfNameMapper[key]}</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {shelfBooks.map((book) => (
                          <Book
                            books={books}
                            book={book}
                            fetchBooks={this.props.fetchBooks}
                            setLoading={setLoading}
                            clearLoading={clearLoading}
                          />
                        ))}
                      </ol>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <Link to="/search">
              <div className="open-search">
                <button onClick={showSearchPage}>Add a book</button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeScreen;
