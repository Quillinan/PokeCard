import React from "react";
import styled from "styled-components";

const CardItem = ({
  card,
  handleAddToCart,
  handleRemoveFromCart,
  isInCart,
}) => {
  return (
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
