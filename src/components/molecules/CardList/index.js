import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Card, Badge, Gap, Divider} from '../../atoms';
import {ICTimer} from '../../../assets';
import {fonts, colors} from '../../../utils';

const CardList = ({
  name = 'Customer Name',
  job = 'New Instalation',
  date = '20 September 2019',
  address = 'Address Detail',
  status = 'open',
  onPress,
}) => {
  const [month, setMonth] = useState('');
  const [dateString, setDateString] = useState(date.slice(8, 11));
  const [year, setYear] = useState(date.slice(0, 4));
  const [time, setTime] = useState(date.slice(11, 16));

  const mlist = [
    'January',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];

  const convertMonth = someDate => {
    if (someDate[5] === '0') {
      var realMonth = mlist[someDate.slice(6, 7)];
      setMonth(realMonth);
      console.log(realMonth);
    } else {
      var realMonth = mlist[someDate.slice(5, 7)];
      setMonth(realMonth);
      console.log(someDate[5]);
      console.log('2', realMonth);
    }
  };

  useEffect(() => {
    convertMonth(date);
  }, []);

  return (
    <Card onPress={onPress} type="button">
      <Badge text={status} status={status} addStyle={styles.badgeStyle} />
      <Gap height={8} />
      <View style={{flexDirection: 'row'}}>
        <View style={{paddingTop: 2}}>
          <ICTimer />
        </View>
        <Gap width={10} />
        <View>
          <Text style={styles.name}>{name}</Text>
          <Gap height={4} />
          <Text style={styles.detail}>
            {job} - {dateString} {month} {year} @ {time}
          </Text>
        </View>
      </View>
      <Divider top={14} bottom={8} />
      <Text style={styles.detail}>{address}</Text>
    </Card>
  );
};

export default CardList;

const styles = StyleSheet.create({
  badgeStyle: {
    position: 'absolute',
    right: 18,
    top: 14,
  },
  name: {
    fontSize: 16,
    fontFamily: fonts.primary.boldItalic,
    color: colors.secondary,
  },
  detail: {
    fontSize: 16,
    fontFamily: fonts.primary.boldItalic,
    color: colors.tersiary,
  },
});
