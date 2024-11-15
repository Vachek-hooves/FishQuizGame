import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React from 'react';
import {useFishStore} from '../../store/fishStore';
import Icon from 'react-native-vector-icons/Ionicons';

const isIOS = Platform.OS === 'ios';

const TabQuizScreen = ({navigation}) => {
  const {quizData, isLoading, quizPoints} = useFishStore();

  const handleStartQuiz = quiz => {
    navigation.navigate('StackQuizGame', {quizId: quiz.id});
  };

  const renderQuizItem = ({item}) => {
    const points = quizPoints[item.id] || 0;

    return (
      <View style={styles.quizItem}>
        <View style={styles.quizContent}>
          <Text style={styles.quizName}>"{item.quizName}"</Text>
          <Text style={styles.questionsCount}>
            Here's a quiz with {item.questions.length} questions
          </Text>
          <View style={styles.quizPointsContainer}>
            <View style={styles.pointsContainer}>
              <Icon name="trophy-outline" size={16} color="#FFD700" />
              <Text style={styles.pointsText}>{points} points</Text>
            </View>
            <TouchableOpacity
              style={styles.startButton}
              onPress={() => handleStartQuiz(item)}>
              <Text style={styles.startButtonText}>
                {points > 0 ? 'Try Again' : 'Start quiz'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>QUIZZES</Text>
      <Text style={styles.subtitle}>All quizzes:</Text>
      <FlatList
        data={quizData}
        keyExtractor={item => item.id.toString()}
        renderItem={renderQuizItem}
      />
    </View>
  );
};

export default TabQuizScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    paddingTop: isIOS ? 60 : 10,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#000',
    marginBottom: 16,
  },
  quizItem: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  quizContent: {
    flex: 1,
    marginRight: 12,
  },
  quizName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
    textAlign: 'left',
  },
  questionsCount: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  startButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  shareButton: {
    padding: 4,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    gap: 4,
  },
  pointsText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  quizPointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
