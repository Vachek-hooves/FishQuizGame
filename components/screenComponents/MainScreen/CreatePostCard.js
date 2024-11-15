import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

const CreatePostCard = () => {
  return (
        <View style={styles.card}>
       <Text style={styles.title}>Create your own post</Text>
       <TouchableOpacity style={styles.button}>
        <Icon name="plus" size={52} color="#007AFF" />
       </TouchableOpacity>
        </View>
  )
}

    export default CreatePostCard

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
    title: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        marginBottom: 12,
    }
})