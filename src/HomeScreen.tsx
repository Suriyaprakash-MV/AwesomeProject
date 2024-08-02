import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  Dimensions,
  ToastAndroid,
  Alert,
  BackHandler,
  Share,
  Linking,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TextInput} from 'react-native-gesture-handler';
import WebView from 'react-native-webview';

type HomeProps = {
  navigation: any;
};

export type ListData = {
  title: string;
  description: string;
  imageUrl: string;
};

const listData: ListData[] = [
  {
    title: 'Saketh',
    description: 'Alien',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNChJ3OAWzkr40BwRfw9t6hCIKb0_HOCoW0WEJwqOxas2Vs7zoXfXDGqMRsO40Z3SbNTU&usqp=CAU',
  },
  {
    title: 'Aashik',
    description: 'Nothing like anything.',
    imageUrl:
      'https://png.pngtree.com/element_our/20190528/ourmid/pngtree-small-url-icon-opened-on-the-computer-image_1132275.jpg',
  },
  {
    title: 'Maddy',
    description: 'Nothing like anything.',
    imageUrl: 'https://images.unsplash.com/photo-1593642532400-2682810df593',
  },
  {
    title: 'Vikram',
    description: 'Nothing like anything.',
    imageUrl: 'https://images.unsplash.com/photo-1522199710521-72d69614c702',
  },
  {
    title: 'vimal',
    description: 'Nothing like anything.',
    imageUrl: 'https://cdn.esahubble.org/archives/images/screen/potw1740a.jpg',
  },
  {
    title: 'Kamal',
    description: 'Nothing like anything.',
    imageUrl: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0',
  },
  {
    title: 'Anbu',
    description: 'Nothing like anything.',
    imageUrl:
      'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL2xyL3drMTQ4OTY0My1pbWFnZS5qcGc.jpg',
  },
  {
    title: 'Cheriyan',
    description: 'Nothing like anything.',
    imageUrl:
      'https://imagecache.jpl.nasa.gov/images/edu/images/imagerecords/57000/57723/globe_west_2048-640x350.jpg',
  },
  {
    title: 'Vikranth',
    description: 'Nothing like anything.',
    imageUrl: 'https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb',
  },
  {
    title: 'chozhan',
    description: 'Nothing like anything.',
    imageUrl: 'https://images.unsplash.com/photo-1473187983305-f615310e7daa',
  },
];

const HomeScreen = ({navigation}: HomeProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [dropDownVisible, setDropDownVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ListData | null>(null);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState<ListData[]>(listData);
  const [webViewVisible, setWebViewVisible] = useState(false);

  const onItemClick = (item: ListData) => {
    navigation.navigate('ChatScreen', {item});
  };
  const hideModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };
  const navigateToProfileScreen = () => {
    setModalVisible(false);
    navigation.navigate('Profile');
  };

  const signOutAction = async () => {
    Alert.alert(
      'Confirm sign Out',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Ok',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('USERNAME');
              await AsyncStorage.removeItem('PASSWORD');
              console.log('Signed out and credentials removed');
              ToastAndroid.show('Logged out successfully', ToastAndroid.LONG);
              navigation.navigate('Login');
            } catch (error) {
              console.error('Failed to sign out', error);
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  const shareProfile = async () => {
    try {
      await Share.share({
        message:
          "Hey my friend, this is my profile. come, let's connect in the chat  ",
      });
    } catch (error) {
      console.error('Failed to share profile', error);
    }
  };

  const openWebView = () => {
    setWebViewVisible(true);
  };

  const width = Dimensions.get('screen').width;
  const height = Dimensions.get('screen').height;

  const renderItem = ({item}: {item: ListData}) => {
    return (
      <TouchableOpacity
        onPress={() => onItemClick(item)}
        style={styles.itemContainer}>
        <Image source={{uri: item.imageUrl}} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderHeader = () => {
    return (
      <View style={styles.headerFooterContainer}>
        {/* <Text style={styles.headerFooterText}>Your chats</Text> */}
      </View>
    );
  };

  const renderFooter = () => {
    return (
      <View style={styles.headerFooterContainer}>
        <Text style={styles.headerFooterText}>Your chats</Text>
      </View>
    );
  };

  const submit = () => {
    navigation.navigate('Login');
    console.log('Button pressed!');
  };

  const toggleDropdown = () => {
    setDropDownVisible(!dropDownVisible);
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text) {
      const newData = listData.filter(item => {
        const itemData = item.title.toLowerCase();
        const textData = text.toLowerCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
    } else {
      setFilteredData(listData);
    }
  };

  const openMailApp = () => {
    const mailUrl = 'mailto: mmvsuriyaprakash@gmail.com';
    Linking.openURL(mailUrl).catch(Error =>
      console.error('An error occured', Error),
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={toggleDropdown} style={styles.iconButton}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/2040/2040504.png',
            }}
            style={styles.settingsIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerFooterText}>Your chats</Text>
        <View style={styles.topIconContainer}>
          <TouchableOpacity onPress={openWebView}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/4420/4420937.png',
              }}
              style={styles.openBrowserIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={openMailApp}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/646/646094.png',
              }}
              style={styles.linkingMailIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={shareProfile} style={styles.iconButton}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/2901/2901214.png',
              }}
              style={styles.shareIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      {dropDownVisible && (
        <View style={styles.dropdownMenu}>
          <TouchableOpacity
            onPress={() => navigation.navigate('MyProfileDetailScreen')}
            style={styles.dropdownItem}>
            <Text style={styles.dropdownItemText}>My Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('FriendsAndFamilyDetails')}
            style={styles.dropdownItem}>
            <Text style={styles.dropdownItemText}>
              Friends and Family details
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.searchTextInputHolder}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/128/7079/7079548.png',
          }}
          style={styles.searchIcon}
        />
        <TextInput
          value={searchText}
          onChangeText={handleSearch}
          placeholder="Search here..."
        />
      </View>
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={item => item.title}
      />
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={hideModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedItem && (
              <>
                <Image
                  source={{uri: selectedItem.imageUrl}}
                  style={styles.modalImage}
                />
                <Text style={styles.modalTitle}>{selectedItem.title}</Text>
                <Text style={styles.modalDescription}>
                  {selectedItem.description}
                </Text>
                <View style={styles.modalButtonContainer}>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={navigateToProfileScreen}>
                    <Text style={styles.modalButtonOkayText}>Okay</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
      <Modal
        visible={webViewVisible}
        onRequestClose={() => setWebViewVisible(false)}
        transparent={false}>
        <WebView
          source={{uri: 'https://www.google.com'}}
          style={styles.webView}
        />
      </Modal>
      <TouchableOpacity onPress={signOutAction}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6689fc',
  },
  searchBar: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
  },
  searchTextInputHolder: {
    height: 50,
    width: '95%',
    backgroundColor: 'white',
    marginTop: 10,
    borderRadius: 15,
    flexDirection: 'row',
    marginLeft: 10,
    marginBottom: 5,
  },
  topBar: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#6689fc',
  },
  iconButton: {
    padding: 10,
  },
  settingsIcon: {
    width: 30,
    height: 30,
    padding: 10,
  },
  searchIcon: {
    width: 30,
    height: 30,
    margin: 10,
  },
  shareIcon: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  linkingMailIcon: {
    width: 30,
    height: 30,
    marginRight: 2,
  },
  openBrowserIcon: {
    width: 30,
    height: 30,
    marginRight: 22,
  },
  topIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 60,
    left: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    zIndex: 1,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  dropdownItemText: {
    fontSize: 16,
  },
  itemContainer: {
    width: '98%',
    height: 80,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#808080',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginLeft: 20,
  },
  textContainer: {
    width: '70%',
    height: 70,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 21,
    fontWeight: '600',
    color: '#000000',
  },
  description: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
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
  headerFooterContainer: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#6689fc',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  headerFooterText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
  },
  modalOverlay: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '65%',
    height: '35%',
    backgroundColor: '#FFD580',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: 100,
    height: 100,
  },
  modalTitle: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  modalDescription: {
    marginTop: 15,
    fontSize: 18,
    color: 'gray',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    marginTop: 40,
  },
  modalButton: {
    backgroundColor: 'blue',
    marginTop: 10,
    width: 85,
    height: 36,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  modalButtonOkayText: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
  },
  modalButtonSignoutText: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
  },
  signOutText: {
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold',
    alignItems: 'center',
  },
  webView: {
    flex: 1,
  },
});

export default HomeScreen;
