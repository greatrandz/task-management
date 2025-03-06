import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { connect, ConnectedProps, useStore, } from 'react-redux'
import {StackActions ,useNavigation, DrawerActions, useFocusEffect, CommonActions} from '@react-navigation/native'

import Menu from './Menu'
import { Alert } from 'react-native'

interface MenuProviderProps {
    children: React.ReactElement
}

interface MenuContextValue {
    data: any
}

const MenuContext = createContext<MenuContextValue>({
    data: []
})

const MenuProvider = ({ children }: MenuProviderProps) =>  {
    const navigation = useNavigation()

    const value = {
        data: []
    }

    return (
        <MenuContext.Provider value={value}>
            {children}
        </MenuContext.Provider>
    )
}

export const useMenuContext = () => useContext(MenuContext)

export default MenuProvider

