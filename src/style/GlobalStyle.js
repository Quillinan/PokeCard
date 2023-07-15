import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        font-family: 'VT323';
        font-style: normal;
        font-weight: 400;
    }
    button{
        border-radius: 10px;
        border: 1px solid #151515;
        background: #F4F4F4;
        width: 230px;
        cursor: pointer;
        color: #151515;
        font-size: 32px;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25)
}
`;

export default GlobalStyle;
