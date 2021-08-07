export default (books: Array<any> = [], action: any) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
    case "CREATE":
      return [...books, action.payload];
    case "DELETE":
      return books.filter((book) => book.key !== action.payload);
    default:
      return books;
  }
};
