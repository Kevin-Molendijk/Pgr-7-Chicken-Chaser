//imports voor dependencies
import AsyncStorage from '@react-native-async-storage/async-storage';

//haalt de api link op
const API_URL = 'https://stud.hosted.hr.nl/1029011/locations.json';

//creert functie om de locaties van de api op te halen
export const fetchLocations = async () => {
    try {

        //zet het Json bestand over naar een array
        const response = await fetch(API_URL);
        const json = await response.json();
        return json.items;
    } catch (error) {
        //error in geval van nood
        console.error(error);
        return [];
    }
};

//functie om de de favorite status te updaten.
export const updateFavoriteStatus = async (itemId, isFavorite) => {
    try {
        //haalt de favorite status op
        const storedData = await AsyncStorage.getItem('favorites');
        let favorites = storedData ? JSON.parse(storedData) : [];

        //updates de favorite status
        const index = favorites.findIndex((favorite) => favorite.id === itemId);
        if (index !== -1) {
            favorites[index].isFavorite = isFavorite;
        } else {
            favorites.push({ id: itemId, isFavorite });
        }

        //slaat de favorite status op in de local storage
        await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
        //error in geval van nood
        console.error(error);
    }
};