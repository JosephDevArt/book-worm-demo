import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { throttle } from "lodash";

import { getBooks, getBooksOnScroll } from "../../../actions/booksActions";

import Book from "../shared/Book/Book";
import TotalAndSort from "../shared/TotalAndSort/TotalAndSort";

function Books() {
  const dispatch = useDispatch();

  const { books, errorMessage, isFetching } = useSelector(
    (state) => ({
      books: state.books.books,
      errorMessage: state.books.errorMessage,
      isFetching: state.books.isFetching,
    }),
    shallowEqual
  );

  const inputEl = useRef(null);

  const searchBtnClick = () => {
    dispatch(getBooks(inputEl.current));
  };

  const handleScroll = throttle(() => {
    // Load more books on scroll
    dispatch(getBooksOnScroll(books));
  }, 400);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      handleScroll.cancel(); //cancel throttling
      window.removeEventListener("scroll", handleScroll);
    };
  }, [books.length]);

  return (
    <section className="books-section">
      <form
        onSubmit={(e) => e.preventDefault()}
        className={`search-books ${books.length ? "move-top" : ""}`}
      >
        <input
          type="text"
          className="input-search-books"
          placeholder="Search books..."
          required
          ref={inputEl}
        ></input>
        <button
          type="submit"
          onClick={searchBtnClick}
          disabled={isFetching ? true : false}
          className="btn-search"
        >
          Search
          {isFetching && <i className="fa fa-refresh fa-spin"></i>}
          {/*add spinner animation on loading books */}
        </button>
      </form>

      {/*if books not found*/}
      <p className="error-message">{errorMessage}</p>

      <div className="search-results">
        <TotalAndSort scope="books" />
        <ul className="books">
          {books.map((book) => (
            <Book key={book.id} scope="books" book={book} />
          ))}
        </ul>
        <div className="more-content-load-text">
          {isFetching && "Loading more books..."}
        </div>
      </div>
    </section>
  );
}
export default Books;
