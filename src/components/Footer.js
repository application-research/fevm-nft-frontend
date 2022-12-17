import styled from "styled-components";
import { SOCIALS } from "../constants";

const Container = styled.div`
  width: 100%;
  display: none;
  padding: 2rem 0;
  @media (max-width: 768px) {
    display: grid;
    place-content: center;
  }
`;

const Socials = styled.div`
  display: flex;
  gap: 1rem;
`;

const Social = styled.button`
  outline: none;
  border: none;
  background-color: #ff008720;
  border-radius: 100%;
  height: 3rem;
  width: 3rem;
  padding: 0.86rem;
`;
const SocialImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  cursor: pointer;
  filter: invert(14%) sepia(100%) saturate(4429%) hue-rotate(320deg)
    brightness(100%) contrast(109%);
`;

export default () => {
  return (
    <Container>
      {/* <Socials>
        {SOCIALS.map((e, i) => (
          <Social
            key={`${e.title}-${i}`}
            title={`${e.title}`}
            alt={`${e.title}`}
          >
            <SocialImg
              onClick={() => window.open(e.link, "_blank").focus()}
              src={e.img}
            />
          </Social>
        ))}
      </Socials> */}
    </Container>
  );
};
