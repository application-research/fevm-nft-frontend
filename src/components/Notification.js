import closeIcon from "assets/close.svg";
import { useDispatch, useSelector } from "react-redux";
import { toggleNotification } from "store/notification";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  top: 2rem;
  right: 2rem;
  padding: 1rem;
  border-radius: 1rem;
  z-index: 10000;
  background-color: #000000e6;
  backdrop-filter: blur(10px);
  min-width: 4rem;
  min-height: 3rem;
  display: ${({ open }) => (open ? "block" : "none")};
`;

const CloseIcon = styled.img.attrs({ src: closeIcon })`
  width: 1rem;
  filter: invert(1) opacity(0.72);
`;

const CloseBtn = styled.button`
  width: 2rem;
  aspect-ratio: 1;
  outline: none;
  border: none;
  cursor: pointer;
  display: grid;
  place-content: center;
  border-radius: 0.5rem;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background-color: #ffffff11;

  &:hover {
    background-color: #ffffff29;

    ${CloseIcon} {
      filter: invert(1) opacity(1);
    }
  }
`;

const Message = styled.p`
  color: #ffffffcc;
  padding: 0.125rem;
  margin: 0 3rem 0 0;
`;

const Description = styled.small`
  color: #ffffffcc;
  opacity: 0.64;
`;

export default () => {
  const dispatch = useDispatch();

  const isNotificationsPopupOn = useSelector(
    (state) => state.notification.isNotificationsPopupOn
  );

  const { message, description } = useSelector((state) => state.notification);

  return (
    <Container open={isNotificationsPopupOn}>
      <CloseBtn onClick={() => dispatch(toggleNotification({ toggle: false }))}>
        <CloseIcon />
      </CloseBtn>
      <Message>{message}</Message>
      <Description>{description}</Description>
    </Container>
  );
};
