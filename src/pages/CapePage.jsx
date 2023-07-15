import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function CapePage() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/cadastro");
  };

  return (
    <CapeContainer>
      <BoxContainer>
        <img src="/Logo.svg" alt="" />
        <img className="image" src="/PikachuImage.svg" alt="" />
        <button onClick={handleLoginClick}>Login</button>
        <button onClick={handleRegisterClick}>Cadastro</button>
      </BoxContainer>
    </CapeContainer>
  );
}

const CapeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  .image {
    margin-top: 25px;
    margin-bottom: 40px;
  }
`;

const BoxContainer = styled.div`
  background-color: #e2e2e2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  height: 100vh;
  width: 100vw;
  max-width: 600px;
  max-height: 675px;
  @media (min-width: 676px) and (min-height: 601px) {
    border-radius: 10px;
    border: 1px solid #151515;
  }
`;
