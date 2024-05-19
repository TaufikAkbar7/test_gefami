import React, { memo } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { hash } from '../../helper'

const ThreeScreen = memo(() => {
  const answer = [
    'Pada line 23 tambahkan koma',
    'Pada line 429 tambahkan double qoute diakhir value attribute',
    'Pada line 438 assign value pada key valueAsString',
    'Pada line 528 fix typo seharusnya nama key attribute bukan attributes',
    'Pada line 541 assign index pada variable cleanA'
  ]
  const getDateNow = () => {
    const date = new Date()
    let getDate = date.getDate().toString()
    let getMonth = date.getMonth().toString()
    if (getMonth.length === 1) {
      getMonth = '0' + getMonth
    }
    if (getDate.length === 1) {
      getDate = '0' + getDate
    }
    return getDate + getMonth + date.getFullYear()
  }
  
  console.log(hash(`${getDateNow()}taufikpriaifabula`))

  return (
    <View style={styles.container}>
      <Text>Untuk jawaban soal no 7 silakan check terminal atau debug console</Text>
      <View style={styles.wrapper}>
        <Text>Untuk jawaban soal no 8 penjelasannya dibawah ini:</Text>
        {answer.map((item, itemIndex) => (
          <Text key={itemIndex} style={styles.text}>{itemIndex + 1}. {item}</Text>
        ))}
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  container: { 
    padding: 20
  }, 
  wrapper: { 
    marginTop: 20
  },
  text: {
    marginTop: 5
  }
})

ThreeScreen.displayName = 'ThreeScreen'

export default ThreeScreen
