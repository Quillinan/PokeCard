import styled from "styled-components";
import SearchBar from "../components/SearchBar";

export default function MenuPage() {
  return (
    <MenuContainer>
      <Line>
        <img src="PokeballIcon.svg" alt="" />
        <h1>Cards</h1>
      </Line>
      <SearchBar />
      <CardContainer>
        <Card>
          <h1>Pikachu</h1>
          <img src="PikachuImage.svg" alt="" />
        </Card>
        <Card>
          <h1>Pikachu</h1>
          <img src="PikachuImage.svg" alt="" />
        </Card>
        <Card>
          <h1>Pikachu</h1>
          <img src="PikachuImage.svg" alt="" />
        </Card>
        <Card>
          <h1>Pikachu</h1>
          <img src="PikachuImage.svg" alt="" />
        </Card>
        <Card>
          <h1>Pikachu</h1>
          <img src="PikachuImage.svg" alt="" />
        </Card>
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
  justify-content: center;
  flex-direction: column;

  background: #fff;
  border-radius: 15px;
  border: 1px solid #000;

  width: 150px;
  height: 176px;
  img {
    width: 90%;
  }
`;
