import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  Alert 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFishStore } from '../../../store/fishStore';
const CreatePostForm = ({ onSubmit }) => {
  const { addCustomPost } = useFishStore();
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [facts, setFacts] = useState([{ title: '', content: '' }]);
  const [conclusion, setConclusion] = useState('');

  const addFact = () => {
    setFacts([...facts, { title: '', content: '' }]);
  };

  const updateFact = (index, field, value) => {
    const updatedFacts = [...facts];
    updatedFacts[index] = { ...updatedFacts[index], [field]: value };
    setFacts(updatedFacts);
  };

  const removeFact = (index) => {
    if (facts.length > 1) {
      const updatedFacts = facts.filter((_, i) => i !== index);
      setFacts(updatedFacts);
    }
  };

  const handleSubmit = () => {
    if (!title.trim() || !introduction.trim() || !conclusion.trim()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const newPost = {
      id: Date.now().toString(),
      title,
      introduction,
      facts,
      conclusion,
      createdAt: new Date().toISOString(),
      isCustom: true
    };

    addCustomPost(newPost);
    navigation.goBack();
  };

  return (
    
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter post title"
      />

      <Text style={styles.label}>Introduction</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={introduction}
        onChangeText={setIntroduction}
        placeholder="Enter introduction"
        multiline
      />

      <Text style={styles.label}>Facts</Text>
      {facts.map((fact, index) => (
        <View key={index} style={styles.factContainer}>
          <TextInput
            style={styles.input}
            value={fact.title}
            onChangeText={(value) => updateFact(index, 'title', value)}
            placeholder="Fact title"
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            value={fact.content}
            onChangeText={(value) => updateFact(index, 'content', value)}
            placeholder="Fact content"
            multiline
          />
          <TouchableOpacity 
            style={styles.removeButton} 
            onPress={() => removeFact(index)}
          >
            <Text style={styles.removeButtonText}>Remove Fact</Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity style={styles.addButton} onPress={addFact}>
        <Text style={styles.addButtonText}>Add Fact</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Conclusion</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={conclusion}
        onChangeText={setConclusion}
        placeholder="Enter conclusion"
        multiline
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Create Post</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <View style={styles.space} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  space: {
    height: 100,
  },
  backButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 16,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  container: {
    padding: 16,
    backgroundColor: 'white',
    marginTop: '10%',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  factContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  removeButton: {
    backgroundColor: '#ff4444',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  removeButtonText: {
    color: 'white',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 16,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default CreatePostForm;