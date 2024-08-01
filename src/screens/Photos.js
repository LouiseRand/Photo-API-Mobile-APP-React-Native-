import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, TextInput, TouchableOpacity, View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import debounce from 'lodash.debounce';
import { unsplash } from '../config/global';

export default function PhotosScreen({ navigation }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const fetchPhotos = useCallback((query, pageNum = 1) => {
        setLoading(pageNum === 1); // Only set loading state for the first page
        const url = query
            ? `https://api.unsplash.com/search/photos?client_id=${unsplash.unsplashAccessKey}&query=${query}&page=${pageNum}`
            : `https://api.unsplash.com/photos?client_id=${unsplash.unsplashAccessKey}&per_page=30&page=${pageNum}`;

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then((json) => {
                setPhotos((prevPhotos) => pageNum === 1 ? (query ? json.results : json) : [...prevPhotos, ...(query ? json.results : json)]);
                setLoading(false);
                setIsRefreshing(false);
                setError(null);
            })
            .catch((error) => {
                console.error('Error fetching photos:', error);
                setError('Failed to load photos.');
                setLoading(false);
                setIsRefreshing(false);
            });
    }, []);

    useEffect(() => {
        fetchPhotos(searchQuery, page);
    }, [fetchPhotos, searchQuery, page]);

    const debouncedFetchPhotos = useCallback(debounce(fetchPhotos, 500), [fetchPhotos]);

    const handleSearchChange = (text) => {
        setSearchQuery(text);
        setPage(1);  // Reset page on new search
        debouncedFetchPhotos(text, 1);
    };

    const handleLoadMore = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const handleRefresh = () => {
        setIsRefreshing(true);
        setPage(1);
        fetchPhotos(searchQuery, 1);
    };

    return (
        <View style={styles.photosScreen}>
            <View style={styles.searchForm}>
                <Ionicons name="search" size={20} color="#cccccc" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search for photos..."
                    value={searchQuery}
                    onChangeText={handleSearchChange}
                    onSubmitEditing={() => fetchPhotos(searchQuery, 1)}
                    returnKeyType="search"
                />
            </View>

            {loading && page === 1 ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#000" />
                </View>
            ) : error ? (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            ) : (
                <View style={styles.resultsContainer}>
                    <FlatList
                        data={photos}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.resultImageTouchable}
                                onPress={() => {
                                    navigation.navigate('Photo Details', {
                                        photoId: item.id,
                                    });
                                }}
                            >
                                <Image
                                    style={styles.resultImage}
                                    source={{ uri: item.urls.regular }}
                                />
                            </TouchableOpacity>
                        )}
                        numColumns={2}
                        keyExtractor={(item) => item.id.toString()}
                        onEndReached={handleLoadMore}
                        onEndReachedThreshold={0.5}
                        refreshing={isRefreshing}
                        onRefresh={handleRefresh}
                        style={{ marginBottom: 100 }}
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    photosScreen: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        padding: 20,
    },
    searchForm: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 10,
        borderColor: '#cccccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        height: 40,
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
    resultsContainer: {
        flex: 1,
        marginTop: 10,
    },
    resultImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    resultImageTouchable: {
        flex: 1,
        margin: 10,
    },
});
