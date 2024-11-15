import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useFishStore } from '../../store/fishStore';
import FactCard from '../../components/screenComponents/MainScreen/FactCard';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const StackLikedFacts = () => {
  const navigation = useNavigation();
  const { factReactions, dailyFacts, updateFactReaction } = useFishStore();

  // Get all liked facts from all categories
  const getAllLikedFacts = () => {
    const likedFactsList = [];
    dailyFacts.forEach(category => {
      category.facts.forEach(fact => {
        if (factReactions[fact.id] === 'like') {
          likedFactsList.push(fact);
        }
      });
    });
    return likedFactsList;
  };

  const handleLike = (factId) => {
    const currentReaction = factReactions[factId];
    if (currentReaction === 'like') {
      updateFactReaction(factId, null);
    } else {
      updateFactReaction(factId, 'like');
    }
  };

  const handleDislike = (factId) => {
    const currentReaction = factReactions[factId];
    if (currentReaction === 'dislike') {
      updateFactReaction(factId, null);
    } else {
      updateFactReaction(factId, 'dislike');
    }
  };

  const handleReadMore = (fact) => {
    navigation.navigate('StackDailyFactDetails', { fact });
  };

  const likedFactsList = getAllLikedFacts();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Liked Facts</Text>
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {likedFactsList.length > 0 ? (
            likedFactsList.map((fact) => (
              <FactCard 
                key={fact.id}
                fact={fact.fact}
                reaction={factReactions[fact.id]}
                onLike={() => handleLike(fact.id)}
                onDislike={() => handleDislike(fact.id)}
                onReadMore={() => handleReadMore(fact.fact)}
                showFullText={true}
              />
            ))
          ) : (
            <Text style={styles.emptyText}>No liked facts yet</Text>
          )}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back-circle" size={48} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
  },
  container: {
    padding: 16,
    paddingBottom: 100, // Space for floating button
  },
  scrollView: {
    flex: 1,
    marginBottom: 100,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 24,
  },
  backButton: {
    position: 'absolute',
    bottom: 40,
    right: 40,
    backgroundColor: '#007AFF',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default StackLikedFacts;
