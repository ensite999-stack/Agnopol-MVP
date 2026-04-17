const hre = require("hardhat");

async function main() {
  console.log("正在启动 Agnopol 部署流程...");

  // 获取合约
  const Agnopol = await hre.ethers.getContractFactory("Agnopol");
  
  // 部署
  const agnopol = await Agnopol.deploy();
  
  console.log("正在等待 Base 网络确认...");
  await agnopol.waitForDeployment();
  
  const address = await agnopol.getAddress();
  
  console.log("=========================================");
  console.log("✅ 恭喜！Agnopol MVP 部署成功！");
  console.log("合约地址:", address);
  console.log("=========================================");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
