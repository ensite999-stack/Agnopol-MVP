const hre = require("hardhat");

async function main() {
  const Agnopol = await hre.ethers.getContractFactory("Agnopol");
  const agnopol = await Agnopol.deploy();
  await agnopol.waitForDeployment();
  console.log("-----------------------------------------");
  console.log("Agnopol MVP 部署成功！");
  console.log("地址:", await agnopol.getAddress());
  console.log("-----------------------------------------");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
