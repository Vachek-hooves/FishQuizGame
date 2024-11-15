import {useContext, createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FISH_QUIZ} from '../data/fishQuiz';
import {DAILY_FACTS} from '../data/dilyFacts';

export const FishStoreContext = createContext();

const QUIZ_STORAGE_KEY = '@fish_quiz_data';
const DAILY_FACTS_STORAGE_KEY = '@daily_facts_data';
const FACT_REACTIONS_KEY = '@fact_reactions';
const QUIZ_POINTS_KEY = '@quiz_points';

export const FishStoreProvider = ({children}) => {
    const [quizData, setQuizData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [dailyFacts, setDailyFacts] = useState([]);
    const [factReactions, setFactReactions] = useState({});
    const [quizPoints, setQuizPoints] = useState({});

    // Initialize quiz data
    const initQuizData = async () => {
        try {
            const storedQuizData = await AsyncStorage.getItem(QUIZ_STORAGE_KEY);
            const storedDailyFacts = await AsyncStorage.getItem(DAILY_FACTS_STORAGE_KEY);
            const storedReactions = await AsyncStorage.getItem(FACT_REACTIONS_KEY);
            const storedPoints = await AsyncStorage.getItem(QUIZ_POINTS_KEY);
            
            if (!storedQuizData) {
                await AsyncStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(FISH_QUIZ));
                setQuizData(FISH_QUIZ);
            } else {
                setQuizData(JSON.parse(storedQuizData));
            }
            if (!storedDailyFacts) {
                await AsyncStorage.setItem(DAILY_FACTS_STORAGE_KEY, JSON.stringify(DAILY_FACTS));
                setDailyFacts(DAILY_FACTS);
            } else {
                setDailyFacts(JSON.parse(storedDailyFacts));
            }
            if (storedReactions) {
                setFactReactions(JSON.parse(storedReactions));
            }
            if (storedPoints) {
                setQuizPoints(JSON.parse(storedPoints));
            }
        } catch (error) {
            console.error('Error initializing data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const updateFactReaction = async (factId, reaction) => {
        try {
            const updatedReactions = {
                ...factReactions,
                [factId]: reaction
            };
            await AsyncStorage.setItem(FACT_REACTIONS_KEY, JSON.stringify(updatedReactions));
            setFactReactions(updatedReactions);
        } catch (error) {
            console.error('Error updating fact reaction:', error);
        }
    };

    const updateQuizPoints = async (quizId, correctAnswers) => {
        try {
            const points = correctAnswers * 10;
            const currentPoints = quizPoints[quizId] || 0;
            
            // Only update if new score is higher
            if (points > currentPoints) {
                const updatedPoints = {
                    ...quizPoints,
                    [quizId]: points
                };
                await AsyncStorage.setItem(QUIZ_POINTS_KEY, JSON.stringify(updatedPoints));
                setQuizPoints(updatedPoints);
            }
        } catch (error) {
            console.error('Error updating quiz points:', error);
        }
    };

    useEffect(() => {
        initQuizData();
    }, []);

    const value = {
        quizData,
        isLoading,
        dailyFacts,
        factReactions,
        quizPoints,
        updateFactReaction,
        updateQuizPoints,
    };
    
    return <FishStoreContext.Provider value={value}>{children}</FishStoreContext.Provider>
};

export const useFishStore = () => {
    const context = useContext(FishStoreContext);
    if (!context) {
        throw new Error('useFishStore must be used within a FishStoreProvider');
    }
    return context;
};