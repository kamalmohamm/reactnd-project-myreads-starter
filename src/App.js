import React from "react";
import "./App.css";
import SearchScreen from "./SearchScreen";
import HomeScreen from "./HomeScreen";
import * as BooksAPI from "./BooksAPI";
import { Route, BrowserRouter as Router } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    ctaegorizedBooks: {},
    isLoading: false,
    searchPageShown: false,
  };

  setCategorizedBooks = (ctaegorizedBooks) =>
    this.setState({ ctaegorizedBooks });

  setLoading = () => this.setState({ isLoading: true });

  clearLoading = () => this.setState({ isLoading: false });

  showSearchPage = () => this.setState({ searchPageShown: true });

  hideSearchPage = () => this.setState({ searchPageShown: false });

  categorizeBooks = (books) => {
    const categorizedBooks = {};
    books.forEach((book) => {
      if (categorizedBooks[book.shelf]) {
        categorizedBooks[book.shelf].push(book);
      } else {
        categorizedBooks[book.shelf] = [book];
      }
    });
    this.setCategorizedBooks(categorizedBooks);
  };

  fetchBooks = () => {
    const { setLoading, clearLoading } = this;
    setLoading();
    BooksAPI.getAll()
      .then((books) => {
        console.log(books);
        this.categorizeBooks(books);
      })
      .catch((err) => console.error("error getting books", err))
      .finally(clearLoading);
  };

  render() {
    const { isLoading } = this.state;
    return (
      <Router>
        <div>
          <Route
            path="/search"
            render={() => (
              <SearchScreen
                hideSearchPage={this.hideSearchPage}
                setLoading={this.setLoading}
                clearLoading={this.clearLoading}
                books={this.state.ctaegorizedBooks}
                fetchBooks={this.fetchBooks}
              />
            )}
          />

          <Route
            exact
            path="/"
            render={() => (
              <HomeScreen
                showSearchPage={this.showSearchPage}
                setLoading={this.setLoading}
                clearLoading={this.clearLoading}
                books={this.state.ctaegorizedBooks}
                setBooks={this.setCategorizedBooks}
                fetchBooks={this.fetchBooks}
              />
            )}
          />
        </div>
      </Router>
    );
  }
}
export default BooksApp;
