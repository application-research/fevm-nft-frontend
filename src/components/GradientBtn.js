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
  outline: none;
  border: none;
  cursor: pointer;
  background: radial-gradient(circle at center, #5eff00, transparent 40%),
  radial-gradient(circle at top left, #5eff00, transparent 12%),
  radial-gradient(circle at top right, #5eff00, transparent 15%),
  radial-gradient(circle at bottom right, #5eff00, transparent 30%),
  radial-gradient(circle at bottom left, #5eff00, transparent 25%),
  linear-gradient(96deg, #0a0700 0%, #020000 100%);
  padding: 0.75rem 1.75rem;
  border-radius: 5rem;
  height: fit-content;
  width: fit-content;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  &:hover {
    ${Inset} {
      background-color: #25051bfa;
    }
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
      <Label icon={!!icon} style={{ color: stroked ? "#faf6f6" : "black" }}>
        {label || children}
      </Label>
    </Container>
  );
};
