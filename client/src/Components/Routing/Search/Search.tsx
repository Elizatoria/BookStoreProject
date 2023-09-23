import { useState, useEffect } from 'react';
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

return (
 <div style={{ padding: 20 }}>
            <input
            type="text"
            placeholder="Enter Your Book Name"
            onChange={(e) => searchItems(e.target.value)}
            />
            <button disabled={!filteredResults} onClick={searchItems}>
//           Search
//         </button>
            <div style={{ marginTop: 20 }}>
                {searchInput.length > 1 ? (
                    filteredResults.map((item) => {
                        return (
                            <div className='Card'>
                                <div className='Content'>
                                    <h2>{item.title}</h2>
                                    <h3>
                                        {item.authors}
                                    </h3>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    APIData.map((item) => {
                        return (
                            <div className='Card'>
                                <div className='Content'>
                                    <h2>{item.title}</h2>
                                    <h3>
                                        {item.authors}
                                    </h3>
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}

export default Search;