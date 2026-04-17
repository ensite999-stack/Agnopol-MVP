// ===== 依赖 =====
const express = require("express");
const cors = require("cors");
const { ethers } = require("ethers");

// ===== 初始化 =====
const app = express();
app.use(cors());
app.use(express.json());

// ===== 固定签名消息（必须前后端一致）=====
const MESSAGE = "Agnopol verification";

// ===== 路由：验证签名 =====
app.post("/verify", (req, res) => {
    const { address, signature } = req.body;

    // 基本检查
    if (!address || !signature) {
        return res.status(400).json({
            error: "Missing address or signature"
        });
    }

    try {
        // 🔑 核心：恢复签名地址
        const recovered = ethers.verifyMessage(MESSAGE, signature);

        if (recovered.toLowerCase() !== address.toLowerCase()) {
            return res.status(400).json({
                error: "Invalid signature"
            });
        }

        // ✅ 生成最小凭证（MVP）
        const credential = {
            address: address,
            valid_until: Date.now() + 5 * 60 * 1000 // 5分钟有效
        };

        return res.json(credential);

    } catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
});

// ===== 健康检查（部署用）=====
app.get("/", (req, res) => {
    res.send("Agnopol MVP is running");
});

// ===== 启动服务 =====
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
