import React, {useState,useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const UpdateBookInfo = () => {

  const id = useParams().id;
  const history = useNavigate();
  // console.log("this is object id ", id);
  const [book, setBook] = useState({});
  useEffect(() => {
    const run = () => {
      axios.get(`https://mern-book-api.onrender.com/${id}`)
        .then(res =>setBook(res.data))
    }
    run();
  }, [id])
  
  const handleChange = (e) => {
    setBook((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.value,   
    }));
 }

  const sendRequest = async() => {
    await axios.put(`https://mern-book-api.onrender.com/${id}`, {
      title: book.title,
      isbn:book.isbn,
      author:book.author,
      description:book.description,
      published_date:book.published_date,
      publisher:book.publisher,
     })
      .then(res =>res.data)
   }
  const Ssubmit = (e) => {
    e.preventDefault();
    console.log("submit")
  
    sendRequest().then(() => history('/'));
   
  }

  // -md-8
  return (
     <div className="UpdateBookInfo">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/" className="btn btn-outline-warning float-left">
                  Show BooK List
              </Link>
            </div>
            <div className="col m-auto">
              <h1 className="display-4 text-center">Edit Book</h1>
              <p className="lead text-center">
                  Update Book's Info
              </p>
            </div>
          </div>

          <div className="col m-auto">
          <form  onSubmit={Ssubmit}>
            <div className='form-group'>
              <label htmlFor="title">Title</label>
              <input
                type='text'
                placeholder='Title of the Book'
                name='title'
                className='form-control'
                value={book.title}
                onChange={handleChange}
                />
            </div>
            <br />

            <div className='form-group'>
            <label htmlFor="isbn">ISBN</label>
              <input
                type='text'
                placeholder='ISBN'
                name='isbn'
                className='form-control'
                value={book.isbn}
                onChange={handleChange}
                />
            </div>

            <div className='form-group'>
            <label htmlFor="author">Author</label>
              <input
                type='text'
                placeholder='Author'
                name='author'
                className='form-control'
                value={book.author}
                onChange={handleChange}
                
                />
            </div>

            <div className='form-group'>
            <label htmlFor="description">Description</label>
              <input
                type='text'
                placeholder='Describe this book'
                name='description'
                className='form-control'
                value={book.description}
                onChange={handleChange}
              />
            </div>

            <div className='form-group'>
            <label htmlFor="published_date">Published Date</label>
              <input
                type='date'
                placeholder='published_date'
                name='published_date'
                className='form-control'
                value={book.published_date}
                onChange={handleChange}
              />
            </div>
            <div className='form-group'>
            <label htmlFor="publisher">Publisher</label>
              <input
                type='text'
                placeholder='Publisher of this Book'
                name='publisher'
                className='form-control'
                value={book.publisher}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-outline-info btn-lg btn-block">Update Book</button>
            </form>
          </div>

        </div>
      </div>
  )
}

export default UpdateBookInfo
