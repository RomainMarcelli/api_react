import React from 'react';
import { View, Text, Button } from 'react-native';
import tw from 'twrnc';


// Composant d'accueil avec des options pour continuer ou recommencer
const HomeScreen = ({ navigation, route }) => {
  const { correctAnswers = 0, currentQuestionIndex = 0 } = route.params || {};

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <Text style={tw`text-3xl`}>Accueil</Text>

      <View style={tw`mb-3`}> 
        <Button
          title="Continuer la partie"
          onPress={() =>
            navigation.navigate('Game', {
              correctAnswers,
              currentQuestionIndex,
            })
          }
        />
      </View>

      <Button
        title="Recommencer la partie"
        onPress={() => navigation.navigate('SignUp')} // Diriger vers SignUp
      />
    </View>
  );
};

export default HomeScreen;
