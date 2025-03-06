import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Colors } from '../../styles'
import { Dimensions, PixelRatio, StyleSheet, Platform } from  'react-native'
import { CreateResponsiveStyle, DEVICE_SIZES } from 'rn-responsive-styles'
const { width, height } = Dimensions.get('window');

const styles = CreateResponsiveStyle({
    safeArea: {
        backgroundColor: Colors.red,
    },
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        justifyContent: 'space-around',
    },
    drawerHeader: {
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    drawerHeaderText: {
        marginLeft: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
    activeDrawerItem: {
        left: -15,
        width: '115%',
        borderRadius: 0,
        backgroundColor: '#f5f7fa', //'#e1f5fe'
    },
    inactiveDrawerItem: {
        left: -15,
        width: '115%',
        borderRadius: 0,
    },
})

export default styles