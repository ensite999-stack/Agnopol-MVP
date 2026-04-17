// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract AgnopolRegistry is AccessControl {
    bytes32 public constant COMPLIANCE_ADMIN_ROLE = keccak256("COMPLIANCE_ADMIN_ROLE");

    mapping(address => bool) public trustedIssuers;
    uint256 public globalRiskThreshold = 10;

    constructor(address _initialAdmin) {
        _grantRole(DEFAULT_ADMIN_ROLE, _initialAdmin);
        _grantRole(COMPLIANCE_ADMIN_ROLE, _initialAdmin);
    }

    function toggleIssuer(address _issuer, bool _status) external onlyRole(COMPLIANCE_ADMIN_ROLE) {
        trustedIssuers[_issuer] = _status;
    }

    function updateThreshold(uint256 _newThreshold) external onlyRole(COMPLIANCE_ADMIN_ROLE) {
        globalRiskThreshold = _newThreshold;
    }
}
