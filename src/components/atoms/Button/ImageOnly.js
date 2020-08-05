import React from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';

const ImageOnly = ({image, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={image} style={styles.image} />
    </TouchableOpacity>
  );
};

export default ImageOnly;

const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
  },
});
