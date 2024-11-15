import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useFishStore} from '../../../store/fishStore';
import {useEffect, useState} from 'react';
// import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import FactCard from './FactCard';

const DailyFacts = () => {
  const {dailyFacts, factReactions, updateFactReaction} = useFishStore();
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    if (dailyFacts.length > 0) {
      const randomCategory =
        dailyFacts[Math.floor(Math.random() * dailyFacts.length)];
      setCurrentCategory(randomCategory);
    }
  }, [dailyFacts]);

  const handleNextFact = () => {
    if (currentFactIndex < currentCategory.facts.length - 1) {
      setCurrentFactIndex(prev => prev + 1);
    } else {
      setCurrentFactIndex(0);
    }
  };

  const handleWatch = fact => {
    console.log('Watch', fact);
    navigation.navigate('StackDailyFactDetails', {fact});
  };

  const handleWatchLiked = () => {
    navigation.navigate('StackLikedFacts');
  };

  const handleLike = () => {
    const factId = currentFact.id;
    const currentReaction = factReactions[factId];

    if (currentReaction === 'like') {
      // Remove like if already liked
      updateFactReaction(factId, null);
    } else {
      // Add like
      updateFactReaction(factId, 'like');
    }
  };

  const handleDislike = () => {
    const factId = currentFact.id;
    const currentReaction = factReactions[factId];

    if (currentReaction === 'dislike') {
      // Remove dislike if already disliked
      updateFactReaction(factId, null);
    } else {
      // Add dislike
      updateFactReaction(factId, 'dislike');
    }
  };

  if (!currentCategory) return null;

  const currentFact = currentCategory.facts[currentFactIndex];
  const currentReaction = factReactions[currentFact.id];

  return (
    <View style={styles.container}>
      <FactCard
        fact={currentFact.fact}
        reaction={currentReaction}
        onLike={handleLike}
        onDislike={handleDislike}
        onReadMore={() => handleWatch(currentFact.fact)}
      />
      

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.watchButton} onPress={handleWatchLiked}>
          <Text style={styles.watchButtonText}>Watch Liked</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={handleNextFact}>
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
    shadowOffset: {width: 0, height: 2},
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
//   factCard: {
//     backgroundColor: '#E5E5E5',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 16,
//     borderWidth: 1,
//     borderColor: '#E5E5E5',
//   },
//   factText: {
//     fontSize: 16,
//     color: '#000',
//     lineHeight: 24,
//     marginBottom: 16,
//   },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
//   ratingButton: {
//     padding: 8,
//   },
//   likeButtonActive: {
//     backgroundColor: '#E8F8EA', // Light green background
//     borderRadius: 20,
//   },
//   dislikeButtonActive: {
//     backgroundColor: '#FFE5E5', // Light red background
//     borderRadius: 20,
//   },
//   ratingButtons: {
//     flexDirection: 'row',
//     gap: 16,
//   },
//   shareButton: {
//     marginLeft: 'auto',
//     padding: 8,
//   },
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
//   readMoreButton: {
//     padding: 8,
//     borderRadius: 8,
//     backgroundColor: '#007AFF',
//     alignItems: 'center',
//   },
//   readMoreButtonText: {
//     color: '#FFF',
//     fontSize: 16,
//     fontWeight: '600',
//   },
});

export default DailyFacts;
