import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SearchBar from "../components/SearchBar";
import axios from "axios";
import TopBar from "../components/TopBar";
import CardItem from "../components/Card";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const [cards, setCards] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleUpdate = () => {
    getSoldCards();
    alert("Atualizado");
  };

  const getSoldCards = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/card/user-cards`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const filteredCards = response.data.filter((card) => card.sold);
      setCards(filteredCards);
    } catch (error) {
      alert("Desculpe, ocorreu um erro inesperado");
      console.log(error);
    }
  };

  const handleAddToCart = async (card) => {
    return null;
  };

  const NotInCart = (card) => {
    return false;
  };

  const handleRemoveFromCart = async (card) => {
    return null;
  };

  useEffect(() => {
    if (localStorage.getItem("token") == undefined) {
      navigate("/");
      return;
    }
    getSoldCards();
  }, []);

  return (
    <MenuContainer>
      <TopBar />
      <Line>
        <img src="UserIcon.svg" alt="" />
        <h1>Vendas</h1>
      </Line>
      <h1>
        Total: R${" "}
        {cards.length > 0
          ? cards.reduce((sum, card) => sum + card.value, 0).toFixed(2)
          : 0}
      </h1>
      <SearchBar />
      <CardContainer>
        {cards.length === 0 ? (
          <NoResult>
            <h1>Nenhuma carta vendida</h1>
            <img src={"SadPikachuIcon.svg"} alt="" />
          </NoResult>
        ) : (
          cards.map((card) => (
            <CardItem
              key={card._id}
              card={card}
              handleAddToCart={handleAddToCart}
              handleRemoveFromCart={handleRemoveFromCart}
              isInCart={NotInCart}
            />
          ))
        )}
      </CardContainer>
      <button onClick={handleUpdate}>Atualizar</button>
    </MenuContainer>
  );
}

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100% - 40px);
  width: calc(100% - 40px);
  max-width: 806px;
  padding: 20px;
  gap: 40px;
  margin-top: 50px;
  h1 {
    font-size: 36px;
  }
  h2 {
    font-family: "Poppins";
    font-size: 18px;
  }
  @media (max-width: 471px) {
    height: 100%;
    width: 100%;
    padding: 0px;
    gap: 20px;
    overflow-y: auto;
  }
`;

const Line = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  gap: 16px;
  align-self: start;
`;

const NoResult = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  img {
    width: 100%;
    height: 100%;
  }
  @media (max-width: 471px) {
    img {
      width: 200px;
      height: 200px;
    }
  }
`;

const CardContainer = styled.div`
  background-color: #fffdc7;
  width: calc(100%-60px);

  display: flex;
  flex-wrap: wrap;
  justify-content: start;

  gap: 16px;
  padding: 30px;
  overflow-y: auto;

  border-radius: 10px;
  border: 1px solid #151515;

  @media (max-width: 471px) {
    justify-content: center;
    gap: 30px;
    padding: 15px;
    max-width: 215px;
    max-height: 275px;
    overflow-y: auto;
  }
`;

const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;

  background: #fff;
  border-radius: 15px;
  border: 1px solid #000;
  position: relative;

  width: 150px;
  height: 200px;

  .name {
    align-self: flex-start;
    margin-left: 10px;
  }
  .cardImg {
    border: #000 1px solid;
    width: 100%;
    height: 70%;
  }
  .overlay {
    position: absolute;
    top: -3%;
    right: -8%;
    width: 30px;
    height: 30px;
    background-color: #ffc7c7;
    border-radius: 50%;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
      rotate: 45deg;
    }
  }
`;
