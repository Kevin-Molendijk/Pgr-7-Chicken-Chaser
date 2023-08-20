//imports voor de dependencies
import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import {ThemeContext} from "./ThemeContext";

//hier zet hij het component voor de map op
const LocationScreen = ({route}) => {
    const {locations, selectedLocation} = route.params;
    const { isDarkMode } = useContext(ThemeContext);
    const [userLocation, setUserLocation] = useState(null);
    const [selectedMarker, setSelectedMarker] = useState(null);

    //selecteerd de initiele regio
    const initialRegion = {
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
    };

    //haalt de locatie van de gebruiker op
    useEffect(() => {
        getLocation();
    }, []);

    //functie om de gebruikers locatie te gebruiken
    const getLocation = async () => {
        try {
            const {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            setUserLocation(location.coords);
        } catch (error) {
            console.log('Error while retrieving location', error);
        }
    };

    //component om de informatie van de markers te displayen op de map
    const MarkerInfoBox = ({marker, onClose}) => {
        return (
            <View style={styles.markerInfoBox}>
                <Text style={styles.markerInfoBoxTitle}>{marker.title}</Text>
                <Text style={styles.markerInfoBoxDescription}>{marker.description}</Text>
                <TouchableOpacity style={styles.markerInfoBoxCloseButton} onPress={onClose}>
                    <Text style={styles.markerInfoBoxCloseButtonText}>Close</Text>
                </TouchableOpacity>
            </View>
        );
    };

    //toont de map en markers in de app
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={initialRegion}
                customMapStyle={isDarkMode ? darkMapStyle : lightMapStyle}
            >
                {locations.map((location) => (
                    <Marker
                        key={location.id}
                        coordinate={{latitude: location.latitude, longitude: location.longitude}}
                        title={location.name}
                        onPress={() => setSelectedMarker(location)}
                    />
                ))}

                {userLocation && (
                    <Marker
                        coordinate={{
                            latitude: userLocation.latitude,
                            longitude: userLocation.longitude,
                        }}
                        title="Your Location"
                        pinColor="blue"
                    />
                )}
            </MapView>

            {selectedMarker && (
                <MarkerInfoBox marker={selectedMarker} onClose={() => setSelectedMarker(null)}/>
            )}
        </View>
    )
}

//begin van de stylesheet
const styles = StyleSheet.create({
    //map
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },

    //marker box
    markerInfoBox: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    markerInfoBoxTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,

    },
    markerInfoBoxDescription: {
        fontSize: 14,
        marginBottom: 10,
    },
    markerInfoBoxCloseButton: {
        alignSelf: 'flex-end',
    },
    markerInfoBoxCloseButtonText: {
        color: 'blue',
    },
});

//nieuwe sheet voor darkmode
const darkMapStyle = [
    { elementType: 'geometry', stylers: [{ color: '#212121' }] },
    { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#757575' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#212121' }] },
    { featureType: 'administrative', elementType: 'geometry', stylers: [{ color: '#757575' }] },
    { featureType: 'administrative.country', elementType: 'labels.text.fill', stylers: [{ color: '#9e9e9e' }] },
    { featureType: 'administrative.land_parcel', stylers: [{ visibility: 'off' }] },
    { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#bdbdbd' }] },
    { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#757575' }] },
    { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#181818' }] },
    { featureType: 'poi.park', elementType: 'labels.text.fill', stylers: [{ color: '#616161' }] },
    { featureType: 'poi.park', elementType: 'labels.text.stroke', stylers: [{ color: '#1b1b1b' }] },
    { featureType: 'road', elementType: 'geometry.fill', stylers: [{ color: '#2c2c2c' }] },
    { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#8a8a8a' }] },
    { featureType: 'road.arterial', elementType: 'geometry', stylers: [{ color: '#373737' }] },
    { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#3c3c3c' }] },
    { featureType: 'road.highway.controlled_access', elementType: 'geometry', stylers: [{ color: '#4e4e4e' }] },
    { featureType: 'road.local', elementType: 'labels.text.fill', stylers: [{ color: '#616161' }] },
    { featureType: 'transit', elementType: 'labels.text.fill', stylers: [{ color: '#757575' }] },
    { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#000000' }] },
    { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#3d3d3d' }] },
];

//sheet voor lightmode
const lightMapStyle = [];


export default LocationScreen;
