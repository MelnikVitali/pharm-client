import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {

        width: '100%',
        marginTop: theme.spacing(5),
        '& > * + *': {
            marginTop: theme.spacing(3),
        },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign:'center',
        color:'#3F51B5'
    },
    marginTop:{
        marginTop: theme.spacing(3),
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    textLeft:{
        textAlign:'left'
    }
}));

export default useStyles;