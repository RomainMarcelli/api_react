import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, Alert } from 'react-native';
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
      console.log(2)
      const response = await fetch('https://opentdb.com/api_category.php');
      console.log(3)
      const data = await response.json(); console.log(data)
      setCategories(data.trivia_categories || []); // Assurez-vous que les données sont définies
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      Alert.alert('Erreur', "Impossible de charger les catégories. Veuillez réessayer.");
    }
  };

  useEffect(() => {
    console.log(1); fetchCategories(); // Charger les catégories lors du montage
  }, []);

  const difficulties = [
    { label: 'Tous', value: '' },
    { label: 'Facile', value: 'easy' },
    { label: 'Moyen', value: 'medium' },
    { label: 'Difficile', value: 'hard' },
  ];

  const isFormComplete = name && difficulty && category; // Condition pour le bouton

  return (
<View style={tw`flex-1 justify-center items-center bg-gray-100 px-5`}>
      
      <Text style={tw`text-4xl font-bold uppercase text-blue-600 mb-7`}>Quizzenture</Text>
      
      
      <Text style={tw`text-2xl text-gray-800 mb-4`}>Inscription</Text>

      
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

      {/* {isFormComplete && ( */}
        <Button
          title="Commencer la partie"
          onPress={() => onStartGame({ name, difficulty, category })} 
          color="#1e90ff" // Couleur personnalisée
        />
      {/* )} */}
    </View>
  );
};

export default SignUp;
