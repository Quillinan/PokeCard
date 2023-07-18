import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import TopBar from "../components/TopBar";
import CardItem from "../components/Card";
import { useNavigate } from "react-router-dom";

export default function ShopPage() {
  const token = localStorage.getItem("token");
  const [carts, setCarts] = useState([]);
  const [cartCards, setCartCards] = useState([]);
  const navigate = useNavigate();

  const getActiveCarts = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/cart/user-active-carts`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (Array.isArray(response.data.carts)) {
        setCarts(response.data.carts);
      } else {
        setCarts([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isInCart = (card) => {
    return cartCards.some((cartCard) => cartCard._id === card._id);
  };

  const updateCardsList = async () => {
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
        setCartCards(response.data.cards);
      }
    } catch (error) {
      alert("Desculpe, ocorreu um erro inesperado");
      console.log(error);
    }
  };

  const handleAddToCart = async (card) => {
    return null;
  };

  const handleRemoveFromCart = async (card) => {
    const confirmAddToCart = window.confirm(
      `Deseja remover a carta ${card.name} no seu carrinho?`
    );
    if (confirmAddToCart) {
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
          getActiveCarts();
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

  useEffect(() => {
    if (localStorage.getItem("token") == undefined) {
      navigate("/");
      return;
    }
    getActiveCarts();
    updateCardsList();
  }, []);

  return (
    <ShopContainer>
      <TopBar />
      <Line>
        <img src="CapIcon.svg" alt="" />
        <h1>Compras</h1>
      </Line>
      <Scroll>
        {carts.length === 0 ? (
          <NoResult>
            <h1>Nenhuma compra encontrada</h1>
            <img src={"SadPikachuIcon.svg"} alt="" />
          </NoResult>
        ) : (
          carts.map((cart) => (
            <CartContainer key={cart._id}>
              <h1>
                Total: R${" "}
                {cart.cards.length > 0
                  ? cart.cards
                      .reduce((sum, card) => sum + card.value, 0)
                      .toFixed(2)
                  : 0}
              </h1>
              <CardContainer>
                {cart.cards.map((card) => (
                  <CardItem
                    key={card._id}
                    card={card}
                    handleAddToCart={handleAddToCart}
                    handleRemoveFromCart={handleRemoveFromCart}
                    isInCart={isInCart}
                  />
                ))}
              </CardContainer>
            </CartContainer>
          ))
        )}
      </Scroll>
    </ShopContainer>
  );
}

const ShopContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100% - 80px);
  width: calc(100% - 80px);
  max-width: 1426px;
  padding: 40px;
  gap: 20px;
  margin-top: 60px;
  overflow-y: auto;
  h1 {
    font-size: 36px;
  }
  h2 {
    font-family: "Poppins";
    font-size: 18px;
  }
  @media (max-width: 471px) {
    padding: 0;
    height: 100%;
    width: 100%;
  }
`;

const Scroll = styled.div`
  overflow-y: auto;
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
  @media (max-width: 471px) {
    img {
      width: 200px;
      height: 200px;
    }
  }
`;

const CartContainer = styled.div`
  background-color: #fffdc7;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  padding: 30px 30px 10px;
  margin: 10px 0 10px;

  border-radius: 10px;
  border: 1px solid #151515;
  overflow-y: auto;

  @media (max-width: 471px) {
    padding: 15px;
    max-width: 250px;
    overflow-x: hidden;
  }
`;

const CardContainer = styled.div`
  background-color: #fffdc7;
  width: calc(100%-30px);

  display: flex;
  flex-wrap: wrap;
  justify-content: start;

  gap: 16px;
  padding: 15px;
  margin: 10px 0 10px;

  @media (max-width: 471px) {
    justify-content: center;
    gap: 30px;
    padding: 10px;
    width: calc(100%-20px);
    max-width: 250px;
  }
`;
