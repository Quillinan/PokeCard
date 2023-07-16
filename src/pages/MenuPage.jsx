import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SearchBar from "../components/SearchBar";
import axios from "axios";
import TopBar from "../components/TopBar";

export default function MenuPage() {
  const [cards, setCards] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/card/cards`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCards(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCards();
  }, []);

  return (
    <MenuContainer>
      <TopBar />
      <Line>
        <img src="PokeballIcon.svg" alt="" />
        <h1>Cards</h1>
      </Line>
      <SearchBar />
      <CardContainer>
        {cards.map((card) => (
          <Card key={card._id}>
            <h2 className="name">{card.name}</h2>
            <img src={"PikachuImage.svg"} alt="" />
            <h2>R$ {card.value}</h2>
          </Card>
        ))}
      </CardContainer>
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
`;

const Line = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  gap: 16px;
  align-self: start;
`;

const CardContainer = styled.div`
  background-color: #fffdc7;
  width: calc(100%-60px);
  height: calc(100%-100px);

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

  width: 150px;
  height: 200px;
  .name {
    align-self: flex-start;
    margin-left: 10px;
  }
  img {
    border: #000 1px solid;
    width: 100%;
    height: 70%;
  }
`;
