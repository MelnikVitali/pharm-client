import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Helmet from 'react-helmet';
import axios from 'axios';

import { DropzoneDialog } from 'material-ui-dropzone'
import { Button, Typography, Container, Box } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import { toggleIsFetching } from '../../store/actions/toggleIsFetchingActions';
import STORAGE from '../../helpers/storage';

import Preloader from '../../components/Preloader';
import Navbar from '../../components/Navbar';
import Copyright from '../../components/Copyright';
import Login from '../../components/Login';

import useStyles from './styles';
import { APIUrls } from '../../configs/APIUrls';

const acceptedFiles = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/jpg',
    'application/pdf',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ];

const initialState = {
    open: false,
    files: [],
    serverError: '',
    serverResponse: false,
    saved: '',
    rejected: '',
    reason: 'All files with such names already exist!'
};

const FileUploader = () => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const isFetching = useSelector(store => store.toggleIsFetchingReducer.isFetching);

    const [ state, setState ] = useState(initialState);

    const storageToken = STORAGE.getItem('accessToken');

    const handleOpen = () => {
        setState({
            ...initialState,
            open: true
        });
    };

    const handleClose = () => {
        setState({
            ...state,
            open: false
        });
    };

    const handleSave = async files => {
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        let fd = new FormData();

        files.forEach(file => fd.append('myFiles', file));

        try {
            await dispatch(toggleIsFetching(true));

            const res = await axios.post(`${APIUrls.fileUpload}`, fd, config);

            if (res) {
                dispatch(toggleIsFetching(false));
            }

            const resReject = res.data.rejected && res.data.rejected.map(file => file.fileName);
            const resSave = res.data.saved && res.data.saved.map(file => file.originalName);

            return setState({
                ...state,
                open: false,
                saved: (resSave && resSave.join(', ')) || '',
                rejected: (resReject && resReject.join(', ')) || '',
                reason: 'A file with the same name already exists!',
                serverResponse: true
            });
        } catch (error) {
            console.error(error);

            dispatch(toggleIsFetching(false));

            if (error && error.response && error.response.data) {
                return setState({
                    ...state,
                    open: false,
                    serverError: error.response.data.error || '413 Request Entity Too Large'
                });
            }
        }
    };

    return (
        <>
            {isFetching ? <Preloader /> : null}
            {!storageToken
                ? <Login />
                : (<>
                    <Navbar />
                    <Container component='main' maxWidth='lg' className={classes.root}>
                        <Helmet>
                            <title>Загрузить файлы</title>
                        </Helmet>

                        <Typography variant="h3" align='center'>
                            Upload Image and File
                        </Typography>

                        <Box display="flex" justifyContent="center">
                            <Button
                                variant="contained"
                                color="primary"
                                size="medium"
                                onClick={handleOpen}
                                startIcon={<CloudUploadIcon />}
                            >
                                Add files
                            </Button>
                        </Box>

                        <DropzoneDialog
                            open={state.open}
                            onSave={handleSave}
                            filesLimit={10}
                            acceptedFiles={acceptedFiles}
                            showPreviews={true}
                            maxFileSize={5000000}
                            onClose={handleClose}
                            showFileNames={true}
                            showFileNamesInPreview={true}
                            dialogTitle={'Upload image and file'}
                            dropzoneText={'Drag and drop a file  and image here or click'}
                        />

                        {(state.serverError !== '')
                            ? <div className={classes.root}>
                                <Alert severity="error">
                                    <AlertTitle>Error</AlertTitle>
                                    Server error — <strong>{state.serverError}</strong>
                                </Alert>
                            </div>
                            : null
                        }

                        {(state.serverResponse)
                            ? <div className={classes.root}>
                                <Alert severity="success">
                                    <AlertTitle>Success</AlertTitle>
                                    <p><strong>Saved files — </strong>{state.saved}</p>

                                    {(state.rejected !== '')
                                        ? <>
                                            <p><strong>Rejected files — </strong>{state.rejected}</p>
                                            <p><strong>Reason for rejection — </strong>{state.reason}</p>
                                        </>
                                        : null
                                    }
                                </Alert>
                            </div>
                            : null
                        }
                    </Container>
                    <Copyright />
                </>)
            }
        </>
    );
};

export default FileUploader;
