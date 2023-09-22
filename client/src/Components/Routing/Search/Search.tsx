import { useState, useEffect } from 'react';
import axios from "axios";

interface BookType {
    title: string,
    authors: string
}

const Search = () => {
  const [search, setSearch]=useState<BookType>();
  const [bookData, setBookData]=useState<BookType>();

  useEffect(() => {
    axios.get('/api/book/search/bookTitle'+search+'&key=AIzaSyA6SaT23KNiiA6DnUfUQTvFeyAcQEkwnSU'+'&maxResults=40')
    .then(res=>setBookData(res.data.items))
    .catch(err=>console.log(err))
  }, [])

  const handleOnClick = () => {
    const findBooks =
      search && search?.length > 0
        ? search?.filter((book) => book?.name === bookData)
        : undefined;

    console.log(findBooks);

    setSearch(findBooks);
  };

  return (
    <div>
      <div className="title">
        <h1>A room without books is like a body without a soul. – Marcus Tullius Cicero</h1>
        <h2>Find Your Book</h2>
      </div>
      <div className="input__wrapper">
        <input
          type="text"
          placeholder="Enter Your Book Name"
          value={search}
          onChange={(e) => {
            setBookData(e.target.value);
            setSearch(book.title);
          }}
        />
        <button disabled={!search} onClick={handleOnClick}>
          Search
        </button>
      </div>

      <div className="body">
        {search && search?.length === 0 && (
          <div className="notFound">No User Found</div>
        )}

        {search &&
          search?.length > 0 &&
          search?.map((book) => {
            return (
              <div className="body__item">
                <h3>Title: {book?.title}</h3>
                <p>Authors: {book?.authors}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Search;