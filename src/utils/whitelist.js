

    const ethers = require('ethers');
    const {ERC721} = require("./contracts.js");

    const signer = provider.getSigner();
    const address = signer.getAddress();
    const contract = new ethers.Contract(ERC721, ERC721ABI, signer);
