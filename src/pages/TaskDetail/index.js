import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Linking,
  Platform,
  Modal,
} from 'react-native';
import {Header, List, Loading} from '../../components/molecules/';
import {colors, fonts} from '../../utils';
import {ILTaskProgress, ILTaskFinished} from '../../assets';
import {Button, Gap} from '../../components/atoms';
import Axios from 'axios';
import {URL} from '../../config';
import ImageViewer from 'react-native-image-zoom-viewer';
import OneSignal from 'react-native-onesignal';

const TaskDetail = ({navigation, route}) => {
  const {id} = route.params;
  const [data, setData] = useState({});
  const [status, setStatus] = useState('');

  const onOpened = async data => {
    // console.log('openedkjk', data.notification.payload.launchURL);
    // navigation.navigate('TaskDetail', {
    //   id: data.notification.payload.launchURL.slice(18),
    //   status: 'Opened',
    // });
    await navigation.navigate('Home');
    Linking.openURL(data.notification.payload.launchURL);
  };
  OneSignal.addEventListener('opened', onOpened);
  useEffect(() => {
    return () => OneSignal.addEventListener('opened', onOpened);
  }, []);

  const [month, setMonth] = useState('');
  const [endMonth, setEndMonth] = useState('');
  const [dateString, setDateString] = useState('');
  const [endDateString, setEndDateString] = useState('');

  const [year, setYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const [time, setTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [imageVisible, setImageVisible] = useState('');

  const [isLoading, setIsLoading] = useState(true);

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
      console.log('rea;', realMonth);
    } else {
      var realMonth = mlist[someDate.slice(5, 7)];
      setMonth(realMonth);
      console.log(someDate[5]);
      console.log('2', realMonth);
    }
  };
  const convertEndMonth = someDate => {
    if (someDate[5] === '0') {
      var realMonth = mlist[someDate.slice(6, 7)];
      setEndMonth(realMonth);
      console.log('realmonth', realMonth);
    } else {
      var realMonth = mlist[someDate.slice(5, 7)];
      setEndMonth(realMonth);
      console.log('asdasd', someDate[5]);
      console.log('2', realMonth);
    }
  };

  // COMPLETED
  // PENDING
  // CANCELED
  // Ongoing

  const getDetail = async () => {
    try {
      const result = await Axios.get(`${URL.apiURL}task?task_id=${id}`);
      console.log('result', result);
      await setData(result.data.rows[0]);
      await setStatus(result.data.rows[0].status);
      const date = await result.data.rows[0].startdate;
      const endDate = await result.data.rows[0].enddate;
      if (endDate) {
        await convertEndMonth(endDate); //END DATE
        await setEndDateString(endDate.slice(8, 11));
        await setEndYear(endDate.slice(0, 4));
        await setEndTime(endDate.slice(11, 16));
      }
      await convertMonth(date);
      await setDateString(date.slice(8, 11));
      await setYear(date.slice(0, 4));
      await setTime(date.slice(11, 16));
      console.log('yeaaaer', year);
      console.log('dataahh', data);
      console.log('imagee', data.reported_photo_url);
      setIsLoading(false);
    } catch (e) {
      console.log('yo i');
      console.log(e);
      setIsLoading(false);
    }
  };

  const openMap = () => {
    const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
    const latLng = `${data.customer_latitude},${data.customer_longitude}`;
    const label = 'Custom Label';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    Linking.openURL(url);
  };

  useEffect(() => {
    getDetail();
  }, []);

  return (
    <View style={styles.page}>
      <Header onPress={() => navigation.navigate('Home')} />
      <View style={styles.content}>
        <View style={styles.imageTitle}>
          <Image
            source={status === 'Completed' ? ILTaskFinished : ILTaskProgress}
            style={styles.image}
          />
          <Text style={styles.title}>
            Task{' '}
            {status === 'Completed'
              ? 'Completed'
              : status === 'Canceled'
              ? 'Canceled'
              : status === 'Pending'
              ? 'Pending'
              : 'Uncompleted'}
          </Text>
        </View>
        <ScrollView>
          <List
            icon="notification"
            title="Task No."
            subtitle={`#${data.task_no}`}
          />
          <Gap height={5} />
          <List
            icon="star"
            title="Customer Name"
            subtitle={data.customer_name}
          />
          <Gap height={5} />
          <List
            icon="star"
            title="Phone Number"
            type="button"
            subtitle={data.customer_phone}
            onPress={() => Linking.openURL(`tel:${data.customer_phone}`)}
          />
          <Gap height={5} />
          <List
            icon="star"
            title="Address"
            type="button"
            subtitle={data.customer_address}
            onPress={openMap}
          />
          <Gap height={5} />
          <List
            icon="star"
            title="Location Details"
            subtitle={data.customer_address}
          />
          <Gap height={5} />
          <List
            icon="star"
            title="Location Coordinate"
            subtitle="Show on map"
            type="button"
            onPress={openMap}
          />
          <Gap height={5} />
          <List
            icon="notification"
            title="Task Type"
            subtitle={data.task_type}
          />
          <Gap height={5} />
          <List
            icon="star"
            title="Task Started"
            subtitle={`${dateString} ${month} ${year}`}
          />
          <Gap height={5} />
          {status === 'Completed' ? (
            <>
              <List
                icon="star"
                title="Task Completed"
                subtitle={`${endDateString} ${endMonth} ${endYear} @ ${endTime}`}
              />
              <Gap height={5} />
            </>
          ) : null}
          <List icon="star" title="Notes" subtitle={data.notes} />
          <Gap height={5} />
          {status === 'Completed' ? (
            <>
              <List
                onPress={() => setImageVisible(true)}
                icon="star"
                title="Submited Photo"
                subtitle="Tab here to view photo"
                type="button"
              />
              <Gap height={5} />
            </>
          ) : null}
          <Gap height={5} />
        </ScrollView>
        {status === 'Completed' ? null : (
          <View style={styles.buttonWrapper}>
            <Button
              onPress={() =>
                navigation.navigate('UpdateTask', {
                  id: data.task_id,
                  latitude: data.customer_latitude,
                  longitude: data.customer_longitude,
                })
              }
              text="Update Task"
            />
          </View>
        )}
      </View>
      <Modal
        visible={imageVisible}
        transparent={true}
        onRequestClose={() => setImageVisible(false)}>
        <ImageViewer imageUrls={[{url: `${data.reported_photo_url}`}]} />
      </Modal>
      {isLoading && <Loading />}
    </View>
  );
};

export default TaskDetail;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  imageTitle: {
    alignItems: 'center',
  },
  image: {
    width: 84,
    height: 120,
  },
  title: {
    fontFamily: fonts.primary.boldItalic,
    fontSize: 22,
    marginVertical: 14,
  },
  buttonWrapper: {
    padding: 18,
  },
});
