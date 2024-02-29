import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const waitConfirmations = hre.network.name === "hardhat" ? 0 : 2;

  const { deployer } = await getNamedAccounts();

  await deploy("SimpleNFT", {
    from: deployer,
    args: ["Simple NFT", "SNFT"],
    waitConfirmations,
    log: true,
    autoMine: true,
  });
};
export default func;
func.tags = ["nft"];
