import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BookshelfLabel from '../BookshelfLabel/BookshelfLabel';

interface BookType {
  title: string,
  imageLinks: {
    thumbnail: string
  }
  description: string,
  authors: string,
  publishedDate: string,
  publisher: string,
  categories: string
}

const BookDetails = () => {
  const [book, setBook] = useState<BookType>();

  const {id} = useParams();

  //axios call to the book
  useEffect(() => {
    axios.get(`/api/book/${id}`)
    .then((res) => {
      setBook(res.data.book);
    })
    .catch((err) => {console.log(err)})
  }, [id])

  const image = `${book?.imageLinks.thumbnail}`;

  //displays book details
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
        <h2>Published Date</h2>
        <p>{book?.publishedDate}</p>
        <h2>Publisher</h2>
        <p>{book?.publisher}</p>
        <h2>Categories</h2>
        <p>{book?.categories}</p>
      </div>
      <BookshelfLabel />
    </div>
  )
}

export default BookDetails;