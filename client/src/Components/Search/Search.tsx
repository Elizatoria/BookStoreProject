import { useState} from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Search/Search.css";

interface BookType {
  id: string,
  title: string,
  authors: string,
  imageLinks: {
    thumbnail: string
  }
}

const Search = () => {
    const [filteredResults, setFilteredResults] = useState<BookType[] | undefined>([]);
    const [searchInput, setSearchInput] = useState('');

    const navigate = useNavigate();

  const handleOnClick = () => {
    
    //axios call to get search results
      axios.get(`/api/book/search/${searchInput}`)
          .then((response) => {
              setFilteredResults(response.data.books);
          })
          .catch((error) => {
            console.log(error)
          })
  };

  //displays search results
  return (
    <div className='search-page'>
      <div className="title">
        <h2>Book Find</h2>
      </div>
      <div className="input__wrapper">
        <input
          type="text"
          placeholder="Search Book"
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
        <button className='button-search' disabled={!searchInput} onClick={handleOnClick}>
          Search
        </button>
      </div>

      <div className="body">
        {filteredResults && filteredResults?.length === 0 && (
          <div className="notFound">No Books Found</div>
        )}

        {filteredResults &&
          filteredResults?.length > 0 &&
          filteredResults?.map((book) => {
            const key = `book-${book.id}`;
            return (
              <div className="body__item" key={key}>
                <div>
                <img src={book?.imageLinks.thumbnail} alt='Book Details Button' 
                onClick={() => {navigate(`/book/${book.id}`)}} />
                </div>
                <div>
                <h3>Name: {book?.title} </h3>
                <p>Authors: {book?.authors}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Search;