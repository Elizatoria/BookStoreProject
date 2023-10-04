import { useState, useContext, useEffect, useCallback } from "react";
import { AccessTokenContext } from "../../Contexts/AccessTokenContext";
import axios from "axios";
//import BookshelfLabel from "../BookshelfLabel/BookshelfLabel";
import { useNavigate } from "react-router-dom";
//import BookshelfMove from "../../BookshelfMove/BookshelfMove";

interface IBook {
  id: string;
  title: string;
  image: string;
  synopsis: string;
  shelf: string;
  [key: string]: any;
}

interface IBookResponse {
  books: {
    wantToRead: IBook[],
    currentlyReading: IBook[],
    read: IBook[]
  }
}

function Bookshelf() {
  
  const [ wantRead, setWantRead] = useState<IBook[]>([]);
  const [ currently, setCurrently] = useState<IBook[]>([]);
  const [ read, setRead] = useState<IBook[]>([]);

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  //Getting access token from the Context API
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
      const books = response.data.books;
      setWantRead(books.wantToRead);
      setCurrently(books.currentlyReading);
      setRead(books.read);
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

  const [bookLabel, setBookLabel] = useState('');

  return (
    <div className="container mt-2 mb-5">
      <div className="d-flex justify-content-between">
      <button
          type="button"
          className="btn btn-primary mb-2"
          onClick={() => logout()}
        >
          Logout
        </button>
        <h1 className="h2">My Bookshelf</h1>
      </div>

      <h2>Want To Read</h2>
      {wantRead.map((book) => {
        const key = `book-${book.id}`;
        const name = `${book.title}`;
        const image = `${book.imageLinks.thumbnail}`;
        return (
          <div key={key}>
            <img src={image} alt='Book Details Button' onClick={() => {navigate(`/book/${book.id}`)}} />
            <h3>{name}</h3>
            
            <div className='labels'>
    <label htmlFor="rank">Change Bookshelf:</label>
    <select
      value={bookLabel}
      onChange={event => axios.request({
        method: "PUT",
        url: `/api/bookshelf/${book.id}/${event.target.value}`,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
       })
         .then((response) => {
          console.log(response.data.books.shelf);
           setBookLabel(response.data.books.shelf);
         })
      .catch((error) => {
                  console.log(error)
      })}
    >
      <option value="">Pick A Shelf</option>
      <option value="wantToRead">Want To Read</option>
      <option value="currentlyReading">Currently Reading</option>
      <option value="read">Read</option>
    </select>
    <small>{bookLabel}</small>
  </div>

            <button onClick={() => axios.delete(`/api/bookshelf/${book.id}`,
             { headers: { Authorization: `Bearer ${getToken()}` } })
             .then(() => {
              alert("Post deleted!");
              setBookLabel("");
            })}>:x:</button>
          </div>
        );
      })}

      <h2>Currently Reading</h2>
      {currently.map((book) => {
        const key = `book-${book.id}`;
        const name = `${book.title}`;
        const image = `${book.imageLinks.thumbnail}`;
        return (
          <div key={key}>
            <img src={image} alt='Book Details Button' onClick={() => {navigate(`/book/${book.id}`)}} />
            <h3>{name}</h3>
            
            <div className='labels'>
    <label htmlFor="rank">Change Bookshelf:</label>
    <select
      value={bookLabel}
      onChange={event => axios.request({
        method: "PUT",
        url: `/api/bookshelf/${book.id}/${event.target.value}`,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
       })
         .then((response) => {
          console.log(response.data.books.shelf);
           setBookLabel(response.data.books.shelf);
         })
      .catch((error) => {
                  console.log(error)
      })}
    >
      <option value="">Pick A Shelf</option>
      <option value="wantToRead">Want To Read</option>
      <option value="currentlyReading">Currently Reading</option>
      <option value="read">Read</option>
    </select>
    <small>{bookLabel}</small>
  </div>

            <button onClick={() => axios.delete(`/api/bookshelf/${book.id}`,
             { headers: { Authorization: `Bearer ${getToken()}` } })
             .then(() => {
              alert("Post deleted!");
              setBookLabel("");
            })}>:x:</button>
          </div>
        );
      })}

      <h2>Read</h2>
      {read.map((book) => {
        const key = `book-${book.id}`;
        const name = `${book.title}`;
        const image = `${book.imageLinks.thumbnail}`;
        return (
          <div key={key}>
            <img src={image} alt='Book Details Button' onClick={() => {navigate(`/book/${book.id}`)}} />
            <h3>{name}</h3>
            
            <div className='labels'>
    <label htmlFor="rank">Change Bookshelf:</label>
    <select
      value={bookLabel}
      onChange={event => axios.request({
        method: "PUT",
        url: `/api/bookshelf/${book.id}/${event.target.value}`,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
       })
         .then((response) => {
          console.log(response.data.books.shelf);
           setBookLabel(response.data.books.shelf);
         })
      .catch((error) => {
                  console.log(error)
      })}
    >
      <option value="">Pick A Shelf</option>
      <option value="wantToRead">Want To Read</option>
      <option value="currentlyReading">Currently Reading</option>
      <option value="read">Read</option>
    </select>
    <small>{bookLabel}</small>
  </div>

            <button onClick={() => axios.delete(`/api/bookshelf/${book.id}`,
             { headers: { Authorization: `Bearer ${getToken()}` } })
             .then(() => {
              alert("Post deleted!");
              setBookLabel("");
            })}>:x:</button>
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

export default Bookshelf;