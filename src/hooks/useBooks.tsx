import React,{  useState } from "react";
import {  useSelector } from "react-redux";

// import yelp from '../api/yelp'
export default () => {
  const [authors, setAuthors] = useState([]);

  const [results, setResults] = useState<any>([]);
  const [error, setError] = useState("");
  
  const books = useSelector((state: any) => state.books.books);
  // console.log(books);
  books.forEach((book: any) =>{
    if (!authors.includes(book.author)){
      setAuthors([...authors, book.author]);
    }
  })
  const searchAuthor = async (SearchTerm:string) => {
    try {
      if (SearchTerm === "All"||SearchTerm === "") await setResults(books);
      else{
        let arr: any[] =[];
        console.log(SearchTerm);
        await books.forEach((book: any) =>SearchTerm===book.author?arr.push(book):null);
        console.log(arr);

        await setResults(arr);
        console.log(results);

      //   await setResults(books.filter(book => book.author === SearchTerm));
      }
      
    } catch (err) {
      setError("Something went wrong");
    }
  };

 
  return [searchAuthor, results, error,authors];
};
