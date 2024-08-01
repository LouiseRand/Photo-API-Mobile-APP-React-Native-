import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => navigation.navigate('Photos')}
                    accessible={true}
                    accessibilityLabel="Browse Photos"
                    accessibilityHint="Navigate to the Photos screen"
                >
                    <Text style={styles.buttonText}>Browse Photos</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => navigation.navigate('Collections')}
                    accessible={true}
                    accessibilityLabel="Browse Collections"
                    accessibilityHint="Navigate to the Collections screen"
                >
                    <Text style={styles.buttonText}>Browse Collections</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.welcomeContainer}>
                <Text style={styles.welcomeTitle}>Welcome to Photo-Lense!</Text>
                <Text style={styles.welcomeText}>Explore and enjoy stunning images. Search for images or categories by pressing the buttons above.</Text>
            </View>

            <Image
                style={styles.welcomeImage}
                source={{ uri: 'https://images.unsplash.com/photo-1516117172878-fd2c41f4a759' }}
                accessible={true}
                accessibilityLabel="Welcome image"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f8f8f8',
        paddingTop: 50,
    },
    buttonContainer: {
        width: '100%',
        padding: 20,
        alignItems: 'center',
        marginBottom: 20,
    },
    welcomeContainer: {
        width: '100%',
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 5,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    welcomeTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 10,
    },
    welcomeText: {
        fontSize: 16,
        color: '#666666',
        textAlign: 'center',
    },
    welcomeImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginTop: 20,
    },
});



