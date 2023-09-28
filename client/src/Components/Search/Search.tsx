import { useState} from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { error } from 'console';

interface BookType {
  id: string,
  title: string,
  authors: string
}

const Search = () => {
    //const [APIData, setAPIData] = useState<BookType[]>([]);
    const [filteredResults, setFilteredResults] = useState<BookType[] | undefined>([]);
    const [searchInput, setSearchInput] = useState('');

    console.log(filteredResults);

    const navigate = useNavigate();



    //The HandleOnClick

  const handleOnClick = () => {
    
      axios.get(`/api/book/search/${searchInput}`)
          .then((response) => {
            console.log(response);

            // searchInput && searchInput?.length > 0
            // ? searchInput?.filter((book) => book?.title === searchInput)
            // : undefined;

            console.log(searchInput);

              setFilteredResults(response.data.books);
              console.log(response.data.books);
          })
          .catch((error) => {
            console.log(error)
          })

          //Put the Filter into then
    // const findBooks =
    //   filteredResults && filteredResults?.length > 0
    //     ? filteredResults?.filter((book) => book?.title === searchInput)
    //     : undefined;

    // console.log(findBooks);

    // setFilteredResults(findBooks);
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
                <h3>Name: {book?.title}</h3>
                <p>Authors: {book?.authors}</p>
                <button onClick={() => {navigate(`/book/${book.id}`)}}>Book Details</button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Search;