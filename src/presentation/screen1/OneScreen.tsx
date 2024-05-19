import React, { memo, useState, useCallback } from 'react'
import {Text, SafeAreaView, Button, StyleSheet, View} from 'react-native'
import DummyData from '../../data/dummy.json'

const OneScreen = memo(() => {
  const [value, setValue] = useState('label')

  const onClickChangeLabel = useCallback(() => {
    const getRandomIndex = Math.floor(Math.random() * 3)
    const getName = DummyData.users[getRandomIndex].name
    setValue(getName)
  }, [setValue])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.textLabel}>{value}</Text>
        <Button
          onPress={onClickChangeLabel}
          title="Change random label"
          color="#841584"
        />
      </View>
    </SafeAreaView>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  wrapper: {
    paddingHorizontal: 12
  },
  textLabel: {
    marginBottom: 20,
    fontSize: 16,
    textAlign: 'center'
  }
});

OneScreen.displayName = 'OneScreen'

export default OneScreen
