import React, { useEffect } from 'react'
import { Platform } from 'react-native'
import { imageAssets } from "@assets/index";
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import DrawerNavigators from './DrawerNavigors'
import TabNavigators from './DrawerNavigors/TabNavigators'

import Login from '../../../screens/Login'

import { Screen } from '../../routes/mainRoutes'


const styles = StyleSheet.create({
    loadingContainer: {
      flex: 1, 
      paddingTop: 100,
      alignItems: 'center'
    },
    loadingMessage: {
        marginTop: 50,
        paddingHorizontal: '20%',
        textAlign: 'center',
        fontSize: 18,
    },
});

const Stack = createStackNavigator()
const showHeader = false
import { useAuthContext } from "@App/api/AuthProvider"

import LoginProvier from "@App/screens/Login/LoginProvider";
import DashboardProvider from "@App/screens/Dashboard/DashboardProvider";
import MenuProvider from '@App/screens/Menu/MenuProvider'
import TaskProvider from "@App/api/TaskProvider";

const MainNavigator = () => {
    const [loadedAssets, setLoadedAssets] = React.useState(false);
    const { loading, loadingMessage, accessToken } = useAuthContext()

    const handleLoadAssets = async () => {
        try {
            await Promise.all([...imageAssets]);
        } catch (e) {
            console.warn(e);
        } finally {
            setLoadedAssets(true);
        }
    };

    React.useEffect(() => {
        handleLoadAssets();
    }, []);

    if (!loadedAssets || loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size={50} />
                <Text style={styles.loadingMessage}>{loadingMessage}</Text>
            </View>
        )
    }
    
    return accessToken ? (
        <MenuProvider>
            <TaskProvider>
                <DashboardProvider>
                    <Stack.Navigator>
                        <Stack.Screen   name={Screen.DashboardDrawerNavigator} component={Platform.OS ==='web' ? DrawerNavigators : DrawerNavigators} 
                                        options={{
                                            headerShown:showHeader,
                                        }} />
                    </Stack.Navigator>
                </DashboardProvider>
            </TaskProvider>
        </MenuProvider>
    ) : (
        <LoginProvier>
            <Stack.Navigator>
                <Stack.Screen   name={Screen.Login} component={Login} 
                                options={{
                                    headerShown:showHeader,
                                }} />
            </Stack.Navigator>
        </LoginProvier>
    )
}

export default MainNavigator