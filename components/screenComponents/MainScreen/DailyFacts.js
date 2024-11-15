import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useFishStore } from '../../../store/fishStore';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DailyFacts = () => {
    const { dailyFacts } = useFishStore();
    const [currentCategory, setCurrentCategory] = useState(null);
    const [currentFactIndex, setCurrentFactIndex] = useState(0);
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);

    useEffect(() => {
        if (dailyFacts.length > 0) {
            // Randomly select a category
            const randomCategory = dailyFacts[Math.floor(Math.random() * dailyFacts.length)];
            setCurrentCategory(randomCategory);
        }
    }, [dailyFacts]);

    const handleNextFact = () => {
        // Reset like/dislike state
        setLiked(false);
        setDisliked(false);

        // Move to next fact or cycle back to first
        if (currentFactIndex < currentCategory.facts.length - 1) {
            setCurrentFactIndex(prev => prev + 1);
        } else {
            setCurrentFactIndex(0);
        }
    };

    const handleLike = () => {
        setLiked(true);
        setDisliked(false);
    };

    const handleDislike = () => {
        setDisliked(true);
        setLiked(false);
    };

    if (!currentCategory) return null;

    const currentFact = currentCategory.facts[currentFactIndex];

    return (
        <View style={styles.container}>
            
            <View style={styles.factCard}>
            <Text style={styles.title}>Did You Know?</Text>
                <Text style={styles.factText}>{currentFact.fact}</Text>
                
                <View style={styles.actionButtons}>
                    <TouchableOpacity 
                        style={[styles.ratingButton, liked && styles.ratingButtonActive]}
                        onPress={handleLike}
                    >
                        <Icon 
                            name={liked ? "thumbs-up" : "thumbs-up-outline"} 
                            size={24} 
                            color={liked ? "#007AFF" : "#666"}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={[styles.ratingButton, disliked && styles.ratingButtonActive]}
                        onPress={handleDislike}
                    >
                        <Icon 
                            name={disliked ? "thumbs-down" : "thumbs-down-outline"} 
                            size={24} 
                            color={disliked ? "#007AFF" : "#666"}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.shareButton}>
                        <Icon name="share-outline" size={24} color="#007AFF" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                {/* <TouchableOpacity style={styles.watchButton}>
                    <Text style={styles.watchButtonText}>Watch Read</Text>
                </TouchableOpacity> */}

                <TouchableOpacity 
                    style={styles.nextButton}
                    onPress={handleNextFact}
                >
                    <Text style={styles.nextButtonText}>Next fact</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        shadowColor: '#007AFF',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 16,
        color: '#000',
    },
    factCard: {
        backgroundColor: '#E5E5E5',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E5E5E5',
    },
    factText: {
        fontSize: 16,
        color: '#000',
        lineHeight: 24,
        marginBottom: 16,
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 16,
    },
    ratingButton: {
        padding: 8,
    },
    ratingButtonActive: {
        backgroundColor: '#E8F1FF',
        borderRadius: 20,
    },
    shareButton: {
        marginLeft: 'auto',
        padding: 8,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    watchButton: {
        flex: 1,
        padding: 14,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#007AFF',
        alignItems: 'center',
    },
    watchButtonText: {
        color: '#007AFF',
        fontSize: 16,
        fontWeight: '600',
    },
    nextButton: {
        flex: 1,
        padding: 14,
        borderRadius: 8,
        backgroundColor: '#007AFF',
        alignItems: 'center',
    },
    nextButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default DailyFacts;