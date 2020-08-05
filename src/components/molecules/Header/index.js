import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {ICArrowLeft} from '../../../assets';
import {fonts, colors} from '../../../utils';

const Header = ({onPress, type, title, text}) => {
  if (type === 'title-text') {
    return (
      <View style={styles.containerTitleText}>
        <Text style={styles.title}>ToDo List</Text>
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconWrapper} onPress={onPress}>
        <ICArrowLeft />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    padding: 18,
  },
  containerTitleText: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    padding: 14,
  },
  iconWrapper: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 34,
    fontFamily: fonts.primary.bold,
  },
  text: {
    fontSize: 16,
    fontFamily: fonts.primary.normal,
    color: colors.button.secondary.active.text,
  },
});
