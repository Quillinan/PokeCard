import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import CapePage from "./pages/CapePage";

export default function App() {
  return (
    <PagesContainer>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CapePage />} />
        </Routes>
      </BrowserRouter>
    </PagesContainer>
  );
}

const PagesContainer = styled.main`
  background-color: #e2e2e2;
  max-height: 100vh;
`;
