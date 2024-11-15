import {StyleSheet, Text, View} from 'react-native';
import {useFishStore} from '../../store/fishStore';

const StackLikedFacts = () => {
    const {factReactions,dailyFacts} = useFishStore();
  // console.log(dailyFacts);

  // Get all liked facts from all categories
  const getAllLikedFacts = () => {
    const likedFactsList = [];
    dailyFacts.forEach(category => {
      category.facts.forEach(fact => {
        if (factReactions[fact.id] === 'like') {
          // console.log(factReactions);
          likedFactsList.push(fact);
        }
      });
    });
    return likedFactsList;
  };

  const likedFactsList = getAllLikedFacts();
 

  return (
    <View>
      <Text>StackLikedFacts</Text>
    </View>
  );
};

export default StackLikedFacts;

const styles = StyleSheet.create({});
