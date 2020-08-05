import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '../../../utils';

const Divider = ({top, bottom}) => {
  return (
    <View style={[styles.divider, {marginTop: top, marginBottom: bottom}]} />
  );
};

export default Divider;

const styles = StyleSheet.create({
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderOn,
  },
});
