// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Agnopol {
    event Shielded(address indexed user, uint256 amount);

    // 资产进入协议的功能
    function shield() public payable {
        require(msg.value > 0, "Must send ETH");
        emit Shielded(msg.sender, msg.value);
    }

    // 查看协议余额
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
