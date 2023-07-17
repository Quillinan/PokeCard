import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SearchBar from "../components/SearchBar";
import axios from "axios";
import TopBar from "../components/TopBar";

export default function MenuPage() {
  const [cards, setCards] = useState([]);
  const token = localStorage.getItem("token");
  const [cartCards, setCartCards] = useState([]);

  const handleAddToCart = async (card) => {
    const confirmAddToCart = window.confirm(
      `Deseja adicionar a carta ${card.name} no seu carrinho?`
    );
    if (confirmAddToCart) {
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
          updateCardsList();
          fetchCards();
        }
      } catch (error) {
        if (error.response.status === 404) {
          alert("Carta não encontrada");
        } else {
          alert("Desculpe, ocorreu um erro inesperado");
          console.log(error.response.data);
        }
      }
    }
  };

  const handleRemoveFromCart = async (card) => {
    const confirmRemoveFromCart = window.confirm(
      `Deseja remover a carta ${card.name} do seu carrinho?`
    );

    if (confirmRemoveFromCart) {
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
          alert("Carta removida do carrinho com sucesso");
          updateCardsList();
          fetchCards();
        }
        console.log(response.data);
      } catch (error) {
        if (error.response.status === 404) {
          alert("Carta ou Carrinho não encontrados");
        } else {
          alert("Desculpe, ocorreu um erro inesperado");
          console.log(error.response.data);
        }
      }
    }
  };

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
      const filteredCards = response.data.filter((card) => !card.sold);

      setCards(filteredCards);
    } catch (error) {
      alert("Desculpe, ocorreu um erro inesperado");
      console.log(error);
    }
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

  const isInCart = (card) => {
    return cartCards.some((cartCard) => cartCard._id === card._id);
  };

  const handleAddCard = () => {
    const confirmAddCard = window.confirm(`Deseja adicionar uma carta?`);
    if (confirmAddCard) {
      const cardName = prompt(`Qual o nome da carta?`);
      const cardValue = prompt(`Qual o valor da carta?`);
      const card = {
        name: cardName,
        value: cardValue,
      };
      addCard(card);
    }
  };

  const addCard = async (card) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/card/addcard`,
        {
          name: card.name,
          value: Number(card.value),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Carta adicionada com sucesso");
        fetchCards();
      }
    } catch (error) {
      alert("Desculpe, ocorreu um erro inesperado");
      console.log(error);
    }
  };

  useEffect(() => {
    updateCardsList();
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
        {cards.length === 0 ? (
          <NoResult>
            <h1>Nenhuma carta encontrada</h1>
            <img src={"SadPikachuIcon.svg"} alt="" />
          </NoResult>
        ) : (
          cards.map((card) => (
            <Card key={card._id}>
              <h2 className="name">{card.name}</h2>
              <img
                className="cardImg"
                onClick={() => handleAddToCart(card)}
                src={"PikachuImage.svg"}
                alt=""
              />
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
          ))
        )}
      </CardContainer>
      <button onClick={handleAddCard}>Adicionar carta</button>
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
