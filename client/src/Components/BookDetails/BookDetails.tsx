import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface BookType {
  title: string,
  imageLinks: {
    thumbnail: string
  }
  description: string,
  authors: string,
  categories: string,
}

const BookDetails = () => {
  const [book, setBook] = useState<BookType>();

  const {id} = useParams();

  useEffect(() => {
    axios.get(`/api/book/${id}`)
    .then((res) => {
      setBook(res.data.book);
    })
    .catch((err) => {console.log(err)})
  }, [id])

  const image = `${book?.imageLinks.thumbnail}`;

  return (
    <div>
      <div className='titleImage'>
        <h2>{book?.title}</h2>
        <img src={image} alt='Book' />
      </div>
      <div className='details'>
        <h2>Description</h2>
        <p>{book?.description}</p>
        <h2>Authors</h2>
        <p>{book?.authors}</p>
        <h2>Categories</h2>
        <p>{book?.categories}</p>
      </div>
    </div>
  )
}

export default BookDetails;