import React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function App() {
    return (
        <View style={styles.container}>
            <WebComponent style={styles.container} />
        </View>
    );
}

const WebComponent = () => {
    return <WebView source={{ uri: 'https://m.worldsportsbetting.co.za/' }} />
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});