import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../../utils';

const Badge = ({text, addStyle, status, type}) => {
  if (type === 'notification') {
    return (
      <View style={[styles.notification, addStyle]}>
        <Text style={styles.text}>{text}</Text>
      </View>
    );
  }
  return (
    <View style={[styles.container(status), addStyle]}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default Badge;

const styles = StyleSheet.create({
  container: status => ({
    backgroundColor:
      status === 'Completed'
        ? colors.badge.tersiary.background
        : status === 'Canceled'
        ? colors.button.primary.background
        : status === 'Pending'
        ? colors.tersiary
        : colors.badge.secondary.background,
    width: 120,
    alignItems: 'center',
    paddingVertical: 6,
    borderRadius: 4,
  }),
  notification: {
    backgroundColor: colors.primary,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24 / 2,
  },
  text: {
    fontSize: 14,
    color: colors.white,
    fontFamily: fonts.primary.bold,
    textTransform: 'uppercase',
  },
});
