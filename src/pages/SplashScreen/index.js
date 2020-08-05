import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {getData} from '../../utils';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    const loadData = async () => {
      const data = await getData('@profile');
      if (data) {
        navigation.replace('Home');
      } else {
        navigation.replace('Login');
      }
    };
    loadData();
  });
  return (
    <View>
      <Text />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
