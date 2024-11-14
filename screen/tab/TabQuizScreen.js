import { StyleSheet, Text, View, ActivityIndicator, FlatList, TouchableOpacity,Platform } from 'react-native'
import React from 'react'
import { useFishStore } from '../../store/fishStore'
import Icon from 'react-native-vector-icons/Ionicons'



const isIOS = Platform.OS === 'ios'

const TabQuizScreen = ({navigation}) => {
  const { quizData, isLoading } = useFishStore()

  const handleStartQuiz = (quiz) => {
    navigation.navigate('StackQuizGame', { quizId: quiz.id })
  }

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>QUIZZES</Text>
      <Text style={styles.subtitle}>All quizzes:</Text>
      <FlatList
        data={quizData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.quizItem}>
            <View style={styles.quizContent}>
              <Text style={styles.quizName}>"{item.quizName}"</Text>
              <Text style={styles.questionsCount}>
                Here's a quiz with {item.questions.length} questions
              </Text>
              <TouchableOpacity 
                style={styles.startButton}
                onPress={() => handleStartQuiz(item)}
              >
                <Text style={styles.startButtonText}>Start quiz</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  )
}

export default TabQuizScreen

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
})