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
      const { token } = response.data;
      localStorage.setItem("token", token);
      navigate("/menu");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleSignupClick = () => {
    navigate("/cadastro");
  };

  return (
    <LoginContainer>
      <img src="/Logo.png" alt="" />
      <BoxContainer>
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

        <h1 className="signup" onClick={handleSignupClick}>
          Não tem conta? Registre-se
        </h1>
        <button onClick={handleLogin}>ENTRAR</button>
      </BoxContainer>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px;
  height: calc(100% - 100px);
  width: calc(100% - 100px);
  img {
    margin-bottom: 40px;
    width: fit-content;
    height: 160px;
  }
  h1 {
    font-size: 36px;
  }
  h2 {
    font-family: "Poppins";
    font-size: 18px;
  }
  @media (max-width: 767px) {
    img {
      margin-bottom: 20px;
    }
    width: 100%;
    height: 100%;
    padding: 0;
  }
`;

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 50px 60px;

  .title {
    margin-bottom: 10px;
    margin-top: 0px;
  }

  h1 {
    align-self: flex-start;
    margin-top: 40px;
  }

  button {
    margin-top: 40px;
  }

  input {
    margin-top: 5px;
  }

  @media (min-width: 768px) {
    border-radius: 10px;
    border: 1px solid #151515;
  }

  @media (max-width: 767px) {
    padding: 0;
    .title {
      font-size: 36px;
      margin: 0px;
    }
    h1 {
      margin-top: 20px;
      font-size: 25px;
    }

    button {
      margin-top: 20px;
    }
  }
`;
