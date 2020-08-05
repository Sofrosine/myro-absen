import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import {colors, fonts} from '../../../utils';
import IconOnly from './IconOnly';
import ImageOnly from './ImageOnly';

const Button = ({
  onPress,
  text,
  type,
  position = 'flex-start',
  icon,
  image,
}) => {
  if (type === 'image-only') {
    return <ImageOnly image={image} onPress={onPress} />;
  }

  if (type === 'icon-only') {
    return <IconOnly Icon={icon} onPress={onPress} />;
  }

  if (type === 'text-only') {
    return (
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.textBlack(position)}>{text}</Text>
      </TouchableOpacity>
    );
  }

  if (type === 'update') {
    return (
      <TouchableHighlight
        onPress={onPress}
        style={[styles.container, {backgroundColor: colors.quaternary}]}
        underlayColor={colors.badge.tersiary.background}>
        <Text style={styles.text}>{text}</Text>
      </TouchableHighlight>
    );
  }

  return (
    <TouchableHighlight
      onPress={onPress}
      style={styles.container}
      underlayColor={colors.button.primary.clicked}>
      <Text style={styles.text}>{text}</Text>
    </TouchableHighlight>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.button.primary.background,
    borderRadius: 25,
    paddingVertical: 14,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: fonts.primary.boldItalic,
    color: colors.button.primary.text,
    fontSize: 17,
  },
  textBlack: position => ({
    fontFamily: fonts.primary.normal,
    color: colors.secondary,
    fontSize: 15,
    alignSelf: position,
  }),
});
