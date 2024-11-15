import { StyleSheet, Text, View, ScrollView, SafeAreaView , TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native';

const PostCardDetails = ({ route }) => {
  const { post } = route.params;
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.introduction}>{post.introduction}</Text>
        
        {post.facts.map((fact, index) => (
          <View key={index} style={styles.factContainer}>
            <Text style={styles.factTitle}>{fact.title}</Text>
            <Text style={styles.factContent}>{fact.content}</Text>
          </View>
        ))}
        
        <Text style={styles.conclusion}>{post.conclusion}</Text>
      </ScrollView>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default PostCardDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F3F8',
  },
  scrollView: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E6B8C',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  introduction: {
    fontSize: 16,
    color: '#333',
    marginBottom: 24,
    lineHeight: 24,
  },
  factContainer: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#B2E0F7',
    shadowColor: '#1E6B8C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  factTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  factContent: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  conclusion: {
    fontSize: 16,
    color: '#333',
    marginTop: 24,
    marginBottom: 32,
    fontStyle: 'italic',
    lineHeight: 24,
  },
  backButton: {
    backgroundColor: '#2D89B4',
    padding: 12,
    alignItems: 'center',
    margin: 16,
    borderRadius: 8,
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  }
})