pragma circom 2.0.0;

include "../node_modules/circomlib/circuits/poseidon.circom";

template Withdraw() {
    signal input secret;      // 只有你知道的私钥
    signal input nullifier;   // 只有你知道的随机数
    signal output commitment; // 存钱时的凭证
    signal output nullifierHash; // 取钱时的防重花凭证

    component commitmentHasher = Poseidon(2);
    commitmentHasher.inputs[0] <== nullifier;
    commitmentHasher.inputs[1] <== secret;
    commitment <== commitmentHasher.out;

    component nullifierHasher = Poseidon(1);
    nullifierHasher.inputs[0] <== nullifier;
    nullifierHash <== nullifierHasher.out;
}

component main = Withdraw();
