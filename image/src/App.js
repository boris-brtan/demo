import React, { useState } from 'react'
import Menu from './components/Menu'
import { createMuiTheme, responsiveFontSizes, ThemeProvider, CssBaseline } from '@material-ui/core'
import Upload from './components/Upload'
import Edit from './components/Edit'
import { useSelector } from 'react-redux'

function App() {
    const [paletteMode, setPaletteMode] = useState(0)
    const theme = responsiveFontSizes(
        createMuiTheme({
            palette: {
                type: ['dark', 'light'][paletteMode],
            },
        })
    )
    const file = useSelector((state) => state.imageReducer.image)

    const togglePaletteMode = () => {
        setPaletteMode((paletteMode + 1) % 2)
    }

    return <ThemeProvider theme={theme}>
        <CssBaseline />
        <Menu togglePaletteMode={togglePaletteMode} />
        {file ? <Edit /> : <Upload />}
    </ThemeProvider>
}

export default App
