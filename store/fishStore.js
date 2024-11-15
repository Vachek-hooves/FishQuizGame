import {useContext, createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FISH_QUIZ} from '../data/fishQuiz';
import {DAILY_FACTS} from '../data/dilyFacts';

export const FishStoreContext = createContext();

const QUIZ_STORAGE_KEY = '@fish_quiz_data';
const DAILY_FACTS_STORAGE_KEY = '@daily_facts_data';
const FACT_REACTIONS_KEY = '@fact_reactions';
const QUIZ_POINTS_KEY = '@quiz_points';
const QUIZ_UNLOCK_KEY = '@quiz_unlock_status';
const CUSTOM_POSTS_KEY = '@custom_posts';

export const FishStoreProvider = ({children}) => {
    const [quizData, setQuizData] = useState([]);
    const [quizUnlockStatus, setQuizUnlockStatus] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [dailyFacts, setDailyFacts] = useState([]);
    const [factReactions, setFactReactions] = useState({});
    const [quizPoints, setQuizPoints] = useState({});
    const [customPosts, setCustomPosts] = useState([]);

    // Initialize quiz data
    const initQuizData = async () => {
        try {
            const storedQuizData = await AsyncStorage.getItem(QUIZ_STORAGE_KEY);
            const storedDailyFacts = await AsyncStorage.getItem(DAILY_FACTS_STORAGE_KEY);
            const storedReactions = await AsyncStorage.getItem(FACT_REACTIONS_KEY);
            const storedPoints = await AsyncStorage.getItem(QUIZ_POINTS_KEY);
            const storedUnlockStatus = await AsyncStorage.getItem(QUIZ_UNLOCK_KEY);
            const storedCustomPosts = await AsyncStorage.getItem(CUSTOM_POSTS_KEY);
            
            if (!storedQuizData) {
                const initialQuizData = FISH_QUIZ.map((quiz, index) => ({
                    ...quiz,
                    isLocked: index !== 0
                }));
                await AsyncStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(initialQuizData));
                setQuizData(initialQuizData);
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
            if (storedUnlockStatus) {
                setQuizUnlockStatus(JSON.parse(storedUnlockStatus));
            } else {
                const initialUnlockStatus = { '1': true }; // First quiz unlocked
                await AsyncStorage.setItem(QUIZ_UNLOCK_KEY, JSON.stringify(initialUnlockStatus));
                setQuizUnlockStatus(initialUnlockStatus);
            }
            if (storedCustomPosts) {
                setCustomPosts(JSON.parse(storedCustomPosts));
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
            
            if (points > currentPoints) {
                const updatedPoints = {
                    ...quizPoints,
                    [quizId]: points
                };
                await AsyncStorage.setItem(QUIZ_POINTS_KEY, JSON.stringify(updatedPoints));
                setQuizPoints(updatedPoints);

                // Check if points are enough to unlock next quiz
                if (points >= 80) {
                    const nextQuizId = (parseInt(quizId) + 1).toString();
                    const updatedUnlockStatus = {
                        ...quizUnlockStatus,
                        [nextQuizId]: true
                    };
                    await AsyncStorage.setItem(QUIZ_UNLOCK_KEY, JSON.stringify(updatedUnlockStatus));
                    setQuizUnlockStatus(updatedUnlockStatus);
                }
            }
        } catch (error) {
            console.error('Error updating quiz points:', error);
        }
    };

    const addCustomPost = async (newPost) => {
        try {
            const updatedPosts = [...customPosts, newPost];
            await AsyncStorage.setItem(CUSTOM_POSTS_KEY, JSON.stringify(updatedPosts));
            setCustomPosts(updatedPosts);
        } catch (error) {
            console.error('Error adding custom post:', error);
        }
    };

    const deleteCustomPost = async (postId) => {
        try {
            const updatedPosts = customPosts.filter(post => post.id !== postId);
            await AsyncStorage.setItem(CUSTOM_POSTS_KEY, JSON.stringify(updatedPosts));
            setCustomPosts(updatedPosts);
        } catch (error) {
            console.error('Error deleting custom post:', error);
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
        quizUnlockStatus,
        updateFactReaction,
        updateQuizPoints,
        customPosts,
        addCustomPost,
        deleteCustomPost,
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