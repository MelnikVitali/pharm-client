import { makeStyles } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow:1,
        display: 'flex',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
        marginBottom: theme.spacing(2)
    },

    appBar: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    // necessary for content to be below app bar
    toolBar:{
        width: '100%',
        maxWidth: 1170,
        display:'flex',
        justifyContent: 'space-between',

    } ,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    title:{
        flexGrow: 1,
    },
    link: {
        width: 'initial',
        textDecoration: 'none !important',
        color: 'unset !important',
    },
    linkColorHover:{
        '&:hover': {
            color: 'rgba(255,255,255,.75)!important',
        }
    },
    linkHome:{
        paddingBottom: 2,
        marginRight: theme.spacing(2),
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
        justifyContent:"flex-start",
        whiteSpace: 'nowrap',
        flexGrow: 1
    },
    nawAuthMenu:{
        display:'flex',
        justifyContent:'flex-end',
        flexWrap: 'nowrap',
    },
    active: {
        color: 'rgba(255,255,255,.75)!important',
        backgroundColor: theme.palette.action.selected,
    },
    activeDrawer:{
        backgroundColor: theme.palette.action.selected,
    },
    list: {
        width: 250,
    },
}));

export default useStyles;
