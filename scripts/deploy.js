// 注意：这里改成了直接从 'hardhat' 引入
const ethers = require("hardhat").ethers;

async function main() {
  console.log("正在启动 Agnopol 部署流程...");

  // 直接使用引入的 ethers
  const Agnopol = await ethers.getContractFactory("Agnopol");
  
  console.log("正在发送部署交易...");
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
  console.error("部署失败，错误详情:");
  console.error(error);
  process.exitCode = 1;
});
