//imports voor de dependencies
import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from './ThemeContext';
import { fetchLocations, updateFavoriteStatus } from './api';


const ListScreen = ({ navigation }) => {
    //zet de darkmode aan/uit
    const themeContext = useContext(ThemeContext);
    const toggleTheme = () => {
        themeContext.toggleDarkMode();
    };

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    //haalt de locaties en favorite status op
    const getKfc = async () => {
        try {
            const items = await fetchLocations();

            const storedData = await AsyncStorage.getItem('favorites');
            const favorites = storedData ? JSON.parse(storedData) : [];

            const updatedData = items.map((item) => ({
                ...item,
                isFavorite: favorites.some((favorite) => favorite.id === item.id),
            }));

            setData(updatedData);
        } catch (error) {
            //error in geval van nood
            console.error(error);
        } finally {
            //update de laad status
            setLoading(false);
        }
    };

    //toggled de favorite status
    const toggleFavorite = async (item) => {
        try {
            await updateFavoriteStatus(item.id, !item.isFavorite);


            //update de data met de nieuwe favorite status
            const updatedData = data.map((location) => {
                if (location.id === item.id) {
                    return {
                        ...location,
                        isFavorite: !location.isFavorite,
                    };
                }
                return location;
            });

            setData(updatedData);
        } catch (error) {
            //error in geval van nood
            console.error(error);
        }
    };

    //activeert de fetch functie zodra dit component inlaad
    useEffect(() => {
        getKfc();
    }, []);

    const Header = () => {
        return (
            <View style={styles.header}>
                <Image source={require('./Kfc_logo.png')} style={styles.logo} />
            </View>
        );
    };

    //functie om te navigeren naar de locatie 
    const navigateToLocation = (locations, selectedLocation) => {
        navigation.navigate('Location', { locations, selectedLocation });
    };

    //functie om te navigeren naar de settings
    const navigateToSettings = () => {
        navigation.navigate('Settings');
    };

    //hier wordt de view ingeladen.
    return (
        <View style={[styles.container, themeContext.isDarkMode && styles.darkModeContainer]}>
            <Header/>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <FlatList
                    style={styles.list}
                    data={data}
                    keyExtractor={({ id }) => id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => navigateToLocation(data, item)} style={styles.itemContainer}>
                            <Text style={styles.item}>{item.title}</Text>
                            <TouchableOpacity onPress={() => toggleFavorite(item)}>
                                <Image
                                    source={item.isFavorite ? require('./bookmark.png') : require('./favorite.png')}
                                    style={styles.favoriteIcon}
                                />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    )}
                />
            )}
            <TouchableOpacity style={styles.button} onPress={navigateToSettings}>
                <Text style={styles.buttonText}> Settings </Text>
            </TouchableOpacity>
        </View>
    );
};

//Begin van de stylesheet
const styles = StyleSheet.create({
    //dark mode
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    darkModeContainer: {
        backgroundColor: '#333',
    },

    //lijst
    button: {
        margin: 20,
        padding: 10,
        backgroundColor: '#6495ED',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    item: {
        flex: 1,
        fontSize: 18,
        height: 44,
    },
    favoriteIcon: {
        width: 24,
        height: 24,
    },
    list: {
        flex: 1,
    },

    //header
    header: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    logo: {
        width: 100,
        height: 100,
    },
});

export default ListScreen;