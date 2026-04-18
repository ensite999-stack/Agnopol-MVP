const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("🚀 开始部署 Agnopol 协议...");
  console.log("部署账户:", deployer.address);

  // 1. 部署合规注册表
  const Registry = await hre.ethers.getContractFactory("AgnopolRegistry");
  const registry = await Registry.deploy(deployer.address);
  await registry.waitForDeployment();
  const regAddr = await registry.getAddress();
  console.log("✅ Registry 已部署至:", regAddr);

  // 2. 部署主协议
  const Agnopol = await hre.ethers.getContractFactory("Agnopol");
  const agnopol = await Agnopol.deploy();
  await agnopol.waitForDeployment();
  const agnAddr = await agnopol.getAddress();
  console.log("✅ Agnopol 已部署至:", agnAddr);

  // --- 关键：自动验证代码 ---
  console.log("⏳ 等待 30 秒让区块确认，随后开始自动验证...");
  await new Promise(resolve => setTimeout(resolve, 30000));

  try {
    // 验证 Registry (带构造参数)
    await hre.run("verify:verify", {
      address: regAddr,
      constructorArguments: [deployer.address],
    });

    // 验证 Agnopol (无构造参数)
    await hre.run("verify:verify", {
      address: agnAddr,
      constructorArguments: [],
    });
    console.log("🎉 所有合约已完成 BaseScan 验证！去看看你的绿勾吧！");
  } catch (error) {
    console.log("❌ 验证过程中出现小插曲:", error.message);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
