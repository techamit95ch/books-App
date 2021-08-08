import React, { useState, useEffect } from "react";
import {  NativeBaseProvider, FlatList } from "native-base";
import {  useSelector } from "react-redux";
import Book from "../../components/ListViews/Book";
import { LogBox } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const Books = ({ navigation }) => {
  const books = useSelector((state: any) => state.books.books);

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    LogBox.ignoreLogs(["Setting a timer for a long period of time"]);
}, [books])
  // console.log(books.books);
  return (
    <NativeBaseProvider>
      {/* <HeaderBar navigation={navigation} add={'Add Book'} back='' BackButton={(<></>)}/> */}
      <SafeAreaView  style={{ backgroundColor: "white" }}>

        <FlatList
          // horizontal
          // showsHorizontalScrollIndicator={false}

          showsVerticalScrollIndicator={false}
          data={books}
          keyExtractor={(book) => book.id}
          renderItem={({item}) => <Book book={item} />}
        />
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default Books;
