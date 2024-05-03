import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import tw from 'twrnc'; // Assurez-vous que le package est installé

const themes = [
    { label: 'Général', value: 9 }, // 9 est l'identifiant du thème général
    { label: 'Livres', value: 10 },
    { label: 'Films', value: 11 },
    // Ajoutez d'autres thèmes si nécessaire
];

const TriviaApp = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTheme, setSelectedTheme] = useState(9); // Thème par défaut

    const fetchQuestions = async (theme) => {
        setLoading(true); // Début du chargement
        try {
            const response = await fetch(
                `https://opentdb.com/api.php?amount=20&type=multiple&category=${theme}`
            );
            const data = await response.json();
            setQuestions(data.results);
            setLoading(false); // Arrêter le chargement
        } catch (error) {
            console.error(error);
            setLoading(false); // Arrêter le chargement même en cas d'erreur
        }
    };

    useEffect(() => {
        fetchQuestions(selectedTheme); // Charger les données avec le thème sélectionné
    }, [selectedTheme]); // Rechargement si le thème change

    return (
        <View style={tw`flex-1 justify-center items-center bg-gray-100`}>
            <Picker
                selectedValue={selectedTheme}
                style={tw`w-3/4`} // Tailwind pour le style
                onValueChange={(itemValue) => setSelectedTheme(itemValue)}
            >
                {themes.map((theme) => (
                    <Picker.Item key={theme.value} label={theme.label} value={theme.value} />
                ))}
            </Picker>

            {loading ? (
                <ActivityIndicator size="large" color="#00ff00" />
            ) : (
                <FlatList
                    data={questions}
                    keyExtractor={(item) => item.question}
                    renderItem={({ item }) => (
                        <View style={tw`p-2 border-b border-gray-300`}>
                            <Text style={tw`text-lg`}>{item.question}</Text>
                        </View>
                    )}
                />
            )}
        </View>
    );
};

export default TriviaApp;
