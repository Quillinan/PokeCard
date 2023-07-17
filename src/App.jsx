import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import CapePage from "./pages/CapePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MenuPage from "./pages/MenuPage";
import BagPage from "./pages/BagPage";
import ShopPage from "./pages/ShopPage";

export default function App() {
  return (
    <PagesContainer>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CapePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cadastro" element={<SignupPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/mochila" element={<BagPage />} />
          <Route path="/compras" element={<ShopPage />} />
        </Routes>
      </BrowserRouter>
    </PagesContainer>
  );
}

const PagesContainer = styled.main`
  background-color: #e2e2e2;
  width: calc(100vw - 40px);
  height: calc(100vh - 40px);
  padding: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
