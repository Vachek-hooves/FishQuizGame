import { StyleSheet, Text, View, TouchableOpacity, Share } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const PostCard = ({ post }) => {
  const navigation = useNavigation();

//   const handleShare = async () => {
//     try {
//       await Share.share({
//         message: `${post.title}\n\n${post.introduction}`,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

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
        {/* <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
          <Text style={styles.shareIcon}>📤</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  )
}

export default PostCard

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    marginTop: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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