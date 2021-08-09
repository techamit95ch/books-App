import React, { useState, useEffect } from "react";
import { NativeBaseProvider, FlatList, Center, Spinner } from "native-base";
import Book from "../../components/ListViews/Book";
import FilterAuthor from "../../components/ListViews/FiterAuth";
import { LogBox } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import UseBooks from "../../hooks/useBooks";
const Books = ({ navigation }) => {
  // const books = useSelector((state: any) => state.books.books);
  const [searchAuthor, results, authors, filterAuthor, setFilterAuthor] =
    UseBooks();
  let [books, setBooks]= useState([]);
  const [moreBook,setMoreBook]= useState(filterAuthor);
  // const [filterAuthor, setFilterAuthor]= useState("All");
  useEffect(() => {
    setBooks(results);
  }, [ books,moreBook]);
  return (
    <NativeBaseProvider>
      <SafeAreaView style={{ backgroundColor: "white" }}>
        {!results.length ? (
          <NativeBaseProvider>
          <Center flex={1} style={{justifyContent: "center", marginTop:40,backgroundColor: "white"}}>
            <Spinner color="green.500" size="lg" />
          </Center>
          </NativeBaseProvider>
        ) : (
          <>
            <FilterAuthor
              setFilterAuthor={setFilterAuthor}
              authors={authors}
              filterAuthor={filterAuthor}
              searchAuthor={searchAuthor}
              setBooks={setBooks}
              books={books}
            />

            <FlatList
              showsVerticalScrollIndicator={false}
              data={books}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <Book book={item} setMoreBook={setFilterAuthor}/>}              
            />
          </>
        )}
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default Books;
