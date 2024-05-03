import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Importer les icônes
import HomeScreen from './components/HomeScreen';
import SignUp from './components/signup';
import Game from './components/Game';
import tw from 'twrnc';

// Déclaration des navigateurs
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Composant de navigation par onglets
const TabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        title: 'Accueil',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home-outline" color={color} size={size} /> // Icône de maison
        ),
      }}
    />
    <Tab.Screen
      name="Game"
      component={Game}
      options={{
        title: 'Jeu',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="gamepad" color={color} size={size} /> // Icône de jeu
        ),
      }}
    />
  </Tab.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignUp">
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ title: 'Inscription' }}
        />
        <Stack.Screen
          name="Tabs"
          component={TabNavigator} // Utilisation du `Tab.Navigator` avec icônes
          options={{ headerShown: false }} // Masquer l'en-tête
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Composant de l'écran d'inscription
const SignUpScreen = ({ navigation }) => {
  const startGame = ({ name, difficulty, category }) => {
    navigation.navigate('Tabs', { // Naviguer vers le Tab Navigator
      screen: 'Game',
      params: { difficulty, category },
    });
  };

  return <SignUp onStartGame={startGame} />;
};

export default App;
