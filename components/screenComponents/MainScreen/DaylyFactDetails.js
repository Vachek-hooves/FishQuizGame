import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const DaylyFactDetails = ({route}) => {
  const { fact } = route.params;
  console.log(fact);
  return (
    <View>
      <Text>DaylyFactDetails</Text>
    </View>
  )
}

export default DaylyFactDetails

const styles = StyleSheet.create({})