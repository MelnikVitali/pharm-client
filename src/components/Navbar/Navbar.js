import React, { useState, useEffect } from 'react';
import { NavLink as Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import clsx from 'clsx';

import {
    AppBar, Toolbar, Typography,
    Drawer, Hidden, Divider,
    List, ListItem, ListItemIcon,
    ListItemText, Avatar, IconButton
} from '@material-ui/core';

import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import DescriptionIcon from '@material-ui/icons/Description';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import STORAGE from '../../helpers/storage';

import { RoutesUrls } from '../../configs/RoutesUrls';

import useStyles from './styles';

const storageToken = STORAGE.getItem('accessToken');



const Navbar = (props) => {
    const { window } = props;
    const classes = useStyles();

    const user = useSelector(state => state.authReducer.user);

    const [ drawerOpen, setDrawerOpen ] = useState(false);

    const storageToken = STORAGE.getItem('accessToken');

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const drawerList = (
        <div className={classes.list}
             role="presentation"
             onClick={toggleDrawer(false)}
             onKeyDown={toggleDrawer(false)}
        >
            <Divider />
            <List>
                <ListItem
                    component={Link}
                    to={RoutesUrls.homePage}
                    className={classes.link}
                    button
                >
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary='Home' />
                </ListItem>
                <ListItem
                    component={Link}
                    to={RoutesUrls.addPost}
                    className={classes.link}
                    button
                >
                    <ListItemIcon>
                        <DescriptionIcon />
                    </ListItemIcon>
                    <ListItemText primary='Добавить статью' />
                </ListItem>
                <ListItem
                    component={Link}
                    to={RoutesUrls.fileUpload}
                    className={classes.link}
                    button
                >
                    <ListItemIcon>
                        <CloudDownloadIcon />
                    </ListItemIcon>
                    <ListItemText primary='Загрузить файлы' />
                </ListItem>
                <ListItem
                    component={Link}
                    to={RoutesUrls.images}
                    className={classes.link}
                    button>
                    <ListItemIcon>
                        <PermMediaIcon />
                    </ListItemIcon>
                    <ListItemText primary='Галлерея изображений' />
                </ListItem>
            </List>
            <Divider />
        </div>
    );

    const registeredUserNavLinks = (
        <>
            <ListItem>
                {user && storageToken
                    ? <Avatar className={classes.orange}>{user.name.substring(0, 1).toUpperCase()}</Avatar>
                    : <Avatar src="/broken-image.jpg" />
                }
            </ListItem>
            <ListItem
                button
                component={Link}
                to={RoutesUrls.logout}
                className={clsx(classes.link, classes.linkColorHover)}
                activeClassName={classes.active}
            >
                <ListItemText primary='Выход' />
            </ListItem>
        </>
    );

    const notRegisteredUserNavLinks = (
        <>
            <ListItem
                button
                component={Link}
                to={RoutesUrls.login}
                className={clsx(classes.link, classes.linkColorHover)}
                activeClassName={classes.active}
            >
                <ListItemText primary='Вход' />
            </ListItem>
            <ListItem button
                      component={Link}
                      to={RoutesUrls.register}
                      className={clsx(classes.link, classes.linkColorHover)}
                      activeClassName={classes.active}
            >
                <ListItemText primary='Регистрация' />
            </ListItem>
        </>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <header className={classes.root}>
            <AppBar
                position="static"
                className={classes.appBar}
            >
                <Toolbar className={classes.toolBar} id="back-to-top-anchor">
                    <Hidden mdUp>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={toggleDrawer(true)}
                            className={classes.menuButton}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Hidden>

                    <Typography
                        component={Link}
                        to={RoutesUrls.homePage}
                        variant="h6"
                        noWrap
                        className={clsx(classes.link, classes.linkHome, classes.linkColorHover)}
                    >
                        React Blog
                    </Typography>

                    <Hidden smDown>
                        <List component='nav' color='inherit' className={classes.navMenu}>
                            <ListItem
                                component={Link}
                                to={RoutesUrls.addPost}
                                className={clsx(classes.link, classes.linkColorHover)}
                                activeClassName={classes.active}
                            >
                                <ListItemText primary='Добавить статью' />
                            </ListItem>
                            <ListItem
                                component={Link}
                                to={RoutesUrls.fileUpload}
                                className={clsx(classes.link, classes.linkColorHover)}
                                activeClassName={classes.active}
                            >
                                <ListItemText primary='Загрузить файлы' />
                            </ListItem>
                            <ListItem
                                component={Link}
                                to={RoutesUrls.images}
                                className={clsx(classes.link, classes.linkColorHover)}
                                activeClassName={classes.active}
                            >
                                <ListItemText primary='Галлерея изображений' />
                            </ListItem>
                        </List>
                    </Hidden>

                    {user && storageToken
                        ? <List component='ul' className={classes.nawAuthMenu}>{registeredUserNavLinks}</List>
                        : <List component='ul' className={classes.nawAuthMenu}>{notRegisteredUserNavLinks}</List>
                    }

                </Toolbar>
            </AppBar>
            <Hidden smUp implementation="css">
                <Drawer
                    container={container}
                    variant="temporary"
                    anchor='left'
                    open={drawerOpen}
                    onClose={toggleDrawer(false)}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    {drawerList}
                </Drawer>
            </Hidden>

        </header>
    );
};

export default Navbar;
