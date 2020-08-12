/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Helmet from 'react-helmet';

import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ZoomIn } from '@material-ui/icons';

import Preloader from '../../components/Preloader';
import Navbar from '../../components/Navbar';
import Copyright from '../../components/Copyright';

import { deleteImage, getImages } from '../../store/actions/imageAction';

import { RoutesUrls } from '../../configs/RoutesUrls';

import STORAGE from '../../helpers/storage';

import useStyles from './style';

const initialState = {
    open: false,
    currentImg: '',
    currentImgId: '',
    imageName:''
};

const Gallery = ({ history }) => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const images = useSelector(store => store.imageReducer.images);
    const isFetching = useSelector(store => store.toggleIsFetchingReducer.isFetching);

    const [ state, setState ] = useState(initialState);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const storageToken = STORAGE.getItem('accessToken');

    useEffect(() => {
        if (!storageToken) {
            history.push(RoutesUrls.login);
        }

        dispatch(getImages());
    }, [ dispatch, storageToken, history ]);

    const onDeleteImage = () => {
        dispatch(deleteImage(state.currentImgId));

        setState({
            ...state,
            open: false,
            currentImg: '',
            currentImgId: '',
            imageName: ''
        });
    }

    const handleClickOpen = (img, id, name) => {
        setState({
            ...initialState,
            open: true,
            currentImg: img,
            currentImgId: id,
            imageName: name
        });
    };

    const handleClose = () => {
        setState({
            ...state,
            open: false,
        });
    };

    return (
        <>
            {isFetching ? <Preloader /> : null}
            <Navbar />
            <Helmet>
                <title>Галерея изображений</title>
            </Helmet>
            <Typography variant="h4" align='center' style={{ marginBottom: '1.2rem' }}>
                Галерея изображений
            </Typography>

            {(images && images.length > 0)
                ? (
                    <div className={classes.root}>
                        <GridList cellHeight={200} spacing={1} className={classes.gridList}>
                            {images.map((tile) => (
                                <GridListTile
                                    key={tile.id}
                                    className={classes.tile}
                                    style={{ backgroundImage: `url(${tile.img})` }}
                                >
                                    <GridListTileBar
                                        className={classes.titleBar}
                                        titlePosition="top"
                                        actionIcon={
                                            <IconButton
                                                className={classes.icon}
                                                onClick={() => handleClickOpen(tile.img, tile.id, tile.imageName)}
                                            >
                                                <ZoomIn className={classes.zoom} />
                                            </IconButton>
                                        }
                                    />

                                </GridListTile>
                            ))}
                        </GridList>
                        <Dialog
                            fullScreen={fullScreen}
                            open={state.open}
                            onClose={handleClose}
                            aria-labelledby="responsive-dialog-title"
                        >
                            <DialogTitle className={classes.title}>{state.imageName}</DialogTitle>
                            <DialogContent>
                                <img
                                    src={state.currentImg}
                                    alt="state.originalName"
                                    style={{ width: '100%' }}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button autoFocus onClick={onDeleteImage} color="secondary">
                                    Delete current image
                                </Button>
                                <Button onClick={handleClose} autoFocus color="primary">
                                    Cancel
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                )
                : <Typography
                    variant="h2"
                    gutterBottom
                    align='center'
                    className={classes.subtitle}
                >
                    Нет ни одной картинки
                </Typography>}
            <Copyright />
        </>
    );
};

export default Gallery;
