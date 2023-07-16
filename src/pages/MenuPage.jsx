import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SearchBar from "../components/SearchBar";
import axios from "axios";
import TopBar from "../components/TopBar";

export default function MenuPage() {
  const [cards, setCards] = useState([]);
  const token = localStorage.getItem("token");

  const handleAddToCart = async (card) => {
    const confirmAddToCart = window.confirm(
      `Deseja adicionar a carta ${card.name} no seu carrinho?`
    );
    if (confirmAddToCart) {
      console.log(card);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/cart/add-to-cart`,
          {
            cardId: card._id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          alert("Carta adicionada no seu carrinho");
        }
      } catch (error) {
        if (error.response.status === 404) {
          alert("Carta não encontrada");
        } else {
          console.log(error.response.data);
          // Tratar outros erros aqui
        }
      }
    }
  };

  const handleRemoveFromCart = async (card) => {
    const confirmRemoveFromCart = window.confirm(
      `Deseja remover a carta ${card.name} do seu carrinho?`
    );
    if (confirmRemoveFromCart) {
    }
    // Remover do carrinho
  };

  const isInCart = (card) => {};
  console.log(token);

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
          <Card key={card._id} onClick={() => handleAddToCart(card)}>
            <h2 className="name">{card.name}</h2>
            <img className="cardImg" src={"PikachuImage.svg"} alt="" />
            <h2>R$ {card.value}</h2>
            {isInCart(card) && (
              <div className="overlay" onClick={handleRemoveFromCart}>
                <img src="Multiply.svg" alt="" />
              </div>
            )}
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
