import React from 'react';
import { StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';

import PhotosScreen from '../screens/Photos';
import PhotoDetailsScreen from '../screens/PhotoDetails';

const Stack = createStackNavigator();

export default function PhotosNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Photos" 
                component={PhotosScreen} 
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
                name="Photo Details" 
                component={PhotoDetailsScreen} 
       
            />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    headerMenuButton: {
        marginLeft: 10,  // Adjust the margin as needed
    },
});
