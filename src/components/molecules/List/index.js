import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {ICNotification, ICChevronRight, ICStar} from '../../../assets';
import {Gap} from '../../atoms';
import {fonts, colors} from '../../../utils';

const List = ({type, onPress, title, subtitle, icon}) => {
  if (type === 'button') {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={onPress} style={styles.content}>
          {icon === 'notification' ? <ICNotification /> : <ICStar />}
          <Gap width={14} />
          <View style={{flex: 1}}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>
          <ICChevronRight />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {icon === 'notification' ? <ICNotification /> : <ICStar />}
        <Gap width={14} />
        <View style={{flex: 1}}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </View>
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    marginHorizontal: 18,
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderOn,
  },
  title: {
    fontFamily: fonts.primary.boldItalic,
    fontSize: 17,
    color: colors.secondary,
  },
  subtitle: {
    fontFamily: fonts.primary.boldItalic,
    fontSize: 15,
    color: colors.tersiary,
  },
});
