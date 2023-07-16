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
    </TopBarContainer>
  );
};

const TopBarContainer = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #fff06d;
  justify-content: space-between;
  width: 100vw;
  height: 60px;
  top: 0px;
  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
  }
  img {
    cursor: pointer;
  }
  .first {
    margin-left: 45px;
  }
  .last {
    margin-right: 45px;
  }
`;

export default TopBar;
