import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import foodEntryIcon from '../assets/masala-dosa.png';
import foodEntryCurryIcon from '../assets/curry.png';

function LoginFullScreen({navigation}: {navigation: any}): React.JSX.Element {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [isTextVisible, setIsTextVisible] = useState(true);

  const handlePress = async () => {
    if (userName.length === 0 && password.length === 0) {
      Alert.alert('Error', 'Please enter valid credentials');
    } else if (userName.length < 6 && password.length < 8) {
      Alert.alert('Error', 'Invalid Username or Password');
    } else if (userName.length < 6) {
      Alert.alert('Error', 'Invalid Username');
    } else if (password.length < 8) {
      Alert.alert('Error', 'Invalid Password');
    } else {
      Alert.alert('Success', 'Logged in Successfully');
      await saveCredentials(userName, password);
      await logStoredCredentials();
      navigation.navigate('HomeTab');
    }
  };

  const saveCredentials = async (userName: string, password: string) => {
    try {
      await AsyncStorage.setItem('USERNAME', userName);
      await AsyncStorage.setItem('PASSWORD', password);
      console.log('Credentials saved');
    } catch (error) {
      console.error('Failed to save credentials', error);
    }
  };

  const logStoredCredentials = async () => {
    try {
      const storedUserName = await AsyncStorage.getItem('USERNAME');
      const storedPassword = await AsyncStorage.getItem('PASSWORD');
      console.log('Stored Username:', storedUserName);
      console.log('Stored Password:', storedPassword);
    } catch (error) {
      console.error('Failed to retrieve credentials', error);
    }
  };

  const loadCredentials = async () => {
    try {
      const storedUserName = await AsyncStorage.getItem('USERNAME');
      const storedPassword = await AsyncStorage.getItem('PASSWORD');
      if (storedUserName && storedPassword) {
        setUserName(storedUserName);
        setPassword(storedPassword);
        console.log('Credentials loaded');
      }
    } catch (error) {
      console.error('Failed to load credentials', error);
    }
  };

  useEffect(() => {
    loadCredentials();
  }, []);

  return (
    <View style={styles.mainView}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.logoView}>
          <Image
            source={require('../assets/Native_logo.png')}
            style={styles.logo}
          />
        </View>
        <View style={styles.secondView}>
          <Text style={styles.topText}>Sign In</Text>
        </View>
        <TextInput
          style={styles.inputHolder}
          placeholder="Username"
          value={userName}
          onChangeText={setUserName}
        />
        <TextInput
          style={styles.inputHolder}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
        <View>
          <Pressable
            style={styles.signInButton}
            onPress={() => navigation.navigate('Sign in')}>
            <Text style={styles.signInText}>
              Don't have an account? Sign in here.
            </Text>
          </Pressable>
        </View>
      </ScrollView>
      <TouchableOpacity onPress={() => navigation.navigate('FoodLoginScreen')}>
        <View style={styles.foodEntryTextContainer}>
          <View>
            <Image source={foodEntryIcon} style={styles.foodEntryIcon} />
          </View>
          <Text style={styles.foodEntryText}>Click here for Food</Text>
          <View>
            <Image source={foodEntryCurryIcon} style={styles.foodEntryIcon} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#ADD8E6',
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  logoView: {
    marginTop: 100,
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  secondView: {
    marginTop: 20,
    width: '70%',
    height: 50,
    backgroundColor: '#FFB6C1',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topText: {
    fontSize: 30,
    fontWeight: '900',
    color: 'black',
  },
  inputHolder: {
    backgroundColor: 'white',
    width: '90%',
    marginTop: 20,
    borderRadius: 10,
    padding: 10,
  },
  button: {
    backgroundColor: '#A3876A',
    marginTop: 50,
    height: 50,
    width: '70%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 20,
  },
  signInButton: {
    backgroundColor: '#FFD580',
    marginTop: 50,
    height: 50,
    width: '70%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  foodEntryTextContainer: {
    height: 70,
    width: '80%',
    borderRadius: 20,
    padding: 12,
    marginBottom: 25,
    backgroundColor: '#effba3',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  foodEntryText: {
    fontSize: 18,
    color: 'black',
  },
  foodEntryIcon: {
    height: 65,
    width: 65,
    marginLeft: 15,
  },
});

export default LoginFullScreen;
