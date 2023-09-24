import { useState, useEffect, FormEvent } from 'react';
import axios from "axios";

interface BookType {
    title: string,
    authors: string
}

const Search = () => {
    const [APIData, setAPIData] = useState<BookType[]>([]);
    const [filteredResults, setFilteredResults] = useState<BookType[]>([]);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        axios.get('/api/book/search/bookTitle'+APIData+'&key=AIzaSyA6SaT23KNiiA6DnUfUQTvFeyAcQEkwnSU'+'&maxResults=40')
            .then((response) => {
                setAPIData(response.data);
                console.log(response.data);
            })
    }, [APIData])

    const searchItems = (searchValue: string) => {
        setSearchInput(searchValue);
        if (searchInput !== '') {
            const filteredData = APIData.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData)
        }
        else{
            setFilteredResults(APIData)
        }
    }

    const handleSubmit = (e: FormEvent ) => {
        e.preventDefault();
      };

return (
    <form className="container mt-4" method="POST" onSubmit={handleSubmit}>
            <input
            type="text"
            placeholder="Enter Your Book Name"
            value={searchInput || ""}
            onChange={(e) => searchItems(e.target.value)}
            />
      <button type="submit" className="btn btn-primary">
        Submit
      </button>

      {filteredResults && (
        <div className="card card-body bg-light mt-4 mb-4">
          Results:
          <ul className="list-unstyled mb-0">
            {Object.values(filteredResults).map((value, index) => {
              return <li key={`value-${index}`}>{value.title}</li>;
            })}
          </ul>

        </div>
      )}
    </form>
    )
}

export default Search;