const { expect } = require("chai");

describe("Platzi Punk Contract", () => {
  const setup = async ({ maxSupply = 10000 }) => {
    const [owner] = await ethers.getSigners();
    const PlatziPunk = await ethers.getContractFactory("PlatziPunk");
    const deployed = await PlatziPunk.deploy(maxSupply);

    return {
      owner,
      deployed,
    };
  };

  describe("Deployment", () => {
    it("Sets max supply to passed param", async () => {
      const maxSupply = 4000;
      const { deployed } = await setup({ maxSupply });
      const returnedMaxSupply = await deployed.maxSupply();

      expect(maxSupply).to.equal(returnedMaxSupply);
    });
  });

  describe("Minting", () => {
    it("Mint a new token and assigns it to owner", async () => {
      const { deployed, owner } = await setup({});
      await deployed.mint();
      const ownerOfMinted = await deployed.ownerOf(0);

      expect(ownerOfMinted).to.equal(owner.address);
    });

    it("Has a minting limit", async () => {
      const maxSupply = 2;
      const { deployed } = await setup({ maxSupply });

      // Mint All
      await Promise.all([deployed.mint(), deployed.mint()]);

      //Assert the last minting
      await expect(deployed.mint()).to.be.revertedWith("No PlatziPunk left :(");
    });
  });

  describe("tokenURI", () => {
    it("Return a valid metadata", async () => {
      const { deployed } = await setup({});

      deployed.mint();

      const tokenURI = await deployed.tokenURI(0);
      const stringifiedTokenURI = await tokenURI.toString();
      const [, base64JSON] = stringifiedTokenURI.split(
        "data:application/json;base64,"
      );
      const stringifiedMetadata = await Buffer.from(
        base64JSON,
        "base64"
      ).toString("ascii");
      const metadata = JSON.parse(stringifiedMetadata);
      expect(metadata).to.have.all.keys("name", "description", "image");
    });
  });
});
