import React, { memo, useState, useReducer, useCallback } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface IForm {
  username: string
  password: string
  errorMessageUsername?: string
  errorMessagePassword?: string
}

const FourScreen = memo(() => {
  const [form, setForm] = useReducer(
    (state: IForm, newState: Partial<IForm>) => ({
      ...state,
      ...newState,
    }),
    {
      username: '',
      password: '',
      errorMessageUsername: undefined,
      errorMessagePassword: undefined
    }
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isPasswordSecure, setIsPasswordSecure] = useState(true)
  const [data, setData] = useState('')

  const onPressToggleSecure = useCallback(() => {
    setIsPasswordSecure(prev => !prev)
  }, [setIsPasswordSecure])

  const getData = useCallback(async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user-data');
      if (jsonValue) {
        const parseJSON = JSON.parse(jsonValue)
        setData(parseJSON.username)
      }
    } catch (e) {
      console.error(e)
    }
  }, [setData])

  const onSubmit = useCallback(async () => {
    // validate
    if (!form.username && !form.password) {
      setForm({ errorMessageUsername: 'Username is required', errorMessagePassword: 'Password is required' })
      return
    }
    if (!form.username) {
      setForm({ errorMessageUsername: 'Username is required', errorMessagePassword: undefined })
      return
    }
    if (!form.password) {
      setForm({ errorMessagePassword: 'Password is required', errorMessageUsername: undefined })
      return
    }

    try {
      const payload = {
        username: form.username,
        password: form.password
      }
      const jsonValue = JSON.stringify(payload)
      await AsyncStorage.setItem('user-data', jsonValue)

      setIsAuthenticated(true)
      setForm({ errorMessagePassword: undefined, errorMessageUsername: undefined, username: '', password: '' })
      getData()
    } catch (e) {
      console.error(e)
    }
  }, [setForm, setIsAuthenticated, form, getData])

  const onLogout = useCallback(async () => {
    try {
      await AsyncStorage.removeItem('user-data')
      setIsAuthenticated(false)
    } catch(e) {
      console.error(e)
    }
  }, [setIsAuthenticated])

  return (
    <View style={styles.container}>
    {isAuthenticated ? (
      <View>
        <Text>Selamat datang, {data}</Text>
        <Button mode="contained" style={styles.button} onPress={onLogout}>
          logout
        </Button>
      </View>
    ) : (
      <View>
        <TextInput
          label="Username"
          mode="outlined"
          onChangeText={(text: string) => setForm({ username: text })}
          defaultValue={form.username}
        />
        {form.errorMessageUsername && <Text style={styles.textError}>{form.errorMessageUsername}</Text>}
    
        <TextInput
          label="Password"
          mode="outlined"
          secureTextEntry={isPasswordSecure}
          right={<TextInput.Icon icon={isPasswordSecure ? 'eye' : 'eye-off'} onPress={onPressToggleSecure} />}
          onChangeText={(text: string) => setForm({ password: text })}
          defaultValue={form.password}
          style={styles.textPassword}
        />
        {form.errorMessagePassword && <Text style={styles.textError}>{form.errorMessagePassword}</Text>}
        <Button mode="contained" style={styles.button} onPress={onSubmit}>
          Login
        </Button>
      </View>
    )}
    </View>
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
  },
  textPassword: {
    marginTop: 24
  },
  button: {
    marginTop: 24
  },
  textError: {
    color: 'red',
    marginTop: 3
  }
});


FourScreen.displayName = 'FourScreen'

export default FourScreen
