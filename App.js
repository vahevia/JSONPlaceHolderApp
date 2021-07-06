/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PostsScreen from './src/screens/Posts';
import PostDetailScreen from './src/screens/PostDetail';
import { store } from './src/redux/store';
import { Provider } from 'react-redux'

export default App = () => {

  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Posts" component={PostsScreen} />
          <Stack.Screen name="Post" component={PostDetailScreen} options={() => ({headerBackTitleVisible: false})}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};