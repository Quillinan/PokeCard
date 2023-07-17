import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import TopBar from "../components/TopBar";

export default function ShopPage() {
  const token = localStorage.getItem("token");
  const [carts, setCarts] = useState([]);
  const [cartCards, setCartCards] = useState([]);

  const getActiveCarts = async () => {
    console.log(token);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/cart/user-active-carts`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCarts(response.data.carts);
      console.log(carts);
      console.log(response.data);
      return response.data;
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

  useEffect(() => {
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
                  <Card key={card._id}>
                    <h2 className="name">{card.name}</h2>
                    <img className="cardImg" src={"PikachuImage.svg"} alt="" />
                    <h2>R$ {card.value.toFixed(2)}</h2>
                    {isInCart(card) && (
                      <div
                        className="overlay"
                        onClick={() => handleRemoveFromCart(card)}
                      >
                        <img src="Multiply.svg" alt="" />
                      </div>
                    )}
                  </Card>
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
  height: calc(100% - 40px);
  width: calc(100% - 40px);
  max-width: 806px;
  padding: 20px;
  gap: 20px;
  margin-top: 60px;
  overflow-y: auto;
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
