import React from 'react';
import { StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/Home';

const Stack = createStackNavigator();

export default function HomeNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Home" 
                component={HomeScreen}
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
        marginLeft: 10,  // Adjust the margin as needed
    },
});