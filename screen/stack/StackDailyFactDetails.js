import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Platform,
  ScrollView,
  SafeAreaView
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const isIOS = Platform.OS === 'ios';

const StackDailyFactDetails = ({ route }) => {
  const { fact } = route.params;
  const navigation = useNavigation();

  // Generate dynamic info based on fact content
  const getRelatedInfo = (fact) => {
    // Extract keywords from fact to determine context
    const keywords = fact.toLowerCase().split(' ');
    
    if (keywords.includes('coral') || keywords.includes('reef')) {
      return {
        importance: "Coral reefs are crucial marine ecosystems that support biodiversity and protect coastlines. They also provide economic benefits through tourism and fisheries.",
        additionalFact: "Coral reefs occupy less than 1% of the ocean floor but support about 25% of all marine species."
      };
    } else if (keywords.includes('shark') || keywords.includes('predator')) {
      return {
        importance: "Predatory species play a vital role in maintaining marine ecosystem balance by controlling prey populations and maintaining species diversity.",
        additionalFact: "Sharks have existed for over 400 million years, surviving multiple mass extinctions."
      };
    } else if (keywords.includes('fish')) {
      return {
        importance: "Fish are essential components of marine ecosystems and play crucial roles in maintaining ocean health through various ecological interactions.",
        additionalFact: "There are over 34,000 known species of fish, with new species still being discovered."
      };
    } else {
      return {
        importance: "Understanding marine life and ocean ecosystems is crucial for conservation efforts and maintaining global biodiversity.",
        additionalFact: "Oceans produce over 50% of the world's oxygen and absorb 30% of carbon dioxide released into the atmosphere."
      };
    }
  };

  const relatedInfo = getRelatedInfo(fact);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header with back button - outside ScrollView */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon 
            name="arrow-back-circle" 
            size={40} 
            color="#007AFF"
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Daily Fact</Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Main fact card */}
          <View style={styles.factCard}>
            <Text style={styles.title}>Did You Know?</Text>
            <Text style={styles.factText}>{fact}</Text>
          </View>

          {/* Additional information section */}
          <View style={styles.infoSection}>
            <View style={styles.infoCard}>
              <Icon name="information-circle" size={24} color="#007AFF" />
              <Text style={styles.infoTitle}>Why is this important?</Text>
              <Text style={styles.infoText}>{relatedInfo.importance}</Text>
            </View>

            <View style={styles.infoCard}>
              <Icon name="bulb" size={24} color="#007AFF" />
              <Text style={styles.infoTitle}>Related Fact</Text>
              <Text style={styles.infoText}>{relatedInfo.additionalFact}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: isIOS ? 8 : 16,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginLeft: 12,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  factCard: {
    backgroundColor: '#F8F8F8',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  factText: {
    fontSize: 18,
    lineHeight: 28,
    color: '#333',
  },
  infoSection: {
    gap: 16,
    paddingBottom: 24,
  },
  infoCard: {
    backgroundColor: '#F0F8FF',
    borderRadius: 12,
    padding: 16,
    gap: 8,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginTop: 8,
  },
  infoText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
  },
});

export default StackDailyFactDetails;