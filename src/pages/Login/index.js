import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  BackHandler,
  Alert,
  ToastAndroid,
  Linking,
} from 'react-native';
import {colors, fonts, storeData, getData} from '../../utils';
import {ILHome, ILLogo, ICPhone} from '../../assets/';
import {Gap, Card, Input, Button, Loading} from '../../components';
import Axios from 'axios';
import {URL} from '../../config';
import GetLocation from 'react-native-get-location';
import OneSignal from 'react-native-onesignal';

const Login = ({navigation}) => {
  const [isLoading, setLoading] = useState(false);
  const [number, setNumber] = useState('');
  const [fcmToken, setFcmToken] = useState('');
  const [location, setLocation] = useState({
    latitude: '',
    longitude: '',
  });

  const onIds = device => {
    console.log('Device info: ', device.userId);
    setFcmToken(device.userId);
  };
  const onOpened = data => {
    console.log('openedkjk', data.notification.payload.launchURL);
    // navigation.navigate('TaskDetail', {
    //   id: data.notification.payload.launchURL.slice(18),
    //   status: 'Opened',
    // });
    Linking.openURL(data.notification.payload.launchURL);
  };
  OneSignal.addEventListener('ids', onIds);
  OneSignal.addEventListener('opened', onOpened);
  useEffect(() => {
    return () => OneSignal.addEventListener('ids', onIds);
  }, []);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await Axios.post(`${URL.apiURL}technician/login`, {
        phone_number: number,
        fcm_token: fcmToken,
        longitude: location.longitude,
        latitude: location.latitude,
      });
      if (response.status === 200) {
        const data = response.data.data;
        console.log('resssaz', response);
        await storeData('@profile', {
          id: data.technician_id,
          no: data.technician_no,
          name: data.technician_name,
          phone: data.technician_phone,
          address: data.technician_address,
        });
        navigation.replace('Home');
      } else {
        ToastAndroid.showWithGravity(
          'Nomor telepon salah atau tidak terdaftar',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      }
      setLoading(false);
    } catch (e) {
      ToastAndroid.showWithGravity(
        'Nomor telepon salah atau tidak terdaftar',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      setLoading(false);
      console.log(e);
    }
  };

  const backAction = () => {
    Alert.alert('Keluar', 'Apakah Anda yakin ingin keluar?', [
      {
        text: 'Tidak',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'Ya', onPress: () => BackHandler.exitApp()},
    ]);
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    // OneSignal.init('342a5202-f3b9-4088-8804-3741f29d4cce', {
    //   kOSSettingsKeyAutoPrompt: false,
    //   kOSSettingsKeyInAppLaunchURL: false,
    //   kOSSettingsKeyInFocusDisplayOption: 2,
    // });
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        console.log('locc', location);
        setLocation({
          latitude: location.latitude,
          longitude: location.longitude,
        });
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, []);

  return (
    <>
      <View style={styles.page}>
        <Image style={styles.background} source={ILHome} />
        <Image style={styles.logo} source={ILLogo} />
        <Gap height={103} />
        <View style={styles.content}>
          <Card type="transparent">
            <Text style={styles.title}>Technician Login</Text>
            <Input
              keyboardType="number-pad"
              type="with-icon"
              placeholder="Phone number"
              Icon={ICPhone}
              onChangeText={val => setNumber(val)}
            />
            <Gap height={56} />
            <Button text="Login" onPress={handleLogin} />
          </Card>
          <Gap height={24} />
          {/* <Button
            onPress={() => navigation.navigate('ForgotPassword')}
            type="text-only"
            text="Forgot your phone number?"
            position="center"
          /> */}
          {/* <Text>{fcmToken}</Text> */}
        </View>
      </View>
      {isLoading && <Loading />}
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 44,
    paddingHorizontal: 16,
  },
  content: {
    flex: 1,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  background: {
    position: 'absolute',
    flex: 1,
  },
  title: {
    fontSize: 23,
    fontFamily: fonts.primary.boldItalic,
    color: colors.secondary,
    alignSelf: 'center',
    marginBottom: 56,
  },
});
