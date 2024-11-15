import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import React from 'react';
import {useFishStore} from '../../store/fishStore';
import Icon from 'react-native-vector-icons/Ionicons';

const isIOS = Platform.OS === 'ios';

const TabQuizScreen = ({navigation}) => {
  const {quizData, isLoading, quizPoints, quizUnlockStatus} = useFishStore();

  const handleStartQuiz = quiz => {
    if (!quizUnlockStatus[quiz.id]) {
      Alert.alert(
        'Quiz Locked',
        'Complete the previous quiz with 80 points or more to unlock this quiz!',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      );
      return;
    }
    navigation.navigate('StackQuizGame', {quizId: quiz.id});
  };

  const renderQuizItem = ({item, index}) => {
    const points = quizPoints[item.id] || 0;
    const isLocked = !quizUnlockStatus[item.id];
    const previousQuizPoints = index > 0 ? quizPoints[String(index)] || 0 : 100;

    return (
      <View style={[
        styles.quizItem,
        isLocked && styles.lockedQuizItem
      ]}>
        <View style={styles.quizContent}>
          <View style={styles.quizHeader}>
            <Text style={[
              styles.quizName,
              isLocked && styles.lockedText
            ]}>
              "{item.quizName}"
            </Text>
            {isLocked && (
              <Icon name="lock-closed" size={20} color="#666" />
            )}
          </View>
          
          <Text style={[
            styles.questionsCount,
            isLocked && styles.lockedText
          ]}>
            {isLocked 
              ? `Complete previous quiz with 80+ points to unlock`
              : `Here's a quiz with ${item.questions.length} questions`
            }
          </Text>

          <View style={styles.quizPointsContainer}>
            <View style={styles.pointsContainer}>
              <Icon 
                name="trophy-outline" 
                size={16} 
                color={isLocked ? "#666" : "#FFD700"} 
              />
              <Text style={[
                styles.pointsText,
                isLocked && styles.lockedText
              ]}>
                {points} points
              </Text>
            </View>

            <TouchableOpacity
              style={[
                styles.startButton,
                isLocked && styles.lockedButton
              ]}
              onPress={() => handleStartQuiz(item)}>
              <Text style={[
                styles.startButtonText,
                isLocked && styles.lockedButtonText
              ]}>
                {isLocked ? 'Locked' : points > 0 ? 'Try Again' : 'Start quiz'}
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
    backgroundColor: '#E6F3F8',
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
    color: '#1E6B8C',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
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
    borderColor: '#B2E0F7',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    shadowColor: '#1E6B8C',
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
    backgroundColor: '#2D89B4',
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
  lockedQuizItem: {
    opacity: 0.7,
    backgroundColor: '#F5F5F5',
  },
  lockedText: {
    color: '#666',
  },
  lockedButton: {
    backgroundColor: '#E5E5E5',
    borderColor: '#666',
  },
  lockedButtonText: {
    color: '#666',
  },
  quizHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
});
