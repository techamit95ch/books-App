import React, { useState, useEffect } from "react";
import {  NativeBaseProvider, FlatList } from "native-base";
import Book from "../../components/ListViews/Book";
import FilterAuthor from "../../components/ListViews/FiterAuth";
import { LogBox } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import UseBooks from "../../hooks/useBooks";  
const Books = ({ navigation }) => {
  // const books = useSelector((state: any) => state.books.books);
  const [searchAuthor, results, error,authors] = UseBooks();
  const [filterAuthor, setFilterAuthor]= useState("All");
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    LogBox.ignoreLogs(["Setting a timer for a long period of time"]);
    searchAuthor(filterAuthor);
}, [results,filterAuthor])
  // console.log(authors);
  return (
    <NativeBaseProvider>
      {/* <HeaderBar navigation={navigation} add={'Add Book'} back='' BackButton={(<></>)}/> */}
      <SafeAreaView  style={{ backgroundColor: "white" }}>
        <FilterAuthor setFilterAuthor={setFilterAuthor} authors={authors} filterAuthor={filterAuthor} searchAuthor={searchAuthor}/>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={results}
          keyExtractor={(item, index) => item.id}
          renderItem={({item}) => <Book book={item} />}
        />
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default Books;
