import { createGlobalStyle, styled } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'VT323';
    font-style: normal;
    font-weight: 400;
  }

  button {
    border-radius: 10px;
    border: 1px solid #151515;
    background: #F4F4F4;
    width: 230px;
    cursor: pointer;
    color: #151515;
    font-size: 32px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    height: 55px;
  }

  h1 {
    font-size: 36px;
  }
  h2 {
    font-family: 'Poppins';
    font-size: 18px;
  }
  img{
    width: 36px;
    height: 36px;
  }
  
`;

const StylizedInput = styled.input`
  border-radius: 10px;
  border: 1px solid #e2e2e2;
  background: #fff;
  font-size: 32px;
  padding: 5px 15px;
  width: calc(100% - 30px);
  height: 55px;
  outline: none;
`;

export default GlobalStyle;
export { StylizedInput };
