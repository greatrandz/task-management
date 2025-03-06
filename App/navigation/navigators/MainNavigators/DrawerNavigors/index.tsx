import * as React from 'react'
import { useWindowDimensions, Platform, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, useDrawerStatus } from '@react-navigation/drawer';
import TabNavigators from './TabNavigators'
import Dashboard from '../../../../screens/Dashboard'
import Menu from '../../../../screens/Menu'
import Users from '../../../../screens/Users'

import { Screen } from '../../../routes/drawerRoutes'

import Apps from '../../../../../Apps'
const Drawer = createDrawerNavigator()
const Stack = createStackNavigator()

const DrawerNavigator = () => {
    const dimensions = useWindowDimensions();
    const isLargeScreen = dimensions.width >= 768;
    const isWeb = Platform.OS === 'web'
    // const isDrawerOpened = useDrawerStatus() === 'open'

    return (
        <Drawer.Navigator drawerContent={props => <Menu {...props} />}
            screenOptions={{    headerShown: true, 
                                drawerType: isLargeScreen ? 'permanent' : 'front',
                                drawerStyle: { width: isWeb ? 270 : '75%' },
                                // overlayColor: 'transparent',
                            }}>

            <Drawer.Screen name={Screen.Dashboard} component={Dashboard} />
            <Drawer.Screen name={Screen.Users} component={Users} />
        </Drawer.Navigator>
    )
}

export default DrawerNavigator
//https://dev.to/easybuoy/combining-stack-tab-drawer-navigations-in-react-native-with-react-navigation-5-da
