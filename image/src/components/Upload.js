import React from 'react'
import { makeStyles, createStyles, Button } from '@material-ui/core'
import clsx from 'clsx'
import { setImage } from '../actions'
import { useDispatch } from 'react-redux'

const useStyles = makeStyles((theme) => createStyles({
    root: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    button: {
        flex: 1,
        width: '100%',
        '& > *': {
            flexDirection: 'column',
        }
    },
    upload: {
        fontSize: '35vw',
        [theme.breakpoints.up('sm')]: {
            fontSize: '15vw',
        }
    },
}))

function Upload() {
    const classes = useStyles()
    const dispatch = useDispatch()

    const handleDragOver = (e) => {
        e.preventDefault()
        console.log('drop', e.dataTransfer.items[0].type.search(/^image/) > -1)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        dispatch(setImage(window.file = e.dataTransfer.files[0]))
    }

    return <div className={classes.root}>
        <Button className={classes.button} onDrop={handleDrop} onDragOver={handleDragOver}>
            <i className={clsx('material-icons', classes.upload)}>add_to_photos</i>
        </Button>
    </div>
}

export default Upload
