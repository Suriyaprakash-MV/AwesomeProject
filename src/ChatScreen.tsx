import {Image} from 'react-native';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {RouteProp, useRoute} from '@react-navigation/native';

type RouteParams = {
  item: {
    title: string;
    description: string;
    imageUrl: string;
  };
};

const ChatScreen = () => {
  const route = useRoute<RouteProp<{params: RouteParams}, 'params'>>();
  const {item} = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.chatHeaderContainer}>
        <Image source={{uri: item.imageUrl}} style={styles.chatImage} />
        <View style={styles.chatHeaderText}>
          <Text style={styles.chatTitle}>{item.title}</Text>
          <Text style={styles.chatDescription}>{item.description}</Text>
        </View>
      </View>
      <View style={styles.todayTextContainer}>
        <Text style={styles.todayText}>Today</Text>
      </View>
      <View style={styles.chatTextInputHolder}>
        <TextInput
          style={styles.chatTextInput}
          placeholder="Type a message..."
          placeholderTextColor="#fff"
        />
      </View>
      <TouchableOpacity style={styles.sendIconContainer}>
        <View>
          <Image
            source={require('../assets/send-message.png')}
            style={styles.sendIconShape}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
  },
  chatHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f9f9f9',
    backgroundColor: '#D3D3D3',
  },
  chatImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  chatHeaderText: {
    marginLeft: 10,
  },
  chatTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  chatDescription: {
    fontSize: 14,
    color: '#666',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  todayTextContainer: {
    width: 68,
    height: 35,
    backgroundColor: '#90EE90',
    borderRadius: 10,
    padding: 2,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  todayText: {
    fontSize: 22,
    color: 'black',
  },
  chatTextInput: {
    height: '100%',
    width: '100%',
    backgroundColor: '#18eef5',
    borderRadius: 15,
    paddingHorizontal: 10,
    color: '#fff',
  },
  chatTextInputHolder: {
    height: 55,
    width: '80%',
    backgroundColor: '#18eef5',
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'absolute',
    bottom: 12,
    left: 10,
    paddingHorizontal: 10,
  },
  sendIconContainer: {
    height: 55,
    width: 55,
    backgroundColor: '#18f522',
    borderRadius: 25,
    padding: 5,
    position: 'absolute',
    bottom: 12,
    right: 16,
  },
  sendIconShape: {
    height: 33,
    width: 33,
    marginTop: 5,
    marginLeft: 7,
  },
});

export default ChatScreen;
