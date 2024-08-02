import {Text} from 'react-native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

type FriendsAndFamilyDetailsProps = {
  route: any;
  navigation?: any;
};

const FriendsAndFamilyDetails = (props: FriendsAndFamilyDetailsProps) => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        console.log('Fetched Data:', response.data);
        setData(response.data);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  };
  const renderItem = ({item}: {item: any}) => {
    return (
      <View style={styles.detailsContainer}>
        <View style={{width: '100%'}}>
          <Text>{'Name: ' + item.name}</Text>
          <Text>{'Username: ' + item.username}</Text>
          <Text>{'Email Address: ' + item.email}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({item}) => renderItem({item})}
        keyExtractor={item => item.id.toString()}
        style={{width: '100%'}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dataText: {
    textAlign: 'center',
  },
  detailsContainer: {
    height: 90,
    width: '90%',
    margin: 10,
    backgroundColor: 'yellow',
  },
});

export default FriendsAndFamilyDetails;
