import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../../Style/GlobalStyle';
import { BrowserRouter } from 'react-router-dom';
import { theme } from '../../Style/theme';
import AppContent from '../AppContent/AppContent';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;
