import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Navbar from "./components/navbar";
import SignUpPage from "./pages/signup";
import SignInPage from "./pages/signin";
import Dashboard from "./pages/dashboard";
import Custom404 from "./pages/not-found";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <WithNavbarFooter>
              <Home />
            </WithNavbarFooter>
          }
        />
        <Route
          path="/dashboard"
          element={
            <WithNavbarFooter>
              <Dashboard />
            </WithNavbarFooter>
          }
        />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/*" element={<Custom404 />} />
      </Routes>
    </BrowserRouter>
  );
}

function WithNavbarFooter({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default App;
