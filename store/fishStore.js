import {useContext, createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FISH_QUIZ} from '../data/fishQuiz';
import {DAILY_FACTS} from '../data/dilyFacts';

export const FishStoreContext = createContext();

const QUIZ_STORAGE_KEY = '@fish_quiz_data';
const DAILY_FACTS_STORAGE_KEY = '@daily_facts_data';
export const FishStoreProvider = ({children}) => {
    const [quizData, setQuizData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [dailyFacts, setDailyFacts] = useState([]);

    // Initialize quiz data
    const initQuizData = async () => {
        try {
            // Check if quiz data exists in storage
            const storedQuizData = await AsyncStorage.getItem(QUIZ_STORAGE_KEY);
            const storedDailyFacts = await AsyncStorage.getItem(DAILY_FACTS_STORAGE_KEY);
            
            if (!storedQuizData) {
                // If no data exists, store the initial quiz data
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
        } catch (error) {
            console.error('Error initializing quiz data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Update quiz data
    const updateQuizData = async (updatedQuiz) => {
        try {
            await AsyncStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(updatedQuiz));
            setQuizData(updatedQuiz);
        } catch (error) {
            console.error('Error updating quiz data:', error);
        }
    };

    useEffect(() => {
        initQuizData();
    }, []);

    const value = {
        quizData,
        isLoading,
        dailyFacts,
        updateQuizData,
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