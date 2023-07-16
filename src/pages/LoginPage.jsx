import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { StylizedInput } from "../styles/GlobalStyle";
import { useState } from "react";
import axios from "axios";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/signin`,
        {
          email,
          password,
        }
      );
      console.log(response);
      const { token } = response.data;
      localStorage.setItem("token", token);
      console.log(token);
      navigate("/menu");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <CapeContainer>
      <img src="/Logo.svg" alt="" />
      <BoxContainer>
        <div>
          <h1 className="title">LOGIN</h1>
          <h1>E-mail</h1>
          <StylizedInput
            type="email"
            placeholder="Nome ou Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h1 className="password">Senha</h1>
          <StylizedInput
            placeholder="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <h1 className="signup" onClick={handleSignupClick}>
          Não tem conta? Registre-se
        </h1>
        <button onClick={handleLogin}>ENTRAR</button>
      </BoxContainer>
    </CapeContainer>
  );
}

const CapeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px;
  height: calc(100% - 100px);
  width: calc(100% - 100px);
  img {
    margin-bottom: 40px;
  }
  @media (max-width: 600px) {
    width: calc(100% - 30px);
    height: calc(80% - 30px);
    padding: 15px;
  }
`;

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 600px;
  max-height: 600px;

  width: calc(100% - 100px);
  height: calc(80% - 100px);
  padding: 50px;
  .title {
    margin-bottom: 30px;
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: self-start;
    width: 100%;
    margin: 35px 0;
  }
  .password {
    margin-top: 20px;
  }
  button {
    margin-top: 30px;
  }
  .signup {
    text-align: center;
    text-decoration: underline;
  }

  @media (min-width: 601px) and (min-height: 601px) {
    border-radius: 10px;
    border: 1px solid #151515;
  }

  @media (max-width: 600px) {
    width: calc(100% - 30px);
    height: calc(80% - 30px);
    padding: 15px;
    h1 {
      font-size: 25px;
    }
    input {
      font-size: 25px;
      height: 40px;
    }
  }
`;
