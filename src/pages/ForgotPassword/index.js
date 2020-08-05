import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../utils';
import {Button, Gap} from '../../components';
import {ICArrowLeft, ILWhatsapp, ILCall} from '../../assets';

const ForgotPassword = ({navigation}) => {
  return (
    <View style={styles.page}>
      <Button
        onPress={() => navigation.goBack()}
        type="icon-only"
        icon={ICArrowLeft}
      />
      <View style={styles.content}>
        <Text style={styles.text}>Please Contact Us</Text>
        <View style={styles.buttonContainer}>
          <Button type="image-only" image={ILCall} />
          <Gap width={74} />
          <Button type="image-only" image={ILWhatsapp} />
        </View>
      </View>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 18,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontFamily: fonts.primary.normal,
    color: colors.secondary,
    marginBottom: 47,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
});
