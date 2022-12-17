import axios from "axios";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import {
  BASE_URI_TOKEN_TXN,
  ERC721,
  ERC721ABI,
  PROVIDER,
} from "utils/contracts";
import Card from "./Card";
import loaderGif from 'assets/kingape.png';

const Title = styled.h2`
  color: #5eff00;
  margin: 0.5rem 0;
`;


const Head = styled.div`
  display: flex;
  gap: 0.25rem;
  flex-direction: column;
  margin: 1rem 0;
  margin-bottom: 2rem;

  @media (max-width: 1024px) {
    align-items: center;
  }
`;
const Sub = styled.h4`
  color: #ffffff;
  margin: 0.5rem 0;
`;

const Container = styled.div`
  margin: auto;
  max-width: 1920px;
`;
const Symbol = styled.p`
  margin: 0.125rem 0;
  color: #5eff00;
  background-color: #ff008729;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
`;
const Listings = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(auto-fill, minmax(min(200px, 100%), 1fr));
  gap: 1rem;

  @media (max-width: 1024px) {
    grid-template-columns: 100%;
    padding: 0 1rem;
  }
`;

export default () => {
  const [tokenList, setTokenList] = useState([]);
  const contract = new ethers.Contract(ERC721, ERC721ABI, PROVIDER);
  const address = useSelector((state) => state.global.address);
  const [loader, setLoader] = useState(loaderGif);
  const [loaderMessage, setLoaderMessage] = useState('');
  useEffect(async () => {
    
    try {

      setTokenList(
        await axios
          .get(`${BASE_URI_TOKEN_TXN}${address}`)
          .then(({ data: { result } }) =>
            Promise.all(
              (result || []).map(async (e) => {
                setLoaderMessage("Loading Tokens");
                if (
                  e.tokenName == "RoseApe" &&
                  e.tokenSymbol == "RPE" &&
                  e.contractAddress.toLowerCase() == `${ERC721}`.toLowerCase()
                ) {
                  const meta = await contract.tokenURI(e.tokenID);
                  const cid = meta.match(/(?<=ipfs:\/\/).*?(?=\/)/)[0];
                  const {
                    data: { description, name, image },
                  } = await axios.get(
                    meta.replace("ipfs://", "https://ipfs.io/ipfs/")
                  );
                  
                  return {
                    ...e,
                    uri: meta,
                    cid,
                    src: `https://ipfs.io/ipfs/${cid}${image}`,
                    blockHash: e.blockHash,
                    transactionHash: e.hash,
                    symbol: e.tokenSymbol,
                    type: "ERC-721",
                    name: name,
                    description: description,
                    tokenId: e.tokenID,
                  };
                }
              })
            )
          )
      );
    } catch (error) {
      console.log(error);
    }
  }, [address]);


  return (
    <Container>
       <Head>
        <Title>Estuary721 - Collections!</Title>
        <Sub>View your minted tokens!</Sub>
      </Head>
        <Sub>Once I figured it out. Your token and image will show here!</Sub>
      {
        <Listings>
          {((tokenList.length && tokenList) || []).map(
            (e) => e && <Card key={e.contractAddress} {...e} />
          )}
        </Listings>
      }
      
    </Container>
  );
};
