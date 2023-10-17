import React, { useState } from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import { WebView } from 'react-native-webview';

export default function App() {
  const [externalUrl, setExternalUrl] = useState(null);

  const handleNavigationStateChange = (navState) => {
    if (navState.url && !navState.url.includes('worldsportsbetting')) {
      Linking.openURL(navState.url)
        .then(() => setExternalUrl(navState.url))
        .catch((error) => console.error('Error opening URL: ', error));
    }
  };

  return (
    <View style={styles.container}>
      <WebComponent />
    </View>
  );
}

const WebComponent = () => {
  return (
    <WebView
    source={{ uri: 'https://m.worldsportsbetting.co.za' }}
    ignoreSslError={true}
    thirdPartyCookiesEnabled={true}
    geolocationEnabled={true}
    allowFileAccess={true}
    useWebKit={true}
    onNavigationStateChange={this.handleNavigationStateChange}
    injectedJavaScript={`
      document.body.style.overscrollBehavior = 'none';
    `}
  />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
