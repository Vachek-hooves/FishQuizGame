import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// import ProgressBar from '../../components/ProgressBar';
import ProgressBar from '../../components/ui/ProgressBar';

const isIOS = Platform.OS === 'ios';

const StackQuizFinish = ({ route, navigation }) => {
  const { correctAnswers, totalQuestions } = route.params;
  const score = (correctAnswers / totalQuestions) * 100;
  const progress = correctAnswers / totalQuestions;

  const handleFinish = () => {
    navigation.navigate('TabQuizScreen');
  };

  const handleShare = () => {
    // Implement share functionality
    console.log('Share functionality to be implemented');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz</Text>

      <View style={styles.progressContainer}>
        <ProgressBar progress={progress} />
        <Text style={styles.progressText}>
          {correctAnswers}/{totalQuestions}
        </Text>
      </View>

      <View style={styles.resultContainer}>
        <View style={styles.resultIconContainer}>
          <Icon name="checkmark" size={24} color="#4CD964" />
        </View>
        <Text style={styles.resultText}>Correct answers</Text>
        <Text style={styles.scoreText}>{correctAnswers}/{totalQuestions}</Text>
      </View>

      <TouchableOpacity 
        style={styles.finishButton}
        onPress={handleFinish}
      >
        <Text style={styles.finishButtonText}>Finish</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity 
        style={styles.shareButton}
        onPress={handleShare}
      >
        <Icon name="share-outline" size={20} color="#007AFF" />
        <Text style={styles.shareButtonText}>Share</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    paddingTop: isIOS ? 60 : 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 24,
  },
  progressContainer: {
    marginBottom: 32,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    alignSelf: 'flex-end',
  },
  resultContainer: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    height: 100,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  resultIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E8F8EA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  resultText: {
    fontSize: 16,
    color: '#000',
    flex: 1,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  finishButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: '15%',
  },
  finishButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  shareButton: {
    borderWidth: 1,
    borderColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  shareButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default StackQuizFinish;