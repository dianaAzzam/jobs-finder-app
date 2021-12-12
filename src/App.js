import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./configs/theme";
import HomePage from "./components/main-page";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <div>
        <HomePage />
      </div>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
