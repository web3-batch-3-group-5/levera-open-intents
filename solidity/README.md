# ERC7683 Reference Implementation

## Overview

This project is centered around the [Base7683](./src/Base7683.sol) contract, which serves as the foundational component
for implementing the interfaces defined in the
[ERC7683 specification](https://github.com/across-protocol/ERCs/blob/master/ERCS/erc-7683.md). The contract is designed
to be highly flexible, supporting any `orderDataType` and `orderData`. The logic for handling specific `orderData` types
within the process of resolving and filling orders is intentionally left unimplemented, allowing inheriting contracts to
define this behavior.

While adhering to the `ERC7683` standard, `Base7683` introduces additional functionality for `settling` and `refunding`
orders. These functions are not part of the `ERC7683` specification but are included to provide a unified interface for
solvers and users across all implementations built on this framework.

Inheriting contracts must implement several key internal functions to define their specific logic for order resolution,
filling, settlement, and refunds. These include:

- `_resolveOrder(GaslessCrossChainOrder memory _order)` and `_resolveOrder(OnchainCrossChainOrder memory _order)` for
  resolving orders into a hydrated format.
- `_fillOrder(bytes32 _orderId, bytes calldata _originData, bytes calldata _fillerData)` for processing and filling
  orders.
- `_settleOrders(bytes32[] calldata _orderIds, bytes[] memory _ordersOriginData, bytes[] memory _ordersFillerData)` for
  settling batches of orders.
- `_refundOrders` for both `OnchainCrossChainOrder` and `GaslessCrossChainOrder` types, enabling the implementation of
  specific refund logic.
- `_localDomain()` to retrieve the local domain identifier.
- `_getOrderId` for computing unique identifiers for both `GaslessCrossChainOrder` and `OnchainCrossChainOrder` types.

These functions ensure that each inheriting contract provides its specific behavior while maintaining a consistent
interface across the framework. You'll find more details of this function interfaces documented on the
[Base7683](./src/Base7683.sol).

As reference, the following contracts build upon `Base7683`:

1. [BasicSwap7683](./src/BasicSwap7683.sol) The `BasicSwap7683` contract extends `Base7683` by implementing logic for a
   specific `orderData` type as defined in the [OrderEncoder](./src/libs/OrderEncoder.sol). This implementation
   facilitates token swaps, enabling the exchange of an `inputToken` on the origin chain for an `outputToken` on the
   destination chain.

2. [Hyperlane7683](./src/Hyperlane7683.sol) The `Hyperlane7683` contract builds on `BasicSwap7683` by integrating
   `Hyperlane` as the interchain messaging layer. This layer ensures seamless communication between chains during order
   execution.

## Scripts

### Deploy

- Run `npm install` from the root of the monorepo to install all the dependencies
- Create a `.env` file base on the [.env.example file](./.env.example) file, and set the required variables depending
  which script you are going to run.

Set the following environment variables required for running all the scripts, on each network.

- `NETWORK`: the name of the network you want to run the script
- `API_KEY_ALCHEMY`: your Alchemy API key

If the network is not listed under the `rpc_endpoints` section of the [foundry.toml file](./foundry.toml) you'll have to
add a new entry for it.

For deploying the router you have to run the `yarn run:deployLeverabica`. Make sure the following environment variable
are set:

- `DEPLOYER_PK`: deployer private key
- `MAILBOX`: address of Hyperlane Mailbox contract on the chain
- `PERMIT2`: Permit2 address on `NETWORK_NAME`. If it doesn't exist, you can run `yarn run:deployPermit2`.
- `ROUTER_OWNER`: address of the router owner
- `PROXY_ADMIN_OWNER`: address of the ProxyAdmin owner, `ROUTER_OWNER` would be used if this is not set. The router is
  deployed using a `TransparentUpgradeableProxy`, so a ProxyAdmin contract is deployed and set as the admin of the
  proxy.
- `HYPERLANE7683_SALT`: a single use by chain salt for deploying the the router. Make sure you use the same on all
  chains so the routers are deployed all under the same address.
- `DOMAINS`: the domains list of the routers to enroll, separated by commas

### Open an Order

For opening an onchain order you can run `yarn run:openOrder`. Make sure the following environment variable are set:

- `ROUTER_OWNER_PK`: the router's owner private key. Only the owner can enroll routers
- `ORDER_SENDER`: address of order sender
- `ORDER_RECIPIENT`: address of order recipient
- `ITT_INPUT`: token input address
- `ITT_OUTPUT`: token output address
- `AMOUNT_IN`: amount in
- `AMOUNT_OUT`: amount out
- `DESTINATION_DOMAIN`: destination domain id

---

## Usage

This is a list of the most frequently needed commands.

### Build

Build the contracts:

```sh
$ yarn build
```

### Clean

Delete the build artifacts and cache directories:

```sh
$ yarn clean
```

### Coverage

Get a test coverage report:

```sh
$ yarn coverage
```

### Format

Format the contracts:

```sh
$ yarn sol:fmt
```

### Gas Usage

### Lint

Lint the contracts:

```sh
$ yarn lint
```

### Test

Run the tests:

```sh
$ yarn test
```

Generate test coverage and output result to the terminal:

```sh
$ yarn test:coverage
```

Generate test coverage with lcov report (you'll have to open the `./coverage/index.html` file in your browser, to do so
simply copy paste the path):

```sh
$ yarn test:coverage:report
```
