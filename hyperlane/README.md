# Hyperlane Workflow

### Prerequisites

- [Hyperlane CLI](https://docs.hyperlane.xyz/docs/reference/cli)
- A private key for contract transaction signing

### 1. Registry

Register custom chain

```
hyperlane registry init
```

### 2. Core

Register core contracts for leverabicalight and arbitrumSepolia (if customized Ism is desired)

```
# For leverabicalight
hyperlane core init --advanced
hyperlane core deploy

# For arbitrumSepolia
hyperlane core init --advanced
hyperlane core deploy
```

### 3. Warp Route

Register token using warp. Iterate below steps for laDAI, laUSDC, laUSDT, laWBTC and laWETH

```
hyperlane warp init
hyperlane warp deploy
```
