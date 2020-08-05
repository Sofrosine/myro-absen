import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  ToastAndroid,
  Alert,
} from 'react-native';
import {
  ILHome,
  ICNumber,
  ICUser,
  ICAddress,
  ICEmail,
  ICMobile,
} from '../../assets';
import {Card, Input, Gap, Button, Loading} from '../../components';
import {fonts, colors, useForm, getData} from '../../utils';
import {name as app_name, version as app_version} from '../../../package.json';
import Axios from 'axios';
import {URL} from '../../config';
import AsyncStorage from '@react-native-community/async-storage';

const UpdateProfile = ({navigation}) => {
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(false);

  const getProfile = async () => {
    const profile = await getData('@profile');
    try {
      const result = await Axios.get(
        `${URL.apiURL}technician/profile?technician_id=${profile.id}`,
      );
      if (result.status === 200) {
        await setData(result.data.data);
        console.log('dataaa', data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const changeText = (key, value) => {
    setData({
      ...data,
      [key]: value,
    });
  };

  const handleSubmit = async () => {
    if (data.technician_no === '') {
      return Alert.alert('Input tidak boleh kosong');
    }
    if (data.technician_name === '') {
      return Alert.alert('Input tidak boleh kosong');
    }
    if (data.technician_address === '') {
      return Alert.alert('Input tidak boleh kosong');
    }
    if (data.technician_email === '') {
      return Alert.alert('Input tidak boleh kosong');
    }
    if (data.technician_phone === '') {
      return Alert.alert('Input tidak boleh kosong');
    }
    setLoading(true);
    try {
      const response = await Axios.put(`${URL.apiURL}technician/profile`, data);
      if (response.status === 200) {
        console.log('responseee', response);
        ToastAndroid.showWithGravity(
          `${response.data.message}`,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.replace('Login');
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <View style={{flex: 1}}>
      <View style={styles.pages}>
        <Image source={ILHome} style={styles.imageBg} />
        <Card>
          <Text style={styles.title}>Your Profile</Text>
          <Gap height={40} />
          <View>
            <Input
              placeholder="Technician Number"
              type="with-icon"
              Icon={ICNumber}
              value={data.technician_no}
              onChangeText={value => changeText('technician_no', value)}
            />
            <Gap height={16} />
            <Input
              placeholder="Fullname"
              type="with-icon"
              Icon={ICUser}
              value={data.technician_name}
              onChangeText={value => changeText('technician_name', value)}
            />
            <Gap height={16} />
            <Input
              placeholder="Address"
              type="with-icon"
              Icon={ICAddress}
              value={data.technician_address}
              onChangeText={value => changeText('technician_address', value)}
            />
            <Gap height={16} />
            <Input
              placeholder="Email Address"
              type="with-icon"
              Icon={ICEmail}
              value={data.technician_email}
              onChangeText={value => changeText('technician_email', value)}
            />
            <Gap height={16} />
            <Input
              placeholder="Mobile Phone"
              type="with-icon"
              Icon={ICMobile}
              value={data.technician_phone}
              onChangeText={value => changeText('technician_phone', value)}
            />
          </View>
          <Gap height={64} />
          {isLoading ? (
            <ActivityIndicator color={colors.quaternary} size={32} />
          ) : (
            <Button
              type="update"
              onPress={handleSubmit}
              text="Update Profile"
            />
          )}
        </Card>
      </View>
      <View style={styles.bottomView}>
        <Button type="text-only" text="Logout" onPress={handleLogout} />
        <Gap height={16} />
        <Text style={styles.version}>App Version {app_version}</Text>
      </View>
    </View>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    padding: 24,
  },
  imageBg: {
    position: 'absolute',
    flex: 1,
  },
  title: {
    fontFamily: fonts.primary.bold,
    fontSize: 22,
    color: colors.secondary,
    alignSelf: 'center',
  },
  bottomView: {alignSelf: 'center', alignItems: 'center', marginBottom: 16},
  version: {
    fontFamily: fonts.primary.normal,
    color: colors.tersiary,
  },
});
