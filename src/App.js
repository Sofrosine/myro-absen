import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Router from './router';

import OneSignal from 'react-native-onesignal'; // Import package from node modules
import {storeData} from './utils';
import {Linking, Text} from 'react-native';
import {Loading} from './components';

export default class App extends Component {
  constructor(properties) {
    super(properties);
    //Remove this method to stop OneSignal Debugging
    OneSignal.setLogLevel(6, 0);

    // Replace 'YOUR_ONESIGNAL_APP_ID' with your OneSignal App ID.
    OneSignal.init('342a5202-f3b9-4088-8804-3741f29d4cce', {
      kOSSettingsKeyAutoPrompt: false,
      kOSSettingsKeyInAppLaunchURL: false,
      kOSSettingsKeyInFocusDisplayOption: 2,
    });
    OneSignal.inFocusDisplaying(2); // Controls what should happen if a notification is received while the app is open. 2 means that the notification will go directly to the device's notification center.
    OneSignal.enableVibrate(true);
    OneSignal.enableSound(true);

    // The promptForPushNotifications function code will show the iOS push notification prompt. We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step below)
    OneSignal.promptForPushNotificationsWithUserResponse(myiOSPromptCallback);

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }
  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log('Notification received: ', notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
    // this.navigation.navigate('TaskDetail');
  }

  onIds(device) {
    console.log('Device info: ', device);
    storeData('@fcm_token', device.userId);
  }

  render() {
    const linking = {
      prefixes: ['https://google.com', 'myro://'],
      config: {
        TaskDetail: {
          path: 'taskdetail/:id/:status',
          params: {
            id: Number,
            status: 'Open',
          },
        },
      },
    };
    return (
      <NavigationContainer linking={linking} fallback={<Loading />}>
        <Router />
      </NavigationContainer>
    );
  }
}
function myiOSPromptCallback(permission) {
  // do something with permission value
}
