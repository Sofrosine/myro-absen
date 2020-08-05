import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  Linking,
} from 'react-native';
import {Gap, Header, Badge} from '../../components';
import {colors, fonts, getData} from '../../utils';
import {CardList} from '../../components';
import Axios from 'axios';
import {URL} from '../../config';
import OneSignal from 'react-native-onesignal';

const Home = ({navigation}) => {
  const [open, setOpen] = useState(true);
  const [data, setData] = useState({});
  const [completedTask, setCompletedTask] = useState([]);
  const [openTask, setOpenTask] = useState([]);
  const [count, setCount] = useState(0);

  const onOpened = data => {
    // navigation.navigate('TaskDetail', {
    //   id: data.notification.payload.launchURL.slice(18),
    //   status: 'Opened',
    // });
    Linking.openURL(data.notification.payload.launchURL);
  };
  OneSignal.addEventListener('opened', onOpened);

  useEffect(() => {
    return () => OneSignal.addEventListener('opened', onOpened);
  }, []);

  const getTaskOpen = async id => {
    const response = await Axios.get(
      `${URL.apiURL}task?status=open&technician_id=${id}`,
    );
    setOpenTask(response.data.rows);
    console.log('response', response);
  };

  const getTaskCompleted = async id => {
    const response = await Axios.get(
      `${URL.apiURL}task?status=all&technician_id=${id}`,
    );
    setCompletedTask(response.data.rows);
    console.log('response', response);
  };

  const handleOpen = async () => {
    setOpen(true);
    const data = await getData('@profile');
    await getTaskOpen(data.id);
  };
  const handleCompleted = async () => {
    setOpen(false);
    const data = await getData('@profile');
    const result = await getTaskCompleted(data.id);
    console.log('res', result);
  };

  const setStorage = async () => {
    const data = await getData('@profile');
    await setData(data);
    await getTaskOpen(data.id);
    await getTaskCompleted(data.id);
    setCount(1);
    console.log('xixi');
  };

  count ? null : setStorage();

  useEffect(() => {
    setStorage();
  }, []);

  const sendNotification = (data, name) => {
    let headers = {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: 'Basic YzkzYWJhZDYtMDYwMi00ZDkyLWIzYWUtOGMyZGFhYzUzNjI5',
    };

    let endpoint = 'https://onesignal.com/api/v1/notifications';

    let params = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        app_id: '342a5202-f3b9-4088-8804-3741f29d4cce',
        include_player_ids: ['0d6ecc23-1c9e-481c-bd0a-30e57de5dbfe'],
        priority: 10,
        contents: {en: 'Hello'},
        headings: {en: 'SOultan'},
      }),
    };
    fetch(endpoint, params).then(res =>
      res.headers.forEach(function(value, key) {
        console.log('[' + key + '] = ' + value);
      }),
    );
  };

  const badgeColor = status => {
    switch (status) {
      case 'Completed':
        return styles.tabOn;
      case 'Pending':
        return styles.tabPending;
      case 'Canceled':
        return styles.tabCancel;
      default:
        break;
    }
  };

  return (
    <View style={styles.page}>
      <Header
        onPress={() => navigation.navigate('UpdateProfile')}
        // onPress={sendNotification}
        type="title-text"
        text={data.name}
      />
      <Gap height={8} />
      <View style={styles.content}>
        <View style={styles.tabContainer}>
          <TouchableHighlight
            underlayColor={colors.background}
            onPress={handleOpen}
            style={open ? styles.tabOn : styles.tabOff}>
            <View>
              <View style={{position: 'absolute', top: -20, right: -40}}>
                <Badge type="notification" text={openTask.length} />
              </View>
              <Text style={open ? styles.tabTextOn : styles.tabTextOff}>
                Open
              </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={colors.background}
            onPress={handleCompleted}
            style={!open ? styles.tabOn : styles.tabOff}>
            <Text style={!open ? styles.tabTextOn : styles.tabTextOff}>
              Finished
            </Text>
          </TouchableHighlight>
        </View>
        <Gap height={20} />

        <ScrollView showsVerticalScrollIndicator={false}>
          {open &&
            openTask.map((item, key) => {
              return (
                <View key={key}>
                  <CardList
                    date={item.datein}
                    name={item.customer_name}
                    address={item.customer_address}
                    job={item.task_type}
                    onPress={() =>
                      navigation.navigate('TaskDetail', {
                        id: item.task_id,
                        status: 'Open',
                      })
                    }
                  />
                  <Gap height={24} />
                </View>
              );
            })}
          {!open &&
            completedTask.map((item, key) => {
              return (
                <View key={key}>
                  <CardList
                    date={item.startdate}
                    name={item.customer_name}
                    address={item.customer_address}
                    job={item.task_type}
                    status={item.status}
                    onPress={() =>
                      navigation.navigate('TaskDetail', {
                        id: item.task_id,
                        status: item.status,
                      })
                    }
                  />
                  <Gap height={24} />
                </View>
              );
            })}
        </ScrollView>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 14,
  },
  tabContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  tabOn: {
    backgroundColor: colors.button.secondary.active.background,
    paddingVertical: 10,
    width: 122,
    borderRadius: 122 / 2,
    alignItems: 'center',
  },
  tabOff: {
    backgroundColor: colors.button.secondary.inactive.background,
    paddingVertical: 10,
    width: 122,
    borderRadius: 122 / 2,
    alignItems: 'center',
  },
  tabTextOn: {
    fontFamily: fonts.primary.bold,
    fontSize: 15,
    color: colors.button.secondary.active.text,
  },
  tabTextOff: {
    fontFamily: fonts.primary.bold,
    fontSize: 15,
    color: colors.button.secondary.inactive.text,
  },
});
