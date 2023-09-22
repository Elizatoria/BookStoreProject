import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface BookType {
  title: string,
  imageLinks: string,
  description: string,
  authors: string,
  genres: string
}

const BookDetails = () => {
  const [book, setBook] = useState<BookType>();

  const {id} = useParams();

  useEffect(() => {
    axios.get('/api/book/bookId/')
    .then((res) => {
      setBook(res.data);
    })
    .catch((err) => {console.log(err)})
  }, [id])

  return (
    <div>
      <div>
        <h2>{book?.title}</h2>
        <img src={book?.imageLinks} alt='Book' />
      </div>
      <div>
        <h2>Description</h2>
        <p>{book?.description}</p>
        <h2>Authors</h2>
        <p>{book?.authors}</p>
        <h2>Genres</h2>
        <p>{book?.genres}</p>
      </div>
    </div>
  )
}

export default BookDetails