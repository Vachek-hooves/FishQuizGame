import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const CreatePostCard = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('CreatePostForm')}
    >
      <Text style={styles.title}>Create your own post</Text>
      <View style={styles.iconContainer}>
        <Icon name="plus" size={52} color="#007AFF" />
      </View>
    </TouchableOpacity>
  );
};

export default CreatePostCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    margin: 16,
    backgroundColor: '#E5E5E5',
    shadowColor: '#007AFF',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 12,
  },
  iconContainer: {
    padding: 16,
  },
});