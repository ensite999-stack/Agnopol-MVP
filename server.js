// ===== 依赖 =====
const express = require("express");
const cors = require("cors");
const { ethers } = require("ethers");

// ===== 初始化 =====
const app = express();
app.use(cors());
app.use(express.json());

// ===== 固定签名消息（前后端必须一致）=====
const MESSAGE = "Agnopol verification";

// ===== 连接 Base 链 =====
const provider = new ethers.providers.JsonRpcProvider(
  "https://mainnet.base.org"
);

// ===== 路由：验证 + 余额 =====
app.post("/verify", async (req, res) => {
    const { address, signature } = req.body;

    // 基本校验
    if (!address || !signature) {
        return res.status(400).json({
            error: "Missing address or signature"
        });
    }

    try {
        // 1️⃣ 验证签名（证明你控制这个地址）
        const recovered = ethers.verifyMessage(MESSAGE, signature);

        if (recovered.toLowerCase() !== address.toLowerCase()) {
            return res.status(400).json({
                error: "Invalid signature"
            });
        }

        // 2️⃣ 查询链上余额（Base 链 ETH）
        const balanceWei = await provider.getBalance(address);

        // 转换为 ETH（更易读）
        const balance = ethers.utils.formatEther(balanceWei);

        // 3️⃣ 返回增强凭证
        const credential = {
            address: address,
            balance: balance,
            valid_until: Date.now() + 5 * 60 * 1000 // 5分钟有效
        };

        return res.json(credential);

    } catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
});

// ===== 健康检查 =====
app.get("/", (req, res) => {
    res.send("Agnopol MVP with balance is running");
});

// ===== 启动服务 =====
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
