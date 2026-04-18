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
  etherscan: {
    // 关键点：根据 Etherscan V2 升级要求，直接在最外层设置 apiKey
    apiKey: process.env.BASESCAN_API_KEY, 
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
