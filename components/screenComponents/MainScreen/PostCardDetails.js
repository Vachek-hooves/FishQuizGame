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
    backgroundColor: 'white',
  },
  scrollView: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 16,
  },
  introduction: {
    fontSize: 16,
    color: '#333',
    marginBottom: 24,
    lineHeight: 24,
  },
  factContainer: {
    marginBottom: 20,
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
    backgroundColor: '#007AFF',
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