import * as React from 'react'
import RootNavigators from './navigation'
import Toast from 'react-native-toast-message';
import { View, Text } from 'react-native'
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
  return (
    <>
        <RootNavigators />
        <Toast config={toastConfig} />
    </>
  )
}

// export default App
// export default App
