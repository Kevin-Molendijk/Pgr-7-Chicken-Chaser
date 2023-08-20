//imports voor dependencies/paginas
import React, { useContext } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListScreen from './listScreen';
import LocationScreen from './locationScreen';
import { ThemeProvider, ThemeContext } from './ThemeContext';
import Settings from "./settings";

//zet de navigatie op
const Stack = createStackNavigator();

//creëert main app
const MainApp = () => {
    return (
        //regelt de dark mode
        <ThemeProvider>
            <ThemeContext.Consumer>
                {({ isDarkMode }) => (
                    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
                        {/*laat de navigatie zien in de app*/}
                        <Stack.Navigator>
                            <Stack.Screen name="Chicken Chaser" component={ListScreen} />
                            <Stack.Screen name="Location" component={LocationScreen} />
                            <Stack.Screen name="Settings" component={Settings} />
                        </Stack.Navigator>
                    </NavigationContainer>
                )}
            </ThemeContext.Consumer>
        </ThemeProvider>
    );
};

export default MainApp;