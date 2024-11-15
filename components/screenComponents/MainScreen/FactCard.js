import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const FactCard = ({ 
  fact, 
  showFullText = false,
  reaction,
  onLike,
  onDislike,
  onReadMore,
  style
}) => {
  return (
    <View style={[styles.factCard, style]}>
      <Text style={styles.title}>Did You Know?</Text>
      <Text style={styles.factText}>
        {showFullText ? fact : `${fact.slice(0, 30)}...`}
      </Text>
      
      <View style={styles.actionButtons}>
        <View style={styles.ratingButtons}>
          <TouchableOpacity 
            style={[
              styles.ratingButton, 
              reaction === 'like' && styles.likeButtonActive
            ]}
            onPress={onLike}
          >
            <Icon 
              name={reaction === 'like' ? "thumbs-up" : "thumbs-up-outline"} 
              size={24} 
              color={reaction === 'like' ? "#4CD964" : "#666"}
            />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.ratingButton, 
              reaction === 'dislike' && styles.dislikeButtonActive
            ]}
            onPress={onDislike}
          >
            <Icon 
              name={reaction === 'dislike' ? "thumbs-down" : "thumbs-down-outline"} 
              size={24} 
              color={reaction === 'dislike' ? "#FF3B30" : "#666"}
            />
          </TouchableOpacity>
        </View>

        {onReadMore && (
          <TouchableOpacity 
            style={styles.readMoreButton} 
            onPress={onReadMore}
          >
            <Text style={styles.readMoreButtonText}>Read more</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  factCard: {
    backgroundColor: '#E5E5E5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    color: '#000',
  },
  factText: {
    fontSize: 16,
    color: '#000',
    lineHeight: 24,
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  ratingButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  ratingButton: {
    padding: 8,
  },
  likeButtonActive: {
    backgroundColor: '#E8F8EA',
    borderRadius: 20,
  },
  dislikeButtonActive: {
    backgroundColor: '#FFE5E5',
    borderRadius: 20,
  },
  readMoreButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#1E6B8C',
    alignItems: 'center',
  },
  readMoreButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FactCard;