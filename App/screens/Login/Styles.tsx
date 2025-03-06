import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Colors } from '../../styles'
import { Dimensions, PixelRatio, StyleSheet, Platform } from  'react-native'
import { CreateResponsiveStyle, DEVICE_SIZES } from 'rn-responsive-styles'
const { width, height } = Dimensions.get('window');

const styles = CreateResponsiveStyle({
    scrollview: {
        flex: 1,
        backgroundColor: 'white'
        // backgroundColor: '#f5f7fa',
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
        // backgroundColor: '#f5f7fa',
    },
    leftContainer: {
        flex: 1.2, 
        alignItems: 'center', 
        // backgroundColor: 'white'
    },
    rightContainer: { 
        flex: .8, 
        // alignItems: 'center' 
    },
    card: {
        width: '80%',
        padding: 20,
        borderRadius: 8,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        marginBottom: 10,
    },
    button: {
        marginTop: 20,
    },
    footerText: {
        textAlign: 'center',
        marginTop: 10,
        color: '#007BFF',
        fontWeight: 'bold',
    },
}, 
{
    [DEVICE_SIZES.XL]: {
    },
    [DEVICE_SIZES.LG]: {
    },
    [DEVICE_SIZES.MD]: {
        leftContainer: {
            flex: 1.1, 
        },
        rightContainer: {
            flex: .9, 
        }
    },
    [DEVICE_SIZES.SM]: {
        container: {
            flexDirection: 'column',
        },
        leftContainer: {
            flex: 1, 
            top: 100,
            backgroundColor: 'white', 
            justifyContent: 'center', 
            width: '130%',
        },
        rightContainer: {
            top: Platform.OS === 'web' ? 100 : 150,
            position: 'absolute',
            alignItems: 'center',
            width: '95%',
        }
    },
    [DEVICE_SIZES.XS]: {
        container: {
            flexDirection: 'column',
        },
        leftContainer: {
            flex: 1, 
            top: 100,
            backgroundColor: 'white', 
            justifyContent: 'center', 
            width: '130%',
        },
        rightContainer: {
            top: Platform.OS === 'web' ? 100 : 150,
            position: 'absolute',
            alignItems: 'center',
            width: '95%',
        }
    },
})

export default styles