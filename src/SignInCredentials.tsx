import React from 'react';
import {StyleSheet, TextInput, View, Text, Pressable} from 'react-native';

const SignInCredentials = ({navigation}) => {
  return (
    <View style={styles.mainView}>
      <Text style={styles.welcomeNoteText}>Welcome to Live Chat Creation</Text>
      <TextInput
        style={styles.textInputHolder}
        placeholder="Enter your Full Name"></TextInput>
      <TextInput
        style={styles.textInputHolder}
        placeholder="Enter your Number"></TextInput>
      <TextInput
        style={styles.textInputHolder}
        placeholder="Enter your username"></TextInput>
      <TextInput
        style={styles.textInputHolder}
        placeholder="Enter pasword "></TextInput>
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.signInButton}
          onPress={() => navigation.navigate('OnBoard')}>
          <Text style={styles.signInButtonText}>Next</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  welcomeNoteText: {
    color: '#000000',
    fontSize: 20,
    textAlign: 'center',
  },
  textInputHolder: {
    backgroundColor: 'white',
    width: '90%',
    marginTop: 20,
    borderRadius: 10,
    padding: 10,
    borderColor: '#ADD8E6',
    borderWidth: 1,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 30,
  },
  signInButton: {
    backgroundColor: '#FFD580',
    marginBottom: 10,
    height: 50,
    width: '80%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInButtonText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default SignInCredentials;
