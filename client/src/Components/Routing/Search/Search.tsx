import { useState } from 'react';
import axios from "axios";
import BookDetails from '../BookDetails/BookDetails';

const Search = () => {
  const [search, setSearch]=useState("");
  const [bookData, setBookData]=useState([]);

  axios.get('/api/book/search/bookTitle')
  .then(res=>setBookData(res.data.items))
  .catch(err=>console.log(err))

  return (
    <>
        <div className="header">
            <div className="row1">
                <h1>A room without books is like<br/> a body without a soul.</h1>
            </div>
            <div className="row2">
                <h2>Find Your Book</h2>
                <div className="search">
                    <input type="text" placeholder="Enter Your Book Name"
                    value={search} onChange={e=>setSearch(e.target.value)}
                    />
                    <button><i className="fas fa-search"></i></button>
                </div>
                <img src="./images/bg2.png" alt="" />
            </div>
        </div>

        <div className="container">
          {
                <BookDetails />
          }  
        </div>
    </>
)
}

export default Search;