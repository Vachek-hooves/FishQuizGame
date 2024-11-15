import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { useFishStore } from '../../store/fishStore';
import Icon from 'react-native-vector-icons/Ionicons';
import ProgressBar from '../../components/ui/ProgressBar';


const isIOS = Platform.OS === 'ios';
const LETTERS = ['A', 'B', 'C', 'D'];

const StackQuizGame = ({ route, navigation }) => {
  const { quizId } = route.params;
  const { quizData, updateQuizPoints } = useFishStore();
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  useEffect(() => {
    const quiz = quizData.find(q => q.id === quizId);
    setCurrentQuiz(quiz);
  }, [quizId, quizData]);

  if (!currentQuiz) return null;

  const currentQuestion = currentQuiz.questions[currentQuestionIndex];
  const progress = (currentQuestionIndex + 1) / currentQuiz.questions.length;

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    if (answer === currentQuestion.correctOption) {
      setCorrectAnswers(prev => prev + 1);
    }
  };

  const handleContinue = () => {
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      updateQuizPoints(quizId, correctAnswers);
      navigation.navigate('StackQuizFinish', {
        correctAnswers,
        totalQuestions: currentQuiz.questions.length,
        points: correctAnswers * 10,
      });
    }
  };

  const renderOption = (option, index) => {
    const isSelected = selectedAnswer === option;
    const isCorrect = option === currentQuestion.correctOption;
    const isWrong = isSelected && !isCorrect;

    return (
      <TouchableOpacity
        key={index}
        style={[
          styles.optionButton,
          isSelected && styles.selectedOption,
          selectedAnswer && isCorrect && styles.correctOption,
          isWrong && styles.wrongOption,
        ]}
        onPress={() => handleAnswer(option)}
        disabled={selectedAnswer !== null}
      >
        <View style={styles.optionContent}>
          <View style={styles.optionLeft}>
            <View style={[
              styles.letterCircle,
              isSelected && styles.selectedLetterCircle,
              selectedAnswer && isCorrect && styles.correctLetterCircle,
              isWrong && styles.wrongLetterCircle,
            ]}>
              <Text style={[
                styles.letterText,
                (isSelected || selectedAnswer && isCorrect) && styles.selectedLetterText
              ]}>
                {LETTERS[index]}
              </Text>
            </View>
            <Text style={[
              styles.optionText,
              isSelected && styles.selectedOptionText,
              selectedAnswer && isCorrect && styles.correctOptionText,
              isWrong && styles.wrongOptionText,
            ]}>
              {option}
            </Text>
          </View>
          {selectedAnswer && (isCorrect ? (
            <View style={styles.iconContainer}>
              <Icon name="checkmark-circle" size={36} color="#4CD964" />
            </View>
          ) : isWrong ? (
            <View style={styles.iconContainer}>
              <Icon name="close-circle" size={36} color="#FF3B30" />
            </View>
          ) : null)}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz</Text>
      
      <View style={styles.progressContainer}>
        <ProgressBar progress={progress} />
        <Text style={styles.progressText}>
          {currentQuestionIndex + 1}/{currentQuiz.questions.length}
        </Text>
      </View>

      <Text style={styles.question}>
        Question {currentQuestionIndex + 1}: {currentQuestion.question}
      </Text>

      <View style={styles.optionsContainer}>
        {currentQuestion.options.map((option, index) => renderOption(option, index))}
      </View>

      {selectedAnswer && (
        <TouchableOpacity 
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F3F8',
    padding: 16,
    paddingTop: isIOS ? 60 : 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E6B8C',
    marginBottom: 24,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
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
  question: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000',
    marginBottom: 32,
    textAlign: 'center',
  },
  optionsContainer: {
    gap: 12,
   
  },
  optionButton: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#B2E0F7',
    height: 90,
    justifyContent: 'center',
    shadowColor: '#1E6B8C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  letterCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  letterText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  selectedLetterCircle: {
    backgroundColor: '#007AFF',
    borderColor: '#fff',
  },
  correctLetterCircle: {
    backgroundColor: '#4CD964',
    borderColor: '#fff',
  },
  wrongLetterCircle: {
    backgroundColor: '#FF3B30',
    borderColor: '#fff',
  },
  selectedLetterText: {
    color: '#fff',
  },
  optionText: {
    fontSize: 16,
    color: '#000',
    flex: 1,
  },
  selectedOptionText: {
    color: '#fff',
  },
  correctOptionText: {
    color: '#fff',
  },
  wrongOptionText: {
    color: '#fff',
  },
  selectedOption: {
    backgroundColor: '#2D89B4',
    borderColor: '#2D89B4',
  },
  correctOption: {
    backgroundColor: '#4CD964',
    borderColor: '#4CD964',
  },
  wrongOption: {
    backgroundColor: '#FF3B30',
    borderColor: '#FF3B30',
  },
  continueButton: {
    backgroundColor: '#1E6B8C',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: '10%',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    
  },
  iconContainer: {
   padding: 6,
   borderRadius: 26,
   backgroundColor: '#fff',
},
});

export default StackQuizGame;