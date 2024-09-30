import React, { useState } from 'react'
import clsx from 'clsx'
import { Divider, SwipeableDrawer, IconButton, makeStyles, createStyles, useTheme } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'
import DarkThemeIcon from '@material-ui/icons/Brightness4'
import LightThemeIcon from '@material-ui/icons/Brightness7'

const useStyles = makeStyles(theme => createStyles({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    toolbar: theme.mixins.toolbar,
    drawer: {
        display: 'flex',
        minWidth: 240,
        '& > button': {
            alignSelf: 'center',
        },
    },
}))

function Menu(props) {
    const classes = useStyles()
    const theme = useTheme()

    const [open, setOpen] = useState(false)

    const toggleDrawer = (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return
        setOpen(!open)
    }

    return <AppBar position="static">
        <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer}>
                <MenuIcon />
            </IconButton>
            <Typography variant="h6">Image edit</Typography>
        </Toolbar>
        <SwipeableDrawer
            open={open}
            onClose={toggleDrawer}
            onOpen={toggleDrawer}
        >
            <div className={clsx(classes.toolbar, classes.drawer)}>
                <IconButton onClick={props.togglePaletteMode}>
                    {theme.palette.type === 'dark' ? <LightThemeIcon /> : <DarkThemeIcon />}
                </IconButton>
            </div>
            <Divider />
        </SwipeableDrawer>
    </AppBar>
}

export default Menu
