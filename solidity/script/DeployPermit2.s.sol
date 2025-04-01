// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.25 <0.9.0;

import { Script } from "forge-std/Script.sol";
import { console2 } from "forge-std/console2.sol";
import { Permit2 } from "@uniswap/permit2/src/Permit2.sol";

bytes32 constant SALT = bytes32(uint256(0x0000000000000000000000000000000000000000d3af2663da51c10215000000));

contract DeployPermit2 is Script {
    function setUp() public { }

    function run() public returns (Permit2 permit2) {
        uint256 deployerPrivateKey = vm.envUint("DEPLOYER_PK");
        vm.startBroadcast(deployerPrivateKey);

        permit2 = new Permit2{ salt: SALT }();
        console2.log("Permit2 Deployed:", address(permit2));

        vm.stopBroadcast();
    }
}
