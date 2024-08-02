import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const DayTwo = () => {
  return (
    <View style={styles.mainView}>
      <View style={styles.secondView}>
        <View style={styles.tickholder}>
          <Text style={styles.tick}>✓</Text>
        </View>
        <Text style={styles.heading}>Success</Text>
        <Text style={styles.subHeading}>
          Your message was sent successfully,{'\n'} please check your mail to
          confirm.
        </Text>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Continue</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    height: '100%',
    width: '100%',
    backgroundColor: '#ffe5b4',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  secondView: {
    width: '90%',
    height: '97%',
    backgroundColor: 'white',
    borderRadius: 40,
  },
  tickholder: {
    width: 200,
    height: 200,
    backgroundColor: '#ffe5b4',
    alignSelf: 'center',
    borderRadius: 100,
    marginTop: 90,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 50,
    color: 'black',
    alignSelf: 'center',
    fontWeight: '800',
    marginTop: 30,
  },
  subHeading: {
    fontSize: 17,
    color: 'grey',
    alignSelf: 'center',
    fontWeight: '400',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#FF4500',
    padding: 10,
    borderRadius: 15,
    height: 50,
    width: 350,
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 310,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    alignItems: 'center',
    fontWeight: '800',
  },
  tick: {
    fontSize: 140,
    color: '#FF4500',
  },
});

export default DayTwo;
