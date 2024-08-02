import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

type ProfilerProps = {
  name: string;
};

type ProfileState = {
  age: number;
  DOB: string;
};

class ProfileScreen extends React.Component<ProfilerProps, ProfileState> {
  constructor(props: ProfilerProps) {
    super(props);
    this.state = {age: 10, DOB: '29/06/1990'};
    this.updateAge = this.updateAge.bind(this);
    this.updateDOB = this.updateDOB.bind(this);
  }

  componentDidMount(): void {
    console.log('Loaded Class Component');
  }

  componentWillUnmount(): void {
    console.log('Unloaded Class Component');
  }

  fetchUserList() {
    console.log('FETCHING the DATA');
  }

  updateAge() {
    this.setState({
      age: 95,
    });
  }
  updateDOB() {
    this.setState({
      DOB: '20/06/1995',
    });
  }

  render() {
    return (
      <View style={styles.mainView}>
        <Text style={styles.ageText}>{this.state.age}</Text>
        <Button title="Update Age" onPress={this.updateAge}></Button>
        <Text style={styles.dobText}>{this.state.DOB}</Text>
        <Button title="Update DOB" onPress={this.updateDOB}></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#FFFFE0',
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: '700',
    color: 'black',
  },
  ageText: {
    color: 'black',
    fontSize: 24,
    margin: 10,
  },
  dobText: {
    color: 'black',
    fontSize: 24,
    margin: 10,
  },
});

export default ProfileScreen;
