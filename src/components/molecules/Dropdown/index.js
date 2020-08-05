import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Animated} from 'react-native';
import {ICStatus, ICChevronDown} from '../../../assets';
import {colors, fonts} from '../../../utils';
import {Gap} from '../../atoms';

const Dropdown = ({onPress, children, value}) => {
  return (
    <View style={styles.container}>
      <ICStatus />
      <Gap width={22} />
      <Text style={styles.text}>{value}</Text>
    </View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderOn,
    flexDirection: 'row',
    paddingBottom: 9,
  },
  text: {
    flex: 1,
    fontFamily: fonts.primary.boldItalic,
    fontSize: 15,
    color: colors.tersiary,
  },
  dropdown: {
    backgroundColor: colors.white,
    elevation: 4,
    width: 150,
    padding: 8,
    top: 10,
    position: 'absolute',
    zIndex: 9999,
    right: 0,
  },
  value: {
    fontFamily: fonts.primary.normal,
    fontSize: 16,
    color: colors.secondary,
  },
});
