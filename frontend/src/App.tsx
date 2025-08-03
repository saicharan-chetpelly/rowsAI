import { ThemeProvider } from '@mui/material';
import { FileProvider } from 'utils/context/FileContext';
import { SpreadsheetProvider } from 'utils/ThemeContext';
import EditSpreadSheetPage from 'pages/EditSpreadsheetPage';
import theme from './theme';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from 'pages/HomePage';
import ViewSpreadSheetPage from 'pages/ViewSpreadSheetPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <FileProvider>
        <SpreadsheetProvider>
          <div data-testid="app">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/edit" element={<EditSpreadSheetPage />} />
              <Route path="/edit/:id" element={<EditSpreadSheetPage />} />
              <Route path="/view/:id" element={<ViewSpreadSheetPage />} />
            </Routes>
          </div>
        </SpreadsheetProvider>
      </FileProvider>
    </ThemeProvider>
  );
}
export default App;
