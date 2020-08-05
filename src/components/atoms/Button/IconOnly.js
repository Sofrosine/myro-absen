import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

const IconOnly = ({Icon, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon />
    </TouchableOpacity>
  );
};

export default IconOnly;

const styles = StyleSheet.create({});
