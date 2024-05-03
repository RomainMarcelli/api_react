import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Button, Alert } from 'react-native';
import { shuffle } from 'lodash';
import { useNavigation } from '@react-navigation/native';
import he from 'he';
import tw from 'twrnc';

const Game = ({ route }) => {
  const navigation = useNavigation();

  const { difficulty = 'easy', category = 9, correctAnswers = 0, currentQuestionIndex = 0 } = route.params || {};

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(currentQuestionIndex);
  const [correct, setCorrect] = useState(correctAnswers);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  const fetchQuestions = async () => {
    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=10&type=multiple&difficulty=${difficulty}&category=${category}`
      );
      const data = await response.json();
      // Décoder les questions
      const decodedQuestions = data.results.map((question) => ({
        ...question,
        question: he.decode(question.question), // Décoder la question
        correct_answer: he.decode(question.correct_answer), // Décoder la bonne réponse
        incorrect_answers: question.incorrect_answers.map((answer) => he.decode(answer)), // Décoder les réponses incorrectes
      }));
      setQuestions(decodedQuestions);
    } catch (error) {
      console.error("Erreur lors de la récupération des questions:", error);
      Alert.alert("Erreur", "Impossible de charger les questions.");
    }
  };

  useEffect(() => {
    fetchQuestions(); // Charger les questions au début
  }, [difficulty, category]);

  const currentQuestion = questions[currentIndex % questions.length]; // Index modulo pour éviter les erreurs

  const handleAnswer = (answer) => {
    const isCorrect = answer === currentQuestion.correct_answer;
    setSelectedAnswer(answer);

    if (isCorrect) {
      setCorrect(correct + 1);
      setShowCorrectAnswer(false);
    } else {
      setShowCorrectAnswer(true);
    }

    setTimeout(() => {
      setSelectedAnswer(null);
      setShowCorrectAnswer(false);

      if (currentIndex >= questions.length - 1) {
        fetchQuestions(); // Recharger plus de questions si nécessaire
      }

      setCurrentIndex(currentIndex + 1); // Incrémenter le compteur
    }, 1000);
  };

  if (questions.length === 0) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text>Chargement des questions...</Text>
      </View>
    );
  }

  const allAnswers = shuffle([
    ...currentQuestion.incorrect_answers,
    currentQuestion.correct_answer,
  ]);

  return (
    <View style={tw`flex-1 justify-start items-center p-5`}>

      <Text style={tw`text-lg mb-5`}>Question {currentIndex + 1}</Text>

      <Text style={tw`text-lg mb-5`}>
        Bonnes réponses : {correct}
      </Text>

      <Text style={tw`text-lg mb-5`}>{currentQuestion.question}</Text>

      {allAnswers.map((answer, index) => {
        const isCorrect = answer === currentQuestion.correct_answer;
        const isSelected = answer === selectedAnswer;

        const answerStyle = isSelected
          ? (isCorrect ? tw`bg-green-500 p-2 my-2 w-full text-center mb-3` : tw`bg-red-500 p-2 my-2 w-full text-center`)
          : tw`bg-gray-200 p-2 my-2 w-full text-center`;

        return (
          <TouchableOpacity key={index} onPress={() => handleAnswer(answer)}>
            <Text style={answerStyle}>{answer}</Text>
          </TouchableOpacity>
        );
      })}

      {showCorrectAnswer && (
        <Text style={tw`text-red-600 mt-5 mb-3`}>La bonne réponse était : {currentQuestion.correct_answer}</Text>
      )}

      <Button
        title="Retour à l'accueil"
        onPress={() => navigation.navigate('Home', { correct, currentIndex })}
      />
    </View>
  );
};

export default Game;
