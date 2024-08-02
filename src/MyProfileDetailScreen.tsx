import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Alert,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import Mailer from 'react-native-mail';
import RNFS from 'react-native-fs';

type ProfilerProps = {
  name: string;
};

const ProfileScreen: React.FC<ProfilerProps> = ({name}) => {
  const [firstName, setFirstName] = useState('Albert');
  const [lastName, setLastName] = useState('Dekrim');
  const [age, setAge] = useState(55);
  const [dob, setDob] = useState('18/07/1980');
  const [profileImage, setProfileImage] = useState(
    'https://via.placeholder.com/150',
  );

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const firstName = await AsyncStorage.getItem('firstName');
        const lastName = await AsyncStorage.getItem('lastName');
        const age = await AsyncStorage.getItem('age');
        const dob = await AsyncStorage.getItem('dob');
        const profileImage = await AsyncStorage.getItem('profileImage');

        if (firstName) setFirstName(firstName);
        if (lastName) setLastName(lastName);
        if (age) setAge(Number(age));
        if (dob) setDob(dob);
        if (profileImage) setProfileImage(profileImage);
      } catch (error) {
        console.log('Error loading profile data', error);
      }
    };
    loadProfileData();
  }, []);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android')
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'App Camera Permission',
            message: 'App needs access to your camera ',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn('Error requesting camera permission', err);
        return false;
      }
  };

  const openCamera = async () => {
    try {
      const hasPermission = await requestCameraPermission();
      if (hasPermission) {
        launchCamera({mediaType: 'photo'}, res => {
          if (
            !res.didCancel &&
            !res.errorCode &&
            res.assets &&
            res.assets.length > 0
          ) {
            const asset = res.assets[0];
            if (asset && asset.uri) {
              setProfileImage(asset.uri);
            }
          }
        });
      } else {
        console.log('Camera permission denied');
      }
    } catch (error) {
      console.warn('Error opening camera', error);
    }
  };

  const saveProfiledata = async () => {
    try {
      await AsyncStorage.setItem('firstName', firstName);
      await AsyncStorage.setItem('lastName', lastName);
      await AsyncStorage.setItem('age', age.toString());
      await AsyncStorage.setItem('dob', dob);
      await AsyncStorage.setItem('profileImage', profileImage);
      Alert.alert('Profile Saved', 'Your profile data has been saved');
    } catch (error) {
      console.log('Error saving profile data', error);
      Alert.alert('Error', 'There was an error saving your profile data.');
    }
  };

  const handleShareProfile = async (imageUri: string) => {
    if (!imageUri || imageUri === 'https://via.placeholder.com/150') {
      Alert.alert('No Image Selected', 'Please take a photo to share.');
      return;
    }

    try {
      let localFilePath = imageUri;
      if (imageUri.startsWith('http')) {
        const fileName = imageUri.split('/').pop();
        localFilePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

        const downloadResult = await RNFS.downloadFile({
          fromUrl: imageUri,
          toFile: localFilePath,
        }).promise;
        if (downloadResult.statusCode !== 200) {
          throw new Error(
            `Failed to download image: ${downloadResult.statusCode}`,
          );
        }
      }

      Mailer.mail(
        {
          subject: 'Hey my friend, check out my profile!',
          recipients: ['mmvsuriyaprakash@gmail.com'],
          body: "Hey my friend, this is my profile in 'Chatood App'. Let's connect there.",
          isHTML: true,
          attachments: [
            {
              path: localFilePath,
              type: 'image',
              name: 'ShareMyProfile.png',
            },
          ],
        },
        (error, event) => {
          if (error) {
            Alert.alert(
              'Error',
              'Could not send email. Please try again later',
            );
          }
        },
      );
    } catch (error) {
      console.error('Error handling profile share', error);
      Alert.alert(
        'Error',
        'An error occurred while handling the profile share.',
      );
    }
  };

  const image = require('../assets/ShareMyProfile.png');

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openCamera}>
        <Image source={{uri: profileImage}} style={styles.profilePhotoHolder} />
      </TouchableOpacity>
      <View style={styles.textInputHolder}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/128/1077/1077114.png',
          }}
          style={styles.icon}
        />
        <TextInput
          value={firstName}
          onChangeText={setFirstName}
          style={styles.fontText}
          placeholder="First Name"
          placeholderTextColor={'#808080'}
        />
      </View>
      <View style={styles.textInputHolder}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/128/1828/1828451.png',
          }}
          style={styles.icon}
        />
        <TextInput
          value={lastName}
          onChangeText={setLastName}
          style={styles.fontText}
          placeholder="Last Name"
          placeholderTextColor={'#808080'}
        />
      </View>
      <View style={styles.textInputHolder}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/128/5670/5670755.png',
          }}
          style={styles.icon}
        />
        <TextInput
          value={age.toString()}
          onChangeText={text => setAge(Number(text))}
          style={styles.fontText}
          placeholder="Age"
          placeholderTextColor={'#808080'}
        />
      </View>
      <View style={styles.textInputHolder}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/128/2195/2195322.png',
          }}
          style={styles.icon}
        />
        <TextInput
          value={dob}
          onChangeText={setDob}
          style={styles.fontText}
          placeholder="Date of Birth"
          placeholderTextColor={'#808080'}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={saveProfiledata} title="Save" />
      </View>
      <TouchableOpacity onPress={() => handleShareProfile(profileImage)}>
        <View style={styles.shareMyProfileIconContainer}>
          <Image
            source={require('../assets/ShareMyProfile.png')}
            style={styles.shareMyProfileIcon}
          />
          <Text style={styles.shareProfileText}>Share Profile</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  fontText: {
    fontSize: 20,
    color: 'black',
    flex: 1,
    marginVertical: 5,
    padding: 6,
  },
  textInputHolder: {
    height: 50,
    width: '80%',
    backgroundColor: 'white',
    marginTop: 50,
    borderRadius: 15,
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    backgroundColor: 'gray',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  buttonContainer: {
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  profilePhotoHolder: {
    marginVertical: 20,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'white',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 20,
    margin: 10,
    marginTop: 14,
  },
  shareMyProfileIcon: {
    width: 40,
    height: 40,
    marginTop: 10,
  },
  shareProfileText: {
    fontSize: 25,
    color: 'black',
  },
  shareMyProfileIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: '#48d1cc',
  },
});

export default ProfileScreen;
