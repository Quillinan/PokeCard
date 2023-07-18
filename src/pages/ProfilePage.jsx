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
    <ProfileContainer>
      <TopBar />
      <Line>
        <img src="UserIcon.svg" alt="" />
        <h1>Vendas</h1>
      </Line>
      <SearchBar />
      <h2>
        Total das vendas: R${" "}
        {cards.length > 0
          ? cards.reduce((sum, card) => sum + card.value, 0).toFixed(2)
          : 0}
      </h2>
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
    </ProfileContainer>
  );
}

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100% - 40px);
  width: calc(100% - 80px);
  padding: 20px 40px;
  gap: 40px;
  margin-top: 40px;
  max-width: 1426px;
  h1 {
    font-size: 36px;
  }
  h2 {
    font-family: "Poppins";
    font-size: 18px;
  }
  overflow: hidden;
  @media (max-width: 767px) {
    margin-top: 50px;
    height: 100%;
    width: 100%;
    padding: 0px;
    gap: 20px;
  }
  @media (min-width: 768px) {
    h2 {
      font-family: "VT323";
      font-style: normal;
      font-weight: 400;
      font-size: 36px;
    }
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

    max-width: 400px;
    max-height: 400px;
  }
  @media (max-width: 767px) {
    img {
      width: 200px;
      height: 200px;
    }
  }
`;

const CardContainer = styled.div`
  background-color: #fffdc7;
  width: calc(90% - 32px);
  max-height: calc(65% - 32px);

  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  gap: 16px;
  padding: 15px;
  overflow-y: auto;

  border-radius: 10px;
  border: 1px solid #151515;

  @media (max-width: 767px) {
    width: calc(100% - 62px);
    overflow-x: hidden;
    gap: 30px;
    max-height: 300px;
  }
`;
