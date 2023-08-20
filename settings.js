//imports voor de dependencies
import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from './ThemeContext';

const Settings = () => {
    //maakt het thema aan
    const themeContext = useContext(ThemeContext);

    //functie om het thema om te wisselen
    const toggleTheme = () => {
        themeContext.toggleDarkMode();
    };

    //view voor de app
    return (
        <View style={[styles.container, themeContext.isDarkMode && styles.darkModeContainer]}>
            <TouchableOpacity style={styles.button} onPress={toggleTheme}>
                <Text style={styles.buttonText}>
                    {themeContext.isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

//stylesheet
const styles = StyleSheet.create({
    //view
    container: {
        flex: 1,
        backgroundColor: '#fff', // Light mode background color
    },
    darkModeContainer: {
        backgroundColor: '#333', // Dark mode background color
    },
    //button
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
});

export default Settings;