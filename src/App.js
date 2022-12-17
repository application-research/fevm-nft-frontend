import Footer from "components/Footer";
import Header from "components/Header";
import Notification from "components/Notification";
import View from "components/View";
import { useDispatch } from "react-redux";
import { toggleNotification } from "store/notification";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: auto;
  padding: 1rem;
  background: radial-gradient(circle at center, #ff00731a, transparent 40%),
  radial-gradient(circle at top left, #020000, transparent 12%),
  radial-gradient(circle at top right, #5eff00, transparent 15%),
  radial-gradient(circle at bottom right, #020000, transparent 30%),
  radial-gradient(circle at bottom left, #5eff00, transparent 25%),
  linear-gradient(96deg, #11010a 0%, #3535353b 100%);

  &::-webkit-scrollbar {
    width: 7px;
    height: 7px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #72174b80;
    border-radius: 5rem;
  }

  &::-webkit-scrollbar-corner {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #ff008780;
  }
`;

export default () => {
  const dispatch = useDispatch();

  if (window.ether) {
    window.ethereum.on("accountsChanged", (_) => {
      dispatch(
        toggleNotification({
          message:
            "Account Change Detected In Metamask. Please re-connect your wallet.",
        })
      );
    });

    window.ethereum.on("networkChanged", (_) => {
      dispatch(
        toggleNotification({
          message:
            "Network Change Detected In Metamask. Please ensure you are connected to Network.",
        })
      );
    });
  }

  return (
    <Container>
      <Notification />
      <Header />

      <View />
      <Footer />
    </Container>
  );
};
