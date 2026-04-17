const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("部署账户:", deployer.address);

  // 1. 部署合规注册表
  const Registry = await hre.ethers.getContractFactory("AgnopolRegistry");
  const registry = await Registry.deploy(deployer.address);
  await registry.waitForDeployment();
  const registryAddress = await registry.getAddress();
  console.log("AgnopolRegistry 部署成功:", registryAddress);

  // 2. 部署主协议
  const Agnopol = await hre.ethers.getContractFactory("Agnopol");
  const agnopol = await Agnopol.deploy(); 
  await agnopol.waitForDeployment();
  console.log("Agnopol 主协议部署成功:", await agnopol.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
