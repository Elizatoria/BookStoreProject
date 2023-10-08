import { useState} from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

    console.log(filteredResults);

    const navigate = useNavigate();

  const handleOnClick = () => {
    
      axios.get(`/api/book/search/${searchInput}`)
          .then((response) => {
              setFilteredResults(response.data.books);
              console.log(response.data.books);
          })
          .catch((error) => {
            console.log(error)
          })
  };

  return (
    <div>
      <div className="title">
        <h2>A room without books is like a body without a soul. – Marcus Tullius Cicero</h2>
        <h3>Book Find</h3>
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
        <button disabled={!searchInput} onClick={handleOnClick}>
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
            return (
              <div className="body__item">
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