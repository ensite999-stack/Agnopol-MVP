require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    "base-sepolia": {
      url: process.env.QUICKNODE_RPC_URL || "",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
  },
  // 核心修改：配置 BaseScan 验证
  etherscan: {
    apiKey: {
      // 注意：这里的名字必须和 customChains 里的 network 对应
      "base-sepolia": process.env.BASESCAN_API_KEY 
    },
    customChains: [
      {
        network: "base-sepolia",
        chainId: 84532,
        urls: {
          apiURL: "https://api-sepolia.basescan.org/api",
          browserURL: "https://sepolia.basescan.org"
        }
      }
    ]
  }
};
