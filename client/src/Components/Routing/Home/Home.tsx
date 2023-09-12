import { useState, useContext, useEffect, useCallback } from "react";
import { AccessTokenContext } from "../../../Contexts/AccessTokenContext";
import axios from "axios";

interface IBook {
  id: string;
  title: string;
  poster: string;
  synopsis: string;
  [key: string]: any;
}

interface IBookResponse {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  data: IBook[];
}

function Home() {
  const [books, setBooks] = useState<IBook[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  /**
   * Getting access token from the Context API
   */
  const { getToken, logout } = useContext(AccessTokenContext);

  const getBooks = useCallback(async () => {
    try {
      const response = await axios.request<IBookResponse>({
        method: "GET",
        url: "/api/bookshelf",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      const books = response.data.data;
      setBooks(books);
    } catch (error) {
      console.error(error);
      /**
       * If the response returns an HTTP status of 401 in this case, that means that the token has expired or is invalid.
       * Ideally, we would want to refresh the JWT token
       * but we need to be careful to get into a never ending loop.
       */
      setErrorMessage("Oh no! An unexpected error occurred.");
    }
  }, [getToken]);

  useEffect(() => {
    getBooks();
  }, [getBooks]);

  return (
    <div className="container mt-2 mb-5">
      <div className="d-flex justify-content-between">
        <h1 className="h2">You are logged in!</h1>
        <button
          type="button"
          className="btn btn-primary mb-2"
          onClick={() => logout()}
        >
          Logout
        </button>
      </div>
      {books.map((book) => {
        const key = `book-${book.id}`;
        const name = `${book.title}`;
        return (
          <div key={key}>
            <img src={book.poster} alt={name} />
            <p>{name}</p>
          </div>
        );
      })}
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
    </div>
  );
}

export default Home;