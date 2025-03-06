import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Colors } from '../../styles'
import { Dimensions, PixelRatio, StyleSheet } from  'react-native'
import { CreateResponsiveStyle, DEVICE_SIZES } from 'rn-responsive-styles'
const { width, height } = Dimensions.get('window');

const styles = CreateResponsiveStyle({
    container: {
        flex: 1,
        backgroundColor: '#f5f7fa',
        paddingHorizontal: 20,
    },
    cell: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionsHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingRight: 30,
    },
    actionsCell: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    pageText: {
        marginHorizontal: 10,
        fontSize: 16,
    },

    modalDialog: {
        width: '50%',
        marginBottom: 250, 
    }
},
{
    [DEVICE_SIZES.XL]: {
    },
    [DEVICE_SIZES.LG]: {
    },
    [DEVICE_SIZES.MD]: {
    },
    [DEVICE_SIZES.SM]: {
    },
    [DEVICE_SIZES.XS]: {
    },
}
)

export default styles