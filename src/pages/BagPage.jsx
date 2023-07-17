import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SearchBar from "../components/SearchBar";
import axios from "axios";
import TopBar from "../components/TopBar";
import CardItem from "../components/Card";
import { useNavigate } from "react-router-dom";

export default function BagPage() {
  const [cards, setCards] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleRemoveFromCart = async (card) => {
    const confirmAddToCart = window.confirm(
      `Deseja remover a carta ${card.name} no seu carrinho?`
    );
    if (confirmAddToCart) {
      console.log(token);
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_API_URL}/cart/remove-from-cart`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            data: {
              cardId: card._id,
            },
          }
        );
        if (response.status === 200) {
          alert("Carta removida do seu carrinho");
          updateCardsList();
        }
      } catch (error) {
        if (error.response.status === 404) {
          alert("Erro com seu carrinho");
        } else {
          alert("Desculpe, ocorreu um erro inesperado");
          console.log(error.response.data);
        }
      }
    }
  };

  const updateCardsList = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/cart/get-cards-on-cart`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200 || !response.data.cards.length) {
        setCards(response.data.cards);
      }
    } catch (error) {
      alert("Desculpe, ocorreu um erro inesperado");
      console.log(error);
    }
  };

  const handleCheckout = async () => {
    const confirmAddToCart = window.confirm(`Deseja finalizar o pedido?`);
    if (confirmAddToCart) {
      console.log(token);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/cart/checkout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          const newToken = response.data.newToken;
          localStorage.setItem("token", newToken);
          alert("Compra finalizada com sucesso");
          updateCardsList();
        }
      } catch (error) {
        if (error.response.status === 404) {
          alert("Erro com seu carrinho");
        } else {
          alert("Desculpe, ocorreu um erro inesperado");
          console.log(error.response.data);
        }
      }
    }
  };

  const isInCart = (card) => {
    return true;
  };

  const handleAddToCart = async (card) => {
    return null;
  };

  useEffect(() => {
    if (localStorage.getItem("token") == undefined) {
      navigate("/");
      return;
    }
    updateCardsList();
  }, []);

  return (
    <BagContainer>
      <TopBar />
      <Line>
        <img src="BagIcon.svg" alt="" />
        <h1>Mochila</h1>
      </Line>
      <SearchBar />
      <CardContainer>
        {cards.length === 0 ? (
          <NoResult>
            <h1>Nenhuma carta encontrada</h1>
            <img src={"SadPikachuIcon.svg"} alt="" />
          </NoResult>
        ) : (
          cards.map((card) => (
            <CardItem
              key={card._id}
              card={card}
              handleAddToCart={handleAddToCart}
              handleRemoveFromCart={handleRemoveFromCart}
              isInCart={isInCart}
            />
          ))
        )}
      </CardContainer>
      <button onClick={handleCheckout}>Finalizar pedido</button>
    </BagContainer>
  );
}

const BagContainer = styled.div`
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
    max-height: 300px;
    max-width: 215px;
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
