import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
// import {RootState,RootDispatch} from '../../redux'
import MainNavigators from './MainNavigators'
import { Screen } from '../routes/rootRoutes'
import Linking from './Linking'
import DashboardProvider from "@App/screens/Dashboard/DashboardProvider";
import { PaperProvider } from 'react-native-paper'
const Stack = createStackNavigator()

// MODAL SCREENS
const RootNavigator = () => {
    const linking = Linking();
    
    return (
        <NavigationContainer linking={linking} >
            <DashboardProvider>
                <Stack.Navigator>
                    <Stack.Group screenOptions={{ headerShown: false, presentation: 'modal' }}>
                        <Stack.Screen name={Screen.MainNavigators} component={MainNavigators} 
                                        options={{
                                        headerShown:false,
                                        }}/>
                    </Stack.Group>
                </Stack.Navigator>
            </DashboardProvider>
        </NavigationContainer>
    )
}

export default RootNavigator
