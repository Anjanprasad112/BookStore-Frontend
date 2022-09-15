import React, { useEffect, useState } from 'react'
import Book from './Book'
import './Book.css'
import axios from 'axios'
const URL = 'http://localhost:5000/books';
const fetechHandler = async () => {
  return await axios.get(URL).then((res)=>res.data);
}
const Books =()=>{
    const [books,setBooks] = useState();
    useEffect(()=>{
        fetechHandler().then((data)=>setBooks(data.books));
    },[]);
    console.log(books)
    return <div>
        <h3 style={{textAlign: 'center',margin: '15px'}}>Click on Add Books and You can view book here...</h3>
        <ul>
            {books && books.map((book,i)=>(
                <li className="book" key={i}>
                    <Book book={book} />
                </li>
            ))}
        </ul>
    </div>
}

export default Books