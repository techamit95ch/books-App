import React, { useState, useEffect } from 'react';
import { NativeBaseProvider, Center, Spinner, ScrollView } from 'native-base';
import Book from '../../components/ListViews/Book';
import FilterAuthor from '../../components/ListViews/FiterAuth';
import { LogBox, FlatList } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

const Books = ({ navigation }) => {
  const authors = useSelector((state: any) => state.authors);
  let allbooks = useSelector((state: any) => state.books);
  const user = useSelector((state: any) => state.user);
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(0);
  const [isFilter, setFilter] = useState(false);
  const [viewBooks, setViewBooks] = useState([]);
  const [firstTime, setFirstTime] = useState(true);
  console.log('user', user);
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

    if (author === '' && rating === 0) {
      setViewBooks(allbooks);
      // setFirstTime(false);
    }
  }, [author, rating]);
  // console.log(author, rating);
  console.log('viewBooks books', allbooks.length, author, rating);
  return (
    <NativeBaseProvider>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView style={{ backgroundColor: 'white' }}>
            {!allbooks.length ? (
              <NativeBaseProvider>
                <Center
                  flex={1}
                  style={{
                    justifyContent: 'center',
                    marginTop: 40,
                    backgroundColor: 'white',
                  }}
                >
                  <Spinner color="green.500" size="lg" />
                </Center>
              </NativeBaseProvider>
            ) : (
              <>
                <FilterAuthor
                  setFilterAuthor={setAuthor}
                  filterAuthor={author}
                  setViewBooks={setViewBooks}
                  allbooks={allbooks}
                  viewBooks={viewBooks}
                  setRating={setRating}
                />
                <>
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={false}
                    data={viewBooks}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                      <Book
                        book={item}
                        setAuthor={setAuthor}
                        viewBooks={viewBooks}
                        setViewBooks={setViewBooks}
                        user={user}
                      />
                    )}
                  />
                </>
              </>
            )}
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
};

export default Books;
