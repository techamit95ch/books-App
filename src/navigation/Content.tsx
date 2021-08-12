import React, { useState, useEffect } from 'react';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import BookScreen from '../screens/Book/Books';
import AddBookScreen from '../screens/Book/AddBook';
import * as SecureStore from 'expo-secure-store';
import { useDispatch, useSelector } from 'react-redux';

export default function ContentNav({ navigation }) {
  const Stack = createDrawerNavigator();

  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {}, [dispatch, user]);
  // console.log(user);
  return (
    <>
      <NavigationContainer independent={true}>
        <Stack.Navigator
          initialRouteName={'Books'}
          drawerContent={(props) => (
            <DrawerContentScrollView {...props}>
              <DrawerItemList {...props} />

              {/* <DrawerItem
                label="Log Out"
                onPress={() =>
                  props.navigation.dispatch(DrawerActions.closeDrawer())
                }
              /> */}
            </DrawerContentScrollView>
          )}
        >
          <Stack.Screen
            name="Books"
            component={BookScreen}
            options={{
              headerTitle: 'Books App',
              headerStyle: {
                backgroundColor: 'white',
              },
              headerTintColor: '#005EB8',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="Add"
            component={AddBookScreen}
            options={{
              headerTitle: 'Books App',
              headerStyle: {
                backgroundColor: 'white',
              },
              headerTintColor: '#005EB8',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
