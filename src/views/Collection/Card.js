import { truncate } from "lodash";
import styled from "styled-components";
import GradientBtn from "../../components/GradientBtn";
import GradientMintBtn from "../../components/GradientMintBtn";
import { BASE_URI_TX, RARITY_API } from "utils/contracts";
import useSound from 'use-sound';
import mintSound from 'assets/button-3.mp3';
import hiddenRep from 'assets/hidden_rep.png';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { useEffect, useState } from "react";
import axios from "axios";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '0',
  },
};

Modal.setAppElement('#root');

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 3fr 1fr;
`;

const ModalContainer = styled.div`
  width: 50%;
  height: 50%;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 3fr 1fr;
`;

const Card = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 1rem;
  background: #4c1735;
  border: 1px solid #4c173580;
  width: 100%;
  height: 100%;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Details = styled.div`
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  margin: 0.5rem 0;
`;

const Title = styled.h3`
  color: #5eff00;
  margin: 0.125rem 0;
`;

const Addr = styled.p`
  color: #ffffff;
  margin: 0.125rem 0;
  font-size: 12px;
  opacity: 0.72;
`;

const Symbol = styled.p`
  margin: 0.125rem 0;
  color: #5eff00;
  background-color: #ff008729;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
`;
const Type = styled.small`
  color: white;
  opacity: 0.42;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;


export default ({
  cid,
  tokenId,
  contractAddress,
  decimals,
  name,
  src,
  symbol,
  type,
  uri,
  blockHash,
  hash
}) => {

  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  let dataResponse = {
    metadata: String,
    tokenId: String,
    totalSupply: String,
    traitRarityScores: {
      background: Number
    },
    totalRarityScore: String
  }
  const [metadata, setMetadata] = useState({

  });

  const openModal = async () => {
    console.log(tokenId);
    await axios.get(`${RARITY_API}${tokenId}`)
      .then(res => {
        console.log(res.data);
        dataResponse =  res.data;
        console.log(dataResponse);
      })
      .catch(err => {
        console.log(err);
      });
    //console.log(metadata.traitRarityScores);      
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Container>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Modal"
      >
        <Card>
          {/* //{metadata.map((object, i) => <ObjectRow obj={object} key={i} />)} */}
          <Details>
            <Title>{name} | {tokenId} </Title>
            <Addr>{truncate(hash, { length: 50 })}</Addr>
            {/* <div>{dataResponse.traitRarityScores}</div> */}
            <Column>
              <Row><Type>Background</Type><Symbol>{dataResponse.traitRarityScores.background}</Symbol></Row>
              <Row>adssad</Row>
            </Column>

          </Details>
          <GradientMintBtn onClick={closeModal}>close</GradientMintBtn>
        </Card>
        {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form> */}

      </Modal>

      <Card>{src && <Image src={src} />}</Card>
      <Details>
        <Column>
          <Title>{name} | {tokenId} </Title>
          <Addr>{truncate(hash, { length: 27 })}</Addr>
          <Row>
            <Symbol>{symbol}</Symbol>
            <Type>{type}</Type>
          </Row>
          <Row>
            <GradientMintBtn
              label="TXN"
              onClick={(event) => { window.open(BASE_URI_TX + hash, "_blank") }} />
            <GradientMintBtn 
          label="IPFS"
          onClick={(event) => {window.open(src, "_blank")}}/>
            {/* <GradientMintBtn
              label="Rarity"
              disabled={true}
              onClick={console.log('')} /> */}
          </Row>
        </Column>
      </Details>
    </Container>
  );
};
