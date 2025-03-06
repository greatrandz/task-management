import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Colors } from '../../styles'
import { Dimensions, PixelRatio, StyleSheet } from  'react-native'
import { CreateResponsiveStyle, DEVICE_SIZES } from 'rn-responsive-styles'
const { width, height } = Dimensions.get('window');

const styles = CreateResponsiveStyle({
    container: {
        flex: 1,
        backgroundColor: '#f5f7fa',
        padding: 10,
    },
    paginationControls: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    card: {
        marginBottom: 20,
        borderRadius: 10,
        elevation: 5,
    },
    cardTitle: {
        fontSize: 20,
        marginBottom: 10,
    },
    button: {
        marginTop: 10,
        backgroundColor: '#007BFF',
    },
    gridContainer: {
        flexDirection: 'row',
        // flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    gridCard: {
        width: '22%',
        marginBottom: 10,
        borderRadius: 10,
        elevation: 5,
    },
    iconCardContent: {
        alignItems: 'center',
        padding: 10,
    },
    taskRow: {
        flexDirection: 'row',
        width: '104%',
        left: '-2%',
        paddingHorizontal: '2%',
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
        gridContainer: {
            flexWrap: 'wrap',
        },
        gridCard: {
            width: '48%',
        }
    },
    [DEVICE_SIZES.XS]: {
        gridContainer: {
            flexWrap: 'wrap',
        },
        gridCard: {
            width: '48%',
        }
    },
}
)

export default styles