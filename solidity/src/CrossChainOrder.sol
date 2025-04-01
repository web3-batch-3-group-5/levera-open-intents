// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.25 <0.9.0;

import { TypeCasts } from "@hyperlane-xyz/libs/TypeCasts.sol";
import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import { Hyperlane7683 } from "../src/Hyperlane7683.sol";
import { OrderData, OrderEncoder } from "../src/libs/OrderEncoder.sol";

import { OnchainCrossChainOrder } from "../src/ERC7683/IERC7683.sol";

struct CrossChainOrderData {
    address recipient;
    address inputToken;
    address outputToken;
    uint256 amountIn;
    uint256 amountOut;
    address destinationRouter;
    uint32 destinationDomain;
}

contract CrossChainOrder {
    mapping(address => uint256) public nonces;

    // arbitrum-sepolia
    // address public router = 0x3E20e8cc2a4BE1a82fE1543334Ac907ac2f6e12A;
    // leverabicalight
    address public router = 0xBb4B6D2F1A81053d3BA50B5F8B6D4EAC3B36F39E;

    function open(CrossChainOrderData calldata orderData) public {
        uint32 originDomain = Hyperlane7683(router).localDomain();
        uint32 fillDeadline = type(uint32).max;
        uint256 senderNonce = nonces[msg.sender] == 0 ? 1 : nonces[msg.sender];

        ERC20(orderData.inputToken).transferFrom(msg.sender, address(this), orderData.amountIn);
        ERC20(orderData.inputToken).approve(router, orderData.amountIn);

        OrderData memory order = OrderData(
            TypeCasts.addressToBytes32(msg.sender),
            TypeCasts.addressToBytes32(orderData.recipient),
            TypeCasts.addressToBytes32(orderData.inputToken),
            TypeCasts.addressToBytes32(orderData.outputToken),
            orderData.amountIn,
            orderData.amountOut,
            senderNonce,
            originDomain,
            uint32(orderData.destinationDomain),
            TypeCasts.addressToBytes32(orderData.destinationRouter),
            fillDeadline,
            new bytes(0)
        );

        OnchainCrossChainOrder memory onchainOrder =
            OnchainCrossChainOrder(fillDeadline, OrderEncoder.orderDataType(), OrderEncoder.encode(order));

        nonces[msg.sender] += nonces[msg.sender] == 0 ? 2 : 1;
        Hyperlane7683(router).open(onchainOrder);
    }
}
