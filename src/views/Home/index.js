import brand from "assets/brand.png";
import caret from "assets/caret.svg";
import kingape from "assets/kingape.png";
import hiddenape from "assets/hidden.png";
import { StackedCarousel } from "react-stacked-carousel";
import styled from "styled-components";
import Body from "./Body";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  margin: auto;
  max-width: 1920px;
`;
const Carousel = styled.div`
  position: relative;

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px;
    width: 240px;
    height: 360px;
  }

  .card {
    background: #4c1735;
    border-radius: 1rem;
    border: 1px solid #4c173580;
    padding: 10px;
    width: 100%;
    height: 100%;
  }
`;
const Brand = styled.img.attrs({ src: brand })`
  width: 12rem;
`;

const Card = styled.div``;

const CaretBtn = styled.button`
  background: ${() =>
    `radial-gradient(circle at bottom right, #ffffff29, #ffffff11 72%),
    radial-gradient(circle at top left, #ffffff11, #ffffff11 36%),
    linear-gradient(96deg, #ffffff11 0%, #ffffff3b 100%)
    `};
  border: 1px solid #ffffff0a;
  padding: 1rem;
  display: grid;
  place-content: center;
  border-radius: 100%;
  aspect-ratio: 1;
  top: 50%;
  transform: translate(0, -50%);
  z-index: 2;
  position: absolute;
  display: grid;
  place-content: center;
  cursor: pointer;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const Title = styled.h2`
background: -webkit-linear-gradient(
  90deg,
  rgba(255, 189, 12, 1) 0%,
  rgba(232, 13, 214, 1) 120%,
  rgba(255, 0, 183, 1) 100%
);
-webkit-background-clip: text;
background-clip: text;
-webkit-text-fill-color: transparent;
padding: 0px;
`;

const Caret = styled.img.attrs({ src: caret })`
  width: 1.2rem;
  filter: invert(1);
`;

const Span = styled.div`
  display: flex;
  align-items: center;
  gap: 5rem;
  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const Image = styled.img`
  width: 350px;
  height: 350px;
  object-fit: cover;
  border-radius: 40px;
`;

export default () => {
  const onCardChange = (event) => {};

  return (
    <Container>
      <Span>

<Image src={brand} />
        <Body />
      </Span>
    </Container>
  );
};
