import { useState } from 'react'

const BookselfLabel = () => {

  const [bookLabel, setBookLabel] = useState("");

  return (
    <div>
    <label htmlFor="rank">Choose a Bookshelf:</label>
    <select
      value={bookLabel}
      onChange={event => setBookLabel(event.target.value)}
    >
      <option value=""></option>
      <option value="want-to-read">Want To Read</option>
      <option value="currently-reading">Currently Reading</option>
      <option value="read">Read</option>
    </select>
    <small>{bookLabel}</small>
  </div>
  )
}

export default BookselfLabel;