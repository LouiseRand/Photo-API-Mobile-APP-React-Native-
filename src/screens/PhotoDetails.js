import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View, Linking, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { unsplash } from '../config/global';

export default function PhotoDetailsScreen({ route, navigation }) {
    const { photoId } = route.params;
    const [photoData, setPhotoData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getPhotoData = () => {
        setLoading(true);
        fetch(`https://api.unsplash.com/photos/${photoId}?client_id=${unsplash.unsplashAccessKey}`)
            .then((response) => {
                if (!response.ok) {
                    console.error('Network response was not ok', response.status, response.statusText);
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then((json) => {
                setPhotoData(json);
                setLoading(false);
                setError(null);
            })
            .catch((error) => {
                console.error('Error fetching photo details:', error);
                setError('Failed to load photo details.');
                setLoading(false);
            });
    };

    useEffect(() => {
        getPhotoData();
    }, [photoId]);

    const handleViewPhoto = () => {
        if (photoData && photoData.links && photoData.links.html) {
            Linking.openURL(photoData.links.html);
        }
    };

    const handleDownloadPhoto = () => {
        if (photoData && photoData.links && photoData.links.download) {
            Linking.openURL(photoData.links.download);
        }
    };

    return (
        <View style={styles.photoDetailsScreen}>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#000" />
                </View>
            ) : error ? (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            ) : (
                <View style={styles.detailsContainer}>
                    {photoData && (
                        <>
                            <Image
                                style={styles.photoImage}
                                source={{ uri: photoData.urls.regular }}
                            />
                            <View style={styles.metaDataContainer}>
                                <Text style={styles.metaDataText}>
                                    <Text style={{ fontWeight: 'bold' }}>Photographer:</Text> {photoData.user.first_name} {photoData.user.last_name}
                                </Text>
                                <Text style={styles.metaDataText}>
                                    <Text style={{ fontWeight: 'bold' }}>Location:</Text> {photoData.location?.title || 'Unknown'}
                                </Text>
                                <Text style={styles.metaDataText}>
                                    <Text style={{ fontWeight: 'bold' }}>Num of views:</Text> {photoData.views}
                                </Text>
                                <Text style={styles.metaDataText}>
                                    <Text style={{ fontWeight: 'bold' }}>Num of downloads:</Text> {photoData.downloads}
                                </Text>
                                <TouchableOpacity style={styles.button} onPress={handleViewPhoto}>
                                    <Text style={styles.buttonText}>View Photo</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={handleDownloadPhoto}>
                                    <Text style={styles.buttonText}>Download Photo</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    photoDetailsScreen: {
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
    detailsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    photoImage: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    metaDataContainer: {
        margin: 20,
    },
    metaDataText: {
        fontSize: 17,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
