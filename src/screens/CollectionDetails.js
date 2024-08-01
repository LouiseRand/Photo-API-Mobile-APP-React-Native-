import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { unsplash } from '../config/global';

export default function CollectionDetailsScreen({ route, navigation }) {
    const { collectionId } = route.params;
    const [collectionPhotos, setCollectionPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCollectionPhotos = () => {
        setLoading(true);
        fetch(`https://api.unsplash.com/collections/${collectionId}/photos?client_id=${unsplash.unsplashAccessKey}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then((json) => {
                setCollectionPhotos(json);
                setLoading(false);
                setError(null);
            })
            .catch((error) => {
                console.error('Error fetching collection photos:', error);
                setError('Failed to load collection photos.');
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchCollectionPhotos();
    }, [collectionId]);

    return (
        <View style={styles.collectionDetailsScreen}>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#000" />
                </View>
            ) : error ? (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            ) : (
                <FlatList
                    data={collectionPhotos}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.resultImageTouchable}
                            onPress={() => {
                                navigation.navigate('PhotoDetails', {
                                    photoId: item.id,
                                });
                            }}
                        >
                            <Image
                                style={styles.collectionPhoto}
                                source={{ uri: item.urls.regular }}
                            />
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    style={{ marginBottom: 100 }}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    collectionDetailsScreen: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        padding: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
    },
    resultImageTouchable: {
        flex: 1,
        margin: 10,
    },
    collectionPhoto: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
});

