import brand from "assets/brand.png";
import logo from "assets/logo.png";
import metamaskIcon from "assets/metamask.png";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { setAddress } from "store/global";
import { toggleNotification } from "store/notification";
import styled from "styled-components";
import { centerEllipsis } from "utils/helpers";
import { ROUTES } from "../constants";
import { TEST_NET } from "../utils/contracts";
import GradientMintBtn from "./GradientMintBtn";

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: space-between;
  padding: 1rem 2rem 2rem 0rem;
  position: fixed;
  backdrop-filter: blur(10px);
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
  width: 100%;
  top: 0;
  z-index: 100;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;
const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Socials = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    display: none;
  }
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

const Logo = styled.img.attrs({ src: logo })`
  width: 5rem;
`;

const Links = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const Link = styled.button`
  outline: none;
  border: none;
  cursor: pointer;
  border-radius: 0.5rem;
  padding: 0.25rem 0.5rem;
  background-color: transparent;
  color: white;
  text-transform: uppercase;
  font-family: "Nasalization";
  font-size: 15px;
  opacity: 0.64;

  &.active {
    opacity: 0.92;
  }
`;

const Brand = styled.img.attrs({ src: brand })`
  width: 12rem;
  padding: 0px 0px 0px 2rem;
`;

const Options = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 1024px) {
    padding-bottom: 1rem;
  }
`;

export default () => {
  const dispatch = useDispatch();
  const [metamaskConnected, setMetamaskConnected] = useState(
    localStorage.getItem("sampleNftMetamaskConnected")
  );
  const address = useSelector((state) => state.global.address);

  const { pathname } = useLocation();

  const navigate = useNavigate();

  const connectMetamask = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const network = await provider.getNetwork();
      console.log(network.chainId);
      if (network.chainId !== 31415) {
        dispatch(
          toggleNotification({
            message: "Wrong Network Detected.",
            description: "Please connect to Oasis Test Network",
          })
        );

        return;
      } else {
        if (
          localStorage.getItem("sampleNftMetamaskConnected") &&
          accounts.length == 0
        ) {
          setMetamaskConnected(false);
          localStorage.setItem("sampleNftMetamaskConnected", false);
        }

        await window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((accounts) => {
            if (accounts.length > 0) {
              dispatch(setAddress(accounts[0].toLowerCase()));
              setMetamaskConnected(true);
              localStorage.setItem("sampleNftMetamaskConnected", true);
            }
          });
      }
    } else {
      dispatch(
        toggleNotification({
          message: "No Metamask Found!",
          description:
            "For using this application, you need to install metamask in your browser.",
        })
      );
    }
  };

  const clearMetamaskConnection = async () => {
    setMetamaskConnected(false);
    localStorage.setItem("sampleNftMetamaskConnected", false);
  };

  if (window.ethereum) {
    window.ethereum.on("accountsChanged", function (accounts) {
      dispatch(setAddress(accounts[0].toLowerCase()));
      setMetamaskConnected(true);
      localStorage.setItem("sampleNftMetamaskConnected", true);
    });
  }

  useEffect(async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.listAccounts();

    if (
      localStorage.getItem("sampleNftMetamaskConnected") &&
      accounts.length == 0
    ) {
      setMetamaskConnected(false);
      localStorage.setItem("sampleNftMetamaskConnected", false);
    }

    if (localStorage.getItem("sampleNftMetamaskConnected")) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.listAccounts();
      dispatch(setAddress(accounts[0].toLowerCase()));
    }
  }, []);

  return (
    <Container>
      <Left>
  <br/>
      </Left>
      <Right>
        <Links>
          {ROUTES.map(({ id, title, link }) => (
            <Link
              key={id}
              onClick={() => navigate(link)}
              className={pathname === link ? "active" : ""}
            >
              {title}
            </Link>
          ))}
        </Links>
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
        <Options>
          {TEST_NET ? (
            <GradientMintBtn
              stroked={true}
              onClick={(event) =>
                window.open("https://faucet.testnet.oasis.dev/", "_blank")
              }
              label="Get Emerald Test Network Tokens"
            />
          ) : (
            console.log("Main")
          )}
          <GradientMintBtn
            icon={metamaskIcon}
            onClick={connectMetamask}
            label={
              metamaskConnected ? centerEllipsis(address) : "Connect Wallet"
            }
          />
        </Options>
      </Right>
    </Container>
  );
};