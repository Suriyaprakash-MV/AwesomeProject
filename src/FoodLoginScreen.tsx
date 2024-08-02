import {Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'react-native';
import 'react-native-gesture-handler';
import {Image} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {RollInRight} from 'react-native-reanimated';

// const Drawer = createDrawerNavigator();

const FoodLoginScreen = ({navigation: any}) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.photoContainer}>
        <Image
          source={require('../assets/fooddelivery.jpg')}
          style={styles.foodDeliveryPhoto}
        />
      </View>
      <View style={styles.credentialsHolder}>
        <TextInput
          style={styles.usernameInputHolder}
          placeholder="Username"
          value={userName}
          onChangeText={setUserName}
        />
        <TextInput
          style={styles.PasswordInputHolder}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('FoodHomeScreen')}>
          <View style={styles.cravingsHolder}>
            <Text style={styles.cravingsText}>Cravings Here</Text>
            <Image
              source={require('../assets/steam.png')}
              style={styles.arrowIcon}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  foodDeliveryPhoto: {
    height: 300,
    width: 300,
    borderRadius: 150,
  },
  photoContainer: {
    alignSelf: 'center',
    marginVertical: 25,
  },
  usernameInputHolder: {
    backgroundColor: 'white',
    width: '90%',
    marginTop: 20,
    marginLeft: 20,
    borderColor: '#fb1805',
    borderRadius: 30,
    padding: 10,
    borderWidth: 2,
  },
  PasswordInputHolder: {
    backgroundColor: 'white',
    width: '90%',
    marginTop: 20,
    marginLeft: 20,
    borderColor: '#fb1805',
    borderRadius: 30,
    padding: 10,
    borderWidth: 2,
  },
  credentialsHolder: {
    marginLeft: 10,
    alignContent: 'center',
    marginTop: 20,
  },
  cravingsHolder: {
    width: '80%',
    height: 50,
    backgroundColor: '#fb1805',
    borderRadius: 18,
    marginTop: 25,
    padding: 2,
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cravingsText: {
    color: 'white',
    fontSize: 35,
  },
  arrowIcon: {
    width: 45,
    height: 45,
    marginLeft: 10,
    transform: [{rotate: '90deg'}],
  },
});

export default FoodLoginScreen;
