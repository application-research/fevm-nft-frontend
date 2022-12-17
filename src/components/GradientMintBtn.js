import styled from "styled-components";

const Inset = styled.div`
  background-color: black;
  width: calc(100% - 0.2rem);
  height: calc(100% - 0.2rem);
  position: absolute;
  border-radius: 5rem;
  top: 0.1rem;
  left: 0.1rem;
`;

const Container = styled.button`

  padding: 0.75rem 1.75rem;
  border-radius: 5rem;
  height: fit-content;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  background: linear-gradient(90deg, #5eff00, #5eff00, rgb(2, 0, 0), #5eff00, purple, blue, yellow);
  background-size: 400%;
  border-radius: 20px;


  @keyframes animate {
    0% {
      background-position: 0%;
    }
    100% {
      background-position: 400%;
    }
  }

  &:hover {
    animation: animate 8s linear infinite;
  }

  &:before {
    content: "";
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    z-index: -1;
    background: linear-gradient(45deg, #5eff00, #0a0700, #5eff00);
    background-size: 400%;
    border-radius: 40px;
    opacity: 0;
    transition: 0.5%;
  }

  &:hover:before {
    filter: blur(20px);
    opacity: 1;
    animation: animate 8s linear infinite;
  }
`;

const Icon = styled.img`
  width: 1.5rem;
`;

const Label = styled.label`
  font-family: "Nasalization";
  cursor: pointer;
  z-index: 2;

  @media (max-width: 768px) {
    display: ${({ icon }) => (icon ? "none" : "block")};
  }
`;

export default ({
  label,
  children,
  stroked = false,
  onClick = () => null,
  icon,
}) => {
  return (
    <Container onClick={() => onClick()}>
      {stroked && <Inset />}
      {icon && <Icon src={icon} />}
      <Label icon={!!icon} style={{ color: stroked ? "#0a0700" : "black" }}>
        {label || children}
      </Label>
    </Container>
  );
};
