import { makeStyles } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: theme.spacing(2),
        transition: theme.transitions.create([ 'margin', 'width' ], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create([ 'margin', 'width' ], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    toolBar: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: 1170
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    link: {
        textDecoration: 'none !important',
        color: 'unset !important',
        '&:hover': {
            color: 'rgba(255,255,255,.75)!important',
        }
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    authLink: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    navMenu:{
        display:'flex',
        // justifyContent:'center',
        flexWrap: 'nowrap',
        flexGrow: 1
    },
    nawAuthMenu:{
        display:'flex',
        // justifyContent:'flex-end',
        flexWrap: 'nowrap',
    }
}));

export default useStyles;