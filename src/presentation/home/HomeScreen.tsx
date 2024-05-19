import React, { memo } from 'react'
import {Text, View, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: { title: string };
  One: { title: string };
  Two: { title: string };
  Three: { title: string };
  Four: { title: string };
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = memo(({ navigation }: Props) => {
  const listNavigations = [
    {
      title: 'Go to answer question 1-2',
      link: 'One'
    },
    {
      title: 'Go to answer question 3-6',
      link: 'Two'
    },
    {
      title: 'Go to answer question 7-8',
      link: 'Three'
    },
    {
      title: 'Go to answer question 9',
      link: 'Four'
    },
  ]
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Halo, Gefami Service 👋</Text>
      <Text style={styles.subtitle}>Project pada apk ini menjawab pertanyaan 1-9 pada soal utama, disini saya memisahkan menjadi 4 screen, yaitu:</Text>
      <View style={styles.wrapperButton}>
        {listNavigations.map(nav => (
          <TouchableOpacity
            key={nav.link}
            onPress={() => navigation.navigate(nav.link)}
            style={styles.button}>
            <Text
              style={styles.buttonLabel}>
              {nav.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

    </SafeAreaView>
  )
})

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    marginTop: 12
  },
  title: {
    fontSize: 21,
    fontWeight: '700',
    color: '#000'
  },
  subtitle: {
    marginVertical: 6
  },
  wrapperButton: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: 'coral',
    alignSelf: 'flex-start',
    marginHorizontal: '1%',
    marginBottom: 6,
    minWidth: '48%',
    textAlign: 'center',
    cursor: 'pointer'
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: 'white',
  },
});

HomeScreen.displayName = 'HomeScreen'

export default HomeScreen
