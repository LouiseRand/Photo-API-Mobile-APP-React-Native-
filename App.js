import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeNavigator from './src/navigators/Home';
import PhotosNavigator from './src/navigators/Photos';
import CollectionsNavigator from './src/navigators/Collections';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator screenOptions={{ headerShown: false }}>
        <Drawer.Screen name="Home" component={HomeNavigator} options={{ title: 'Photo Lens' }} />
        <Drawer.Screen name="Photos" component={PhotosNavigator} options={{ title: 'Photos' }} />
        <Drawer.Screen name="Collections" component={CollectionsNavigator} options={{ title: 'Photo Collections' }} />
      </Drawer.Navigator>
      <StatusBar style="auto" hidden={true} />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    // Styles if needed
  },
});
