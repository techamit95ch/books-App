import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// import yelp from '../api/yelp'
import { getAll } from "../actions/books";
export default () => {
  const dispatch = useDispatch();
  const [authors, setAuthors] = useState([]);

  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    dispatch(getAll());
  }, []);
  const books = useSelector((state: any) => {
    state.books.book.sort((a: any, b: any) => b.localeCompare(a));
  });

  const searchAuthor = async (SearchTerm) => {
    try {
      /*  const response = await yelp.get("/search", {
          params: {
            limit: 50,
            term:SearchTerm,
            location: "san jose",
          },
        }); */
      // setResults(response.data.businesses);
      // console.log(response.data.businesses);
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    searchAuthor("All");
  }, []);
  return [searchAuthor, results, error];
};
