import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const waitConfirmations = hre.network.name === "hardhat" ? 0 : 2;

  const { deployer } = await getNamedAccounts();

  await deploy("ERC20Capped", {
    from: deployer,
    args: ["Capped ERC20", "CERC2", "1000"],
    waitConfirmations,
    log: true,
    autoMine: true,
  });
};
export default func;
func.tags = ["erc20"];
