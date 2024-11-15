import { StyleSheet, Text, View, TouchableOpacity, Share } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const PostCard = ({ post }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.card}>
      <Text style={styles.didYouKnow}>Read blog</Text>
      <Text style={styles.title}>{post.title}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.readButton}
          onPress={() => navigation.navigate('PostCardDetails', { post })}
        >
          <Text style={styles.readButtonText}>Read now</Text>
        </TouchableOpacity>
      
      </View>
    </View>
  )
}

export default PostCard

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    margin: 16,
    elevation: 3,
    marginVertical:30,
    shadowColor: '#007AFF',
    backgroundColor: '#E5E5E5',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

  },
  didYouKnow: {
    color: '#666',
    fontSize: 14,
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  readButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  readButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  shareButton: {
    padding: 8,
  },
  shareIcon: {
    fontSize: 20,
  }
})