import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const TopBar = ({}) => {
  const navigate = useNavigate();

  const handleMenuClick = () => {
    navigate("/menu");
  };
  const handleCartClick = () => {
    navigate("/mochila");
  };
  const handleOldCartsClick = () => {
    navigate("/compras");
  };
  const handleProfileClick = () => {
    navigate("/perfil");
  };
  const handleLogoutClick = () => {
    const confirmLogout = window.confirm("Deseja realmente sair?");
    if (confirmLogout) {
      localStorage.clear();
      navigate("/");
    }
  };

  return (
    <TopBarContainer>
      <IconsContainer>
        <img
          className="first"
          onClick={handleMenuClick}
          src="PokeballIcon.svg"
          alt=""
        />
        <div>
          <img onClick={handleCartClick} src="BagIcon.svg" alt="" />
          <img onClick={handleOldCartsClick} src="CapIcon.svg" alt="" />
          <img onClick={handleProfileClick} src="UserIcon.svg" alt="" />
          <img
            onClick={handleLogoutClick}
            className="last"
            src="PikachuIcon.svg"
            alt=""
          />
        </div>
      </IconsContainer>
    </TopBarContainer>
  );
};

const TopBarContainer = styled.div`
  background-color: #fff06d;
  position: fixed;
  top: 0;
  height: 60px;
  top: 0px;

  display: flex;
  flex-direction: row;
  justify-content: center;

  width: calc(100vw - 90px);
  padding: 0 45px;
  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
  }
  img {
    cursor: pointer;
  }
`;

const IconsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  max-width: 806px;
`;

export default TopBar;
