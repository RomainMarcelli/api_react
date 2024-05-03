import React from 'react';
import { View, Text, Button } from 'react-native';

// Le composant d'accueil avec des options pour continuer ou recommencer
const HomeScreen = ({ navigation, route }) => {
  const { correctAnswers = 0, currentQuestionIndex = 0 } = route.params || {};

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <Text>Accueil</Text>
      <Button
        title="Continuer la partie"
        onPress={() =>
          navigation.navigate('Game', {
            correctAnswers,
            currentQuestionIndex,
          })
        }
      />
      <Button
        title="Recommencer la partie"
        onPress={() =>
          navigation.navigate('Game', {
            correctAnswers: 0,
            currentQuestionIndex: 0,
          })
        }
      />
    </View>
  );
};

export default HomeScreen;
