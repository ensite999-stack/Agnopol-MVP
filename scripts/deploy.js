const { ethers } = require("hardhat");

async function main() {
  console.log("正在启动 Agnopol 部署流程...");

  // 1. 获取合约工厂
  const Agnopol = await ethers.getContractFactory("Agnopol");
  
  console.log("正在向 Base Sepolia 网络提交交易...");
  
  // 2. 部署合约
  const agnopol = await Agnopol.deploy();
  
  // 3. 等待部署确认
  await agnopol.waitForDeployment();
  
  const address = await agnopol.getAddress();
  
  console.log("=========================================");
  console.log("✅ 恭喜！Agnopol MVP 部署成功！");
  console.log("合约地址:", address);
  console.log("=========================================");
}

main().catch((error) => {
  console.error("部署过程中发生错误:");
  console.error(error);
  process.exitCode = 1;
});
