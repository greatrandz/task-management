import React, { useEffect } from 'react'
import { Platform } from 'react-native'

import { createStackNavigator } from '@react-navigation/stack'
import DrawerNavigators from './DrawerNavigors'
import TabNavigators from './DrawerNavigors/TabNavigators'

import Login from '../../../screens/Login'

import { Screen } from '../../routes/mainRoutes'


import Apps from '../../../../Apps';


const Stack = createStackNavigator()
const showHeader = false

const MainNavigator = () => {
    
    return (
        <Stack.Navigator>
            <Stack.Screen   name={Screen.Login} component={Login} 
                            options={{
                                headerShown:showHeader,
                            }} />
            <Stack.Screen   name={Screen.DashboardDrawerNavigator} component={Platform.OS ==='web' ? DrawerNavigators : DrawerNavigators} 
                            options={{
                                headerShown:showHeader,
                            }} />
        </Stack.Navigator>
    )
}

export default MainNavigator