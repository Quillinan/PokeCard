import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useState } from "react";

const CardItem = ({
  card,
  handleAddToCart,
  handleRemoveFromCart,
  isInCart,
}) => {
  const [cardImage, setCardImage] = useState(null);

  const defaultImageUrl = "SadPikachuIcon.svg";

  const fetchCardImage = async (cardName) => {
    try {
      const response = await axios.get(
        `https://api.pokemontcg.io/v2/cards?q=name:${encodeURIComponent(
          cardName
        )}`
      );
      if (response.data && response.data.data.length > 0) {
        const imageUrl = response.data.data[0].images.small;
        setCardImage(imageUrl);
      } else {
        setCardImage(defaultImageUrl);
      }
    } catch (error) {
      setCardImage(defaultImageUrl);
      console.log(error);
      console.log("Carta não encontrada");
    }
  };

  React.useEffect(() => {
    fetchCardImage(card.name);
  }, [card.name]);

  return (
    <Card key={card._id}>
      <h2 className="name">{card.name}</h2>
      {cardImage && (
        <img
          className="cardImg"
          onClick={() => handleAddToCart(card)}
          src={cardImage}
          alt=""
        />
      )}
      <h2>R$ {card.value.toFixed(2)}</h2>
      {isInCart(card) && (
        <div className="overlay" onClick={() => handleRemoveFromCart(card)}>
          <img src="Multiply.svg" alt="" />
        </div>
      )}
    </Card>
  );
};

export default CardItem;

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
