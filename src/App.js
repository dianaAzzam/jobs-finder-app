import "./App.css";
import { Suspense } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./configs/theme";
import HomePage from "./components/main-page";
function App() {
  return (
    <Suspense fallback="loading">
      <ThemeProvider theme={theme}>
        <Header />
        <div>
          <HomePage />
        </div>
        <Footer />
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
