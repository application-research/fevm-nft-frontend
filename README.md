# FEVM ERC721 Minter application

Basic scaffolding frontend for minting ERC721 tokens on the FEVM.

![image](https://user-images.githubusercontent.com/4479171/208225445-aa642ffa-b713-4eee-96cb-b11e3ddcf65d.png)


## Metamask and TFIL
- Set up your metamask using the following instructions [here](https://docs.filecoin.io/fvm/how-tos/add-to-metamask/)
- Make sure you have TFIL before deploying the contract. Get your TFIL [here](https://wallaby.network/#faucet)

## Setup
If you deployed your own NFT contract, you need to replace the contract constant variable and the ABI data structure.

```
export const ERC721 = "0x40760ebD8282aF760Ee604f75d6B271c93b653Af";
export const ERC721ABI = []; // you can grab the abi on the build folder of the contracts OR on remix.
```

## Install and Run
```
npm install
npm start
```
