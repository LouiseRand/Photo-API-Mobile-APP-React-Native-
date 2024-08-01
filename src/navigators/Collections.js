import React from 'react';
import { StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';

import CollectionsScreen from '../screens/Collections';
import CollectionDetailsScreen from '../screens/CollectionDetails';
import PhotoDetailsScreen from '../screens/PhotoDetails';

const Stack = createStackNavigator();

export default function CollectionsNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Collections" 
                component={CollectionsScreen} 
                options={({ navigation }) => ({
                    title: "Photo Lense",
                    headerLeft: (props) => (
                        <Feather 
                            style={styles.headerMenuButton} 
                            name="menu" 
                            size={24} 
                            color="black" 
                            onPress={() => navigation.toggleDrawer()} 
                        />
                    ),
                })}
            />
            <Stack.Screen 
                name="CollectionDetails" 
                component={CollectionDetailsScreen}
                options={({ navigation }) => ({
                    title: "Photo Lense",
                    headerLeft: (props) => (
                        <Feather 
                            style={styles.headerMenuButton} 
                            name="menu" 
                            size={24} 
                            color="black" 
                            onPress={() => navigation.toggleDrawer()} 
                        />
                    ),
                })}
            />
            <Stack.Screen 
                name="PhotoDetails" 
                component={PhotoDetailsScreen}
                options={({ navigation }) => ({
                    title: "Photo Lense",
                    headerLeft: (props) => (
                        <Feather 
                            style={styles.headerMenuButton} 
                            name="menu" 
                            size={24} 
                            color="black" 
                            onPress={() => navigation.toggleDrawer()} 
                        />
                    ),
                })}
            />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    headerMenuButton: {
        marginLeft: 10,
    },
});
