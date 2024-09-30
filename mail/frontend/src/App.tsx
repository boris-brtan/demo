import { useMemo } from 'react'
import { DarkMode, LightMode } from '@mui/icons-material'
import { AppBar, Container, CssBaseline, IconButton, ThemeProvider, Toolbar, Tooltip, Typography, createTheme } from '@mui/material'
import { useThemeStore } from './store/theme'
import './App.scss'
import { Form } from './component/Form'

function PaletteModeButton() {
    const [mode, toggleMode] = useThemeStore((state) => [state.mode, () => state.toggleMode()])

    return <Tooltip title={`change to ${mode === 'dark' ? 'light' : 'dark'} theme mode`}>
        <IconButton onClick={toggleMode}>
            {mode === 'dark' ? <DarkMode /> : <LightMode />}
        </IconButton>
    </Tooltip>
}

export function App() {
    const mode = useThemeStore((state) => state.mode)
    const theme = useMemo(() => createTheme({ palette: { mode } }), [mode])

    return <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <AppBar position="sticky">
            <Toolbar >
                <Typography
                    variant="h6"
                    noWrap
                    component="h1"
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                    Mail client
                </Typography>
                <PaletteModeButton />
            </Toolbar>
        </AppBar>
        <Container component="main" maxWidth="md">
            <Form />
        </Container>
    </ThemeProvider>
}
