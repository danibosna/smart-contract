require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

const { DEPLOYER_SIGNER_PRIVATE_KEY, INFURA_PROJECT_ID } = process.env;

module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: [DEPLOYER_SIGNER_PRIVATE_KEY],
    },
  },
};
