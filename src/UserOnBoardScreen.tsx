import CheckBox from '@react-native-community/checkbox';
import {Picker} from '@react-native-picker/picker';
import React, {useRef, useState} from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';

type userOnBoardScreenProps = {
  route: any;
  navigation: any;
};

const UserOnBoardScreen = (props: userOnBoardScreenProps) => {
  const [mail, setMail] = useState('');
  const [address, setAddress] = useState('');
  const [dob, setDob] = useState(new Date());
  const [carddetails, setCardDetails] = useState('');
  const [restricted, setRestricted] = useState(false);
  const [lang, setLang] = useState();
  const [termsAndConditions, setTermsAndConditions] = useState(false);
  const [privacyPolicy, setPrivacyPolicy] = useState(false);
  const [both, setBoth] = useState(false);
  const [isDateShown, setIsDateShown] = useState(false);

  const validInputs = () => {
    return mail.length > 3 && address.length > 2 && carddetails.length > 2;
  };

  const handleSwitchChange = (value: boolean) => {
    if (validInputs()) {
      setRestricted(value);
    } else {
      Alert.alert('Credentials should be filled properly');
    }
  };

  return (
    <View style={styles.mainView}>
      <TextInput
        style={styles.textInputHolder}
        value={mail}
        onChangeText={setMail}
        placeholder="Enter your Email"
      />
      <TextInput
        style={styles.textInputHolder}
        value={address}
        onChangeText={setAddress}
        placeholder="Enter your Address"
      />
      <TouchableOpacity onPress={() => setIsDateShown(true)}>
        <TextInput
          style={styles.textInputHolder}
          value={dob.toDateString()}
          editable={false}
          placeholder="Enter your DOB"
        />
      </TouchableOpacity>
      <DatePicker
        modal
        open={isDateShown}
        date={dob}
        mode="date"
        onConfirm={date => {
          setDob(date);
          setIsDateShown(false);
        }}
        onCancel={() => {
          setIsDateShown(false);
        }}
      />
      <TextInput
        style={styles.textInputHolder}
        value={carddetails}
        onChangeText={setCardDetails}
        placeholder="Enter your card details for future payment"
      />
      <Picker
        selectedValue={lang}
        onValueChange={(itemValue, itemIndex) => {
          setLang(itemValue);
          console.log('value changed');
        }}
        style={{height: 50, width: 150}}>
        <Picker.Item label="JavaScript" value="js" />
        <Picker.Item label="TypeScript" value="ts" />
        <Picker.Item label="React.js" value="reactjs" />
        <Picker.Item label="React Native" value="reactnative" />
      </Picker>
      <View style={styles.checkBoxContainer}>
        <Text>Terms and conditions</Text>
        <CheckBox
          value={termsAndConditions}
          onValueChange={setTermsAndConditions}
        />
      </View>
      <View style={styles.checkBoxContainer}>
        <Text>Accept Privacy Policy</Text>
        <CheckBox value={privacyPolicy} onValueChange={setPrivacyPolicy} />
      </View>
      <View style={styles.checkBoxContainer}>
        <Text>Accept all</Text>
        <CheckBox
          value={termsAndConditions && privacyPolicy ? true : false}
          onValueChange={() => {
            setTermsAndConditions(!both);
            setPrivacyPolicy(!both);
            setBoth(!both);
          }}
        />
      </View>
      <View style={styles.switchHolder}>
        <Text style={styles.switchHolderText}>Restricted Information only</Text>
        <TouchableOpacity
          onPress={() => {
            if (validInputs()) {
              setRestricted(!restricted);
            } else {
              Alert.alert('Credentials should be filled properly');
            }
          }}>
          <View pointerEvents="none">
            <Switch
              trackColor={{false: '#1B1C1B', true: '#2FE806'}}
              thumbColor={restricted ? '#E512DB' : '#4A2E49'}
              value={restricted}
            />
          </View>
        </TouchableOpacity>
      </View>
      {/* <View style={{marginTop: 20}}>
        <Button title="Open dropdown" onPress={() => {}} />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginLeft: 24,
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
  switchHolderText: {
    color: '#000000',
  },
  switchHolder: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default UserOnBoardScreen;
