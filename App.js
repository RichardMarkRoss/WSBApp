import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import { WebView } from 'react-native-webview';

export default function App() {
  const [externalUrl, setExternalUrl] = useState(null);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const checkNetworkStatus = async () => {
      try {
        const response = await fetch('https://m.worldsportsbetting.co.za'); // You can change the URL to any reliable one
        setIsOnline(response.status === 200);
      } catch (error) {
        setIsOnline(false);
      }
    };
    checkNetworkStatus();
  }, []);

  const handleNavigationStateChange = (navState) => {
    if (navState.url || !navState.url.includes('worldsportsbetting')) {
      Linking.openURL(navState.url)
        .then(() => setExternalUrl(navState.url))
        .catch((error) => console.error('Error opening URL: ', error));a
    }
  };

  return (
    <View style={styles.container}>
      {isOnline ? (
        <WebComponent handleNavigationStateChange={handleNavigationStateChange} />
      ) : (
        <OfflineScreen />
      )}
    </View>
  );
}

// const WebComponent = ({ handleNavigationStateChange }) => {
//   return (
//     <WebView
//       source={{ uri: 'https://m.worldsportsbetting.co.za' }}
//       ignoreSslError={true}
//       thirdPartyCookiesEnabled={true}
//       geolocationEnabled={true}
//       allowFileAccess={true}
//       useWebKit={true}
//       onNavigationStateChange={handleNavigationStateChange}
//       injectedJavaScript={`
//         document.body.style.overscrollBehavior = 'none';
//       `}
//     />
//   );
// };


const WebComponent = () => {
  return (
    <WebView
      source={{ uri: 'https://m.worldsportsbetting.co.za' }}
      onError={error => {
        <OfflineScreen/>
      }}
      injectedJavaScript={`
        document.body.style.overscrollBehavior = 'none';
      `}
    />
  );
};

const OfflineScreen = () => {
  return (
    <WebView
      source={{ uri: 'https://wsb.datafree.co/logindf.php' }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  offlineContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  offlineText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
