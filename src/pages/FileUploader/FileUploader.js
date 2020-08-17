/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Helmet from 'react-helmet';

import { DropzoneDialog } from 'material-ui-dropzone'
import { Button, Typography, Container, Box } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import STORAGE from '../../helpers/storage';

import Preloader from '../../components/Preloader';
import Navbar from '../../components/Navbar';
import Copyright from '../../components/Copyright';

import { history } from '../../helpers/history';
import { RoutesUrls } from '../../configs/RoutesUrls';

import { openDropzone, closeDropzone, savingFiles, clearAlert } from '../../store/actions/fileUploadAction';

import useStyles from './styles';

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

const FileUploader = React.memo(() => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const isFetching = useSelector(store => store.toggleIsFetchingReducer.isFetching);

    const stateUpload = useSelector(store => store.fileUploadReducer);

    const storageToken = STORAGE.getItem('accessToken');

    useEffect(() => {
        dispatch(clearAlert());

        if (!storageToken) {
            history.push(RoutesUrls.login);
        }
    }, []);

    const handleOpen = () => {
        dispatch(openDropzone());
    };

    const handleClose = () => {
        dispatch(closeDropzone());
    };

    const handleSave = (files) => {
        dispatch(savingFiles(files));
    }
    return (
        <>
            {isFetching ? <Preloader /> : null}
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
                    open={stateUpload.open}
                    onSave={handleSave}
                    filesLimit={4}
                    acceptedFiles={acceptedFiles}
                    showPreviews={true}
                    maxFileSize={3000000}
                    onClose={handleClose}
                    showFileNames={true}
                    showAlerts={true}
                    showFileNamesInPreview={true}
                    dialogTitle={'Upload image and file'}
                    dropzoneText={'Drag and drop a file  and image here or click'}
                />

                {(stateUpload.serverError)
                    ? <div className={classes.root}>
                        <Alert severity="error">
                            <AlertTitle>Error</AlertTitle>
                            Server error — <strong>{stateUpload.serverError}</strong>
                        </Alert>
                    </div>
                    : null
                }

                {(stateUpload.serverResponse)
                    ? <div className={classes.root}>
                        <Alert severity="success">
                            <AlertTitle>Success</AlertTitle>
                            <p><strong>Saved files — </strong>{stateUpload.saved}</p>

                            {(stateUpload.rejected !== '')
                                ? <>
                                    <p><strong>Rejected files — </strong>{stateUpload.rejected}</p>
                                    <p><strong>Reason for rejection — </strong>{stateUpload.reason}</p>
                                </>
                                : null
                            }
                        </Alert>
                    </div>
                    : null
                }
            </Container>
            <Copyright />
        </>
    );
});

export default FileUploader;
