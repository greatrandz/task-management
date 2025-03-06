import * as React from 'react'
import { imageAssets } from "../assets";
import RootNavigators from './navigation'
import Toast from 'react-native-toast-message';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import Apps from '../Apps';

const toastConfig: any = {
  info: () => {},
  custom: (props: any) => (
    <View style={{ flex: 1, width: '95%', justifyContent: 'center', paddingVertical: 15, paddingHorizontal: 20, backgroundColor: 'black', borderRadius: 5, }}>
      <Text style={{ color: 'white', fontSize: 16,  }}>
        {props.text1}
      </Text>
    </View>
  )
};

export default function App() {
  const [loaded, setLoaded] = React.useState(false);

  const handleLoadAssets = async () => {
    try {
      await Promise.all([...imageAssets]);
    } catch (e) {
      console.warn(e);
    } finally {
      setLoaded(true);
    }
  };

  React.useEffect(() => {
    handleLoadAssets();
  }, []);

  if (!loaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={50} />
      </View>
    )
  }

  return (
    <>
        <RootNavigators />
        <Toast config={toastConfig} />
    </>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1, 
    paddingTop: 100
  },
});

// export default App
// export default App
