import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, Image, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import tw from 'twrnc';

const SignUp = ({ onStartGame }) => {
  const [name, setName] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://opentdb.com/api_category.php');
      const data = await response.json();
      setCategories(data.trivia_categories || []);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories:", error);
      Alert.alert("Erreur", "Impossible de charger les catégories. Veuillez réessayer.");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const difficulties = [
    { label: 'Tous', value: '' },
    { label: 'Facile', value: 'easy' },
    { label: 'Moyen', value: 'medium' },
    { label: 'Difficile', value: 'hard' },
  ];

  const isFormComplete = name && difficulty && category;

  return (
    <View style={tw`flex-1 justify-center items-center bg-gray-100 px-5`}>
      {/* Ajouter une image au-dessus du titre */}
      <Image
        source={require('../img/logo.png')} // Changez avec votre image
        style={tw`w-3/4 h-40 rounded-full mb-7`} // Style de l'image
      />

      {/* <Text style={tw`text-4xl font-bold uppercase text-blue-600 mb-7`}>Quizzenture</Text> */}
      
      <Text style={tw`text-2xl text-blue-600 mb-4 uppercase`}>Inscription</Text>

      <TextInput
        style={tw`h-10 border border-gray-400 w-3/4 px-3 rounded-lg mb-4`}
        placeholder="Entrez votre prénom"
        onChangeText={setName}
        value={name}
      />

      <Picker
        selectedValue={difficulty}
        style={tw`w-3/4 mb-4 bg-white rounded-lg`}
        onValueChange={(value) => setDifficulty(value)}
      >
        {difficulties.map((option) => (
          <Picker.Item key={option.value} label={option.label} value={option.value} />
        ))}
      </Picker>  
      
      {loading ? (
        <ActivityIndicator size="large" color="#00ff00" /> 
      ) : (
        <Picker
          selectedValue={category}
          style={tw`w-3/4 mb-4 bg-white rounded-lg`}
          onValueChange={(value) => setCategory(value)}
        >
          {categories.map((cat) => (
            <Picker.Item key={cat.id} label={cat.name} value={cat.id} />
          ))}
        </Picker>
      )}

      {isFormComplete && (
        <Button
          title="Commencer la partie"
          onPress={() => onStartGame({ name, difficulty, category })} 
          color="#1e90ff"
        />
      )}
    </View>
  );
};

export default SignUp;
