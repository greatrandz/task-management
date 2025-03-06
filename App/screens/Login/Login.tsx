import React, { useState } from 'react';
import images from '@assets/index'
import {
    Image,
    View,
    Dimensions,
    SafeAreaView,
    ScrollView,
} from  'react-native'
const { width, height } = Dimensions.get('window');
import useStyles from './Styles'
import LoginProvider from './LoginProvider';

import { TextInput, Button, Text, Card, Title, Provider as ThemeProvider, DefaultTheme } from 'react-native-paper'

const customTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#007BFF', // Change primary color to blue
      background: '#f5f7fa', // Set the background color
      surface: '#ffffff', // White surface for card components
      text: '#333333', // Set default text color
      placeholder: '#aaa', // Placeholder color
      accent: '#FF5733', // Accent color (optional)
    },
    roundness: 8, // Change the border-radius globally for all components
};

const Login = () =>{
    const styles = useStyles()

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Implement login logic here
        console.log('Logging in with:', username, password);
    };

    return(
        <LoginProvider>
            <ThemeProvider theme={customTheme}>
                <ScrollView style={styles.scrollview}>
                    <SafeAreaView style={styles.container}>
                        <View style={styles.leftContainer}>
                            <Image resizeMode={'contain'} source={images.bg_login} 
                                    style={{ width: '100%', height:800, }} />
                        </View>
                        <View style={styles.rightContainer}>
                            <Card style={styles.card}>
                                <Card.Content>
                                <Title style={styles.title}>Task Management</Title>

                                <TextInput
                                    label="Username"
                                    value={username}
                                    onChangeText={setUsername}
                                    style={styles.input}
                                    autoCapitalize="none"
                                />

                                <TextInput
                                    label="Password"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry
                                    style={styles.input}
                                />

                                <Button mode="contained" onPress={handleLogin} style={styles.button}>
                                    Log In
                                </Button>

                                <Text style={styles.footerText}>Forgot Password?</Text>
                                </Card.Content>
                            </Card>
                        </View>
                    </SafeAreaView>
                </ScrollView>
            </ThemeProvider>
        </LoginProvider>
    )
}

export default Login