import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from 'react-native';
import {
  Header,
  Card,
  Gap,
  Input,
  Button,
  Dropdown,
  Loading,
} from '../../components';
import {colors, fonts} from '../../utils';
import {ICNotes, ILCamera} from '../../assets';
import ImagePicker from 'react-native-image-picker';
import {Picker} from '@react-native-community/picker';
import Axios from 'axios';
import {URL} from '../../config';
import GetLocation from 'react-native-get-location';

const UpdateTask = ({navigation, route}) => {
  const [photo, setPhoto] = useState('');
  const [photoDB, setPhotoDB] = useState('');
  const {id} = route.params;
  const [status, setStatus] = useState('Status');
  const [notes, setNotes] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const uploadPhoto = () => {
    ImagePicker.showImagePicker({quality: 0.5}, response => {
      console.log('response', response);
      if (response.didCancel || response.error) {
        Alert.alert('Gagal saat mengupload photo');
      } else {
        const source = {uri: response.uri};
        const base64Photo = `data:${response.type};base64, ${response.data}`;
        setPhoto(source);
        setPhotoDB(base64Photo);
      }
    });
  };

  GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 15000,
  })
    .then(location => {
      console.log('locc', location);
      setLatitude(location.latitude);
      setLongitude(location.longitude);
    })
    .catch(error => {
      const {code, message} = error;
      console.warn(code, message);
    });

  const realStatus = () => {
    switch (status) {
      case 'Open':
        return 1;
      case 'Completed':
        return 2;
      case 'Pending':
        return 3;
      case 'Canceled':
        return 4;
      default:
        break;
    }
  };

  const handleUpdate = async () => {
    if (status === 'Status') {
      return Alert.alert('Mohon lengkapi form terlebih dahulu');
    }
    if (photoDB.length < 1) {
      return Alert.alert('Mohon lengkapi form terlebih dahulu');
    }
    setLoading(true);
    try {
      const response = await Axios.put(`${URL.apiURL}task/update`, {
        task_id: Number(id),
        notes: notes,
        latitude: Number(latitude),
        longitude: Number(longitude),
        status: realStatus(),
        photo_base64: photoDB,
      });
      if (response.status === 200) {
        console.log('succc 200', response);
        ToastAndroid.showWithGravity(
          `${response.data.message}`,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        navigation.replace('Home');
      }
      console.log('succcfg', response);

      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.page}>
      <ScrollView contentContainerStyle={{flex: 1}}>
        <Header onPress={() => navigation.goBack()} />
        <View style={styles.content}>
          <Card>
            <Text style={styles.title}>Update Task</Text>
            <Gap height={58} />
            <View>
              <Dropdown value={status} />
              <View style={{position: 'absolute', bottom: -8, right: 0}}>
                <Picker
                  selectedValue={status}
                  style={{height: 50, width: 20}}
                  onValueChange={(itemValue, itemIndex) =>
                    setStatus(itemValue)
                  }>
                  <Picker.Item label="Open" value="Open" />
                  <Picker.Item label="Complete" value="Completed" />
                  <Picker.Item label="Pending" value="Pending" />
                  <Picker.Item label="Canceled" value="Canceled" />
                </Picker>
              </View>
            </View>

            <Input
              type="with-icon"
              Icon={ICNotes}
              placeholder="Notes"
              onChangeText={setNotes}
            />
            <Gap height={48} />
            {photo.length < 1 ? (
              <Card type="button" onPress={uploadPhoto}>
                <View style={styles.centerWrapper}>
                  <Text style={styles.pictureTitle}>Take a picture</Text>
                  <Gap height={26} />
                  <Image source={ILCamera} style={styles.camera} />
                  <Gap height={20} />
                  <Text style={styles.pictureSubtitle}>
                    Tap here to take a picture or choose image from gallery
                  </Text>
                </View>
              </Card>
            ) : (
              <TouchableOpacity onPress={uploadPhoto}>
                <Image source={photo} style={styles.imageUpload} />
              </TouchableOpacity>
            )}
            <Gap height={42} />
            <Button onPress={handleUpdate} text="Send!" />
            <Gap height={21} />
          </Card>
        </View>
      </ScrollView>
      {isLoading && <Loading />}
    </View>
  );
};

export default UpdateTask;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: 18,
  },
  title: {
    fontFamily: fonts.primary.boldItalic,
    fontSize: 24,
    color: colors.secondary,
    alignSelf: 'center',
  },
  centerWrapper: {
    alignItems: 'center',
  },
  pictureTitle: {
    fontFamily: fonts.primary.boldItalic,
    fontSize: 15,
    color: colors.tersiary,
  },
  camera: {
    width: 53,
    height: 47.55,
  },
  pictureSubtitle: {
    fontFamily: fonts.primary.boldItalic,
    fontSize: 10,
    color: colors.tersiary,
  },
  imageUpload: {
    height: 180,
    width: '100%',
    borderRadius: 5,
  },
});
