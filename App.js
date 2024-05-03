import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen';
import SignUp from './components/signup';
import Game from './components/Game';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer> 
      <Stack.Navigator initialRouteName="SignUp">
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Inscription' }} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Game" component={Game} options={{ title: 'Jeu' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const SignUpScreen = ({ navigation }) => {
  const startGame = ({ name, difficulty, category }) => {
    navigation.navigate('Game', { difficulty, category });
  };

  return <SignUp onStartGame={startGame} />;
};

// const GameScreen = ({ route }) => {
//   const { difficulty, category } = route.params; // Récupérer les paramètres passés du SignUp

//   return <Game difficulty={difficulty} category={category} />; // Utilisation du composant Game
// };


export default App;



