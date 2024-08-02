import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';

const DetailScreen = () => {
  const [loading, setLoading] = useState(false);
  const [listItem, setListItem] = useState([]);

  useEffect(() => {
    checkFunction();
  }, []);
  const checkFunction = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://reqres.in/api/users', {
        method: 'GET',
        body: {page: '2'},
      });
      const data = await res.json();
      console.log(data);
      setListItem(data.data);
    } catch (error) {
      // console.error(error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#808080" />
      </View>
    );
  }
  return (
    <View>
      <Text style={styles.container}>Hello buddy welcome!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ADD8E6',
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DetailScreen;
