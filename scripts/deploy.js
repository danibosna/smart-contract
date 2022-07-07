const { ethers } = require("hardhat");

const deploy = async () => {
  const [deployer] = await ethers.getSigners();

  console.log(`Deploying contract with the account: ${deployer.address}`);

  const PlatziPunk = await ethers.getContractFactory("PlatziPunk");
  const deployed = await PlatziPunk.deploy(10000);

  console.log(`PlatziPunk is deployed at: ${deployed.address}`);
};

deploy()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
