import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import DailyFacts from '../../components/screenComponents/MainScreen/DailyFacts';
import PostCard from '../../components/screenComponents/MainScreen/PostCard';
import CreatePostCard from '../../components/screenComponents/MainScreen/CreatePostCard';
import { POSTS } from '../../data/posts';
import { useFishStore } from '../../store/fishStore';

const TabMainScreen = () => {
  const { customPosts } = useFishStore();
  // const allPosts = [...POSTS, ...customPosts];
  const randomPosts = POSTS.sort(() => Math.random() - 0.5).slice(0, 1);
 

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <Text style={styles.title}>Fact&Quiz Collection</Text>
      <ScrollView>
      <DailyFacts />
      <Text style={styles.sectionTitle}>Interesting posts about fishing:</Text>
        {randomPosts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
        <CreatePostCard />
        
        <Text style={styles.userPostsTitle}>User posts:</Text>
        {customPosts.length > 0 && (
          customPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))
        )}
      </ScrollView>
    </View>
  )
}

export default TabMainScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginLeft: 16,
    color: '#007AFF',
    letterSpacing: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 16,
    marginTop: 16,
    color: '#333',
  },
  userPostsTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 16,
    marginTop: 16,
    color: '#333',
  }
});