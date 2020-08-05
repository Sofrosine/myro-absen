import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {colors} from '../../../utils';

const Card = ({children, type, onPress}) => {
  if (type === 'transparent') {
    return <View style={styles.container('transparent')}>{children}</View>;
  }

  if (type === 'button') {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={styles.container('normal')}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={styles.container('normal')}>{children}</View>;
};

export default Card;

const styles = StyleSheet.create({
  container: background => ({
    paddingHorizontal: background === 'transparent' ? 40 : 18,
    paddingVertical: 24,
    backgroundColor: background === 'transparent' ? colors.white : colors.white,
    borderRadius: 8,
    elevation: background === 'transparent' ? 1 : 6,
  }),
});
