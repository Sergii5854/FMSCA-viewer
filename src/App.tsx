import './App.css'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { FMSCAViewer } from './components/FMSCAViewer'
import defaultTheme from './theme.tsx'

function App() {
    return (
        <MuiThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <FMSCAViewer />
        </MuiThemeProvider>
    )
}

export default App
