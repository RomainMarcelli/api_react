import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import { shuffle } from 'lodash';
import { useNavigation } from '@react-navigation/native'; // Pour naviguer vers l'accueil
import tw from 'twrnc';

const Game = ({ route }) => {
  const navigation = useNavigation(); // Pour la navigation vers l'accueil
  const { difficulty, category} = route.params || {};
  const { correctAnswers: initialCorrectAnswers = 0, currentQuestionIndex: initialQuestionIndex = 0 } =
    route.params || {}; // Obtenir les scores initiaux

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(initialQuestionIndex);
  const [correctAnswers, setCorrectAnswers] = useState(initialCorrectAnswers);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  const fetchQuestions = async () => {
    // Charger les questions
    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=10&type=multiple&difficulty=${difficulty}&category=${category}`
      );
      const data = await response.json();
      setQuestions(data.results || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchQuestions(); // Charger les questions lors du montage
  }, []);

  const handleAnswer = (answer) => {
    const isCorrect = answer === currentQuestion.correct_answer;
    setSelectedAnswer(answer); // Stocker la réponse sélectionnée

    if (isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
      setShowCorrectAnswer(false);
    } else {
      setShowCorrectAnswer(true);
    }

    setTimeout(() => {
      setSelectedAnswer(null);
      setShowCorrectAnswer(false);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1); // Passer à la question suivante
      } else {
        alert(`Jeu terminé! Vous avez eu ${correctAnswers} bonnes réponses sur ${questions.length}.`);
      }
    }, 1000); // Délai d'une seconde avant de passer à la question suivante
  };

  if (questions.length === 0) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text>Chargement des questions...</Text>
      </View>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  if (!currentQuestion) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text>Aucune question disponible.</Text>
      </View>
    );
  }

  return (
    <View style={tw`flex-1 justify-start items-center p-5`}>
      <Button
        title="Retour à l'accueil"
        onPress={() =>
          navigation.navigate('Home', {
            correctAnswers,
            currentQuestionIndex,
          })
        }
      />

      <Text style={tw`text-lg mb-5`}>
        Questions répondues : {currentQuestionIndex + 1}/{questions.length}, Bonnes réponses : {correctAnswers}
      </Text>
      
      <Text style={tw`text-lg mb-5`}>{currentQuestion.question}</Text>

      {allAnswers.map((answer, index) => {
        const isCorrect = answer === currentQuestion.correct_answer;
        const isSelected = answer === selectedAnswer;

        const answerStyle = isSelected 
          ? (isCorrect ? tw`bg-green-500 p-2 my-2 w-full text-center` : tw`bg-red-500 p-2 my-2 w-full text-center`)
          : tw`bg-gray-200 p-2 my-2 w-full text-center`;

        return (
          <TouchableOpacity key={index} onPress={() => handleAnswer(answer)}> 
            <Text style={answerStyle}>{answer}</Text> 
          </TouchableOpacity>
        );
      })}

      {showCorrectAnswer && (
        <Text style={tw`text-red-600 mt-5`}>La bonne réponse était : {currentQuestion.correct_answer}</Text>
      )}
    </View>
  );
};

export default Game;
