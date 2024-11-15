import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Platform,
  Alert,
  Keyboard,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
const PROFILE_STORAGE_KEY = '@user_profile';
const isIOS = Platform.OS === 'ios';

const TabProfileScreen = () => {
  const [profile, setProfile] = useState({
    name: '',
    imageUri: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const savedProfile = await AsyncStorage.getItem(PROFILE_STORAGE_KEY);
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load profile data');
    }
  };

  const saveProfile = async newProfile => {
    try {
      await AsyncStorage.setItem(
        PROFILE_STORAGE_KEY,
        JSON.stringify(newProfile),
      );
      setProfile(newProfile);
      return true;
    } catch (error) {
      Alert.alert('Error', 'Failed to save profile data');
      return false;
    }
  };

  const handleImagePick = () => {
    Alert.alert(
      'Update Profile Picture',
      'Choose a new profile picture from your gallery',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Choose Photo', onPress: launchImagePicker},
      ],
    );
  };

  const launchImagePicker = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      selectionLimit: 1,
      includeBase64: false,
    };

    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        return;
      }

      if (response.errorCode) {
        Alert.alert('Error', 'Failed to select image');
        return;
      }

      if (response.assets && response.assets[0]) {
        const success = await saveProfile({
          ...profile,
          imageUri: response.assets[0].uri,
        });

        if (success) {
          Alert.alert('Success', 'Profile picture updated successfully');
        }
      }
    });
  };

  const startEditing = () => {
    setTempName(profile.name);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setTempName('');
    Keyboard.dismiss();
  };

  const saveEditing = async () => {
    if (!tempName.trim()) {
      Alert.alert('Error', 'Please enter a valid name');
      return;
    }

    const success = await saveProfile({
      ...profile,
      name: tempName.trim(),
    });

    if (success) {
      Alert.alert('Success', 'Name updated successfully');
      setIsEditing(false);
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled">
        <LinearGradient
          colors={['#FFFFFF', '#E6F3F8', '#2D89B4']}
          style={styles.linearGradient}>
          {/* <View style={styles.card}> */}
          <View style={styles.profileContainer}>
            <View style={styles.imageWrapper}>
              <TouchableOpacity
                style={styles.imageContainer}
                onPress={handleImagePick}>
                {profile.imageUri ? (
                  <Image
                    source={{uri: profile.imageUri}}
                    style={styles.profileImage}
                  />
                ) : (
                  <View style={styles.placeholderImage}>
                    <Icon name="person" size={40} color="#666" />
                    <Text style={styles.placeholderText}>Add Photo</Text>
                  </View>
                )}
                <View style={styles.editImageButton}>
                  <Icon name="camera" size={16} color="#fff" />
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.nameContainer}>
              {isEditing ? (
                <View style={styles.editContainer}>
                  <TextInput
                    style={styles.nameInput}
                    value={tempName}
                    onChangeText={setTempName}
                    placeholder="Enter your name"
                    placeholderTextColor="#666"
                    autoFocus
                    maxLength={30}
                  />
                  <View style={styles.editButtons}>
                    <TouchableOpacity
                      style={[styles.editButton, styles.cancelButton]}
                      onPress={cancelEditing}>
                      <Icon name="close" size={20} color="#FF3B30" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.editButton, styles.saveButton]}
                      onPress={saveEditing}>
                      <Icon name="checkmark" size={20} color="#4CD964" />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.nameDisplay}
                  onPress={startEditing}>
                  <Text style={styles.nameText}>
                    {profile.name || 'Add your name'}
                  </Text>
                  <Icon name="pencil" size={20} color="#007AFF" />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={{height: 100}}></View>
          {/* </View> */}
        </LinearGradient>
      </ScrollView>
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
  linearGradient: {
    borderRadius: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  profileContainer: {
    alignItems: 'center',
  },
  imageWrapper: {
    padding: 8,
    backgroundColor: '#F8F8F8',
    borderRadius: 70,
    marginBottom: 24,
  },
  imageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 250,
    height: 250,
    borderRadius: 60,
  },
  placeholderImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  placeholderText: {
    marginTop: 8,
    fontSize: 12,
    color: '#666',
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#007AFF',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  nameContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 16,
    width: '90%',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#B2E0F7',
  },
  nameDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    borderRadius: 12,
  },
  nameText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
  },
  editContainer: {
    width: '100%',
  },
  nameInput: {
    fontSize: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    padding: 12,
    color: '#000',
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  editButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginTop: 16,
  },
  editButton: {
    padding: 12,
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#1E6B8C',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cancelButton: {
    backgroundColor: '#FFF5F5',
  },
  saveButton: {
    backgroundColor: '#F0FFF0',
  },
});

export default TabProfileScreen;
