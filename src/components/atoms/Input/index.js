import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {ICPhone} from '../../../assets';
import {colors, fonts} from '../../../utils';

const Input = ({
  placeholder,
  keyboardType = 'default',
  Icon = ICPhone,
  type,
  onChangeText,
  defaultValue,
  value,
}) => {
  if (type === 'with-icon') {
    return (
      <View>
        <TextInput
          onChangeText={onChangeText}
          style={styles.input(type)}
          placeholder={placeholder}
          keyboardType={keyboardType}
          placeholderTextColor={colors.tersiary}
          defaultValue={defaultValue}
          value={value}
        />
        <Icon style={styles.icon} />
      </View>
    );
  }
  return (
    <View>
      <TextInput
        style={styles.input(type)}
        placeholder={placeholder}
        keyboardType={keyboardType}
        placeholderTextColor={colors.tersiary}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: type => ({
    borderBottomWidth: 1,
    borderColor: colors.borderOn,
    paddingBottom: 7.5,
    paddingLeft: type === 'with-icon' ? 44 : 0,
    fontFamily: fonts.primary.boldItalic,
    fontSize: 15,
  }),
  icon: {
    position: 'absolute',
    top: 14,
    left: 4,
  },
});
