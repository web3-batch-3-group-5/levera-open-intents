# Token Bridge Contracts

L2 <> L3 token bridge for rollup 0xc9d324670908DbC09FdEc946B226602eD4A853E9

TxHash: [0x0d7bf8d79e86e3fd42696896dd3a0f5080c268cddc30234b79c897d803f7186d](https://sepolia.arbiscan.io/tx/0x0d7bf8d79e86e3fd42696896dd3a0f5080c268cddc30234b79c897d803f7186d)

```
{
  "chainInfo": {
    "chainName": "Leverabica Light",
    "chainId": 109695,
    "parentChainId": 421614,
    "rpcUrl": "https://leverabica.light.rpc.1ok69go.space",
    "chainOwner": "0x6dE5361925d8f869fA7dEECe6cF842CC703fE26f",
    "batchPoster": "0xA5C9F28bE3f5128fc1b33454231F17E8add8064b",
    "staker": "0x7C7bcF1d605F3fEe8E61bCa7605b3007C8b389be",
    "explorerUrl": "https://explorer.decaf.testnet.espresso.network"
  },
  "coreContracts": {
    "rollup": "0xc9d324670908DbC09FdEc946B226602eD4A853E9",
    "inbox": "0x78C1E59069A1f9dB44383544860d770C03B879FC",
    "outbox": "0xBFC13fddFa989a9B92D39CE21d39E95af978D936",
    "sequencerInbox": "0x33a9622020022a03Ff445A1130D287e787bC7CD6",
    "bridge": "0x2983FF5B26be753a1C3d16f313845BFFF015A747"
  },
  "tokenBridgeContracts": {
    "l2Contracts": {
      "customGateway": "0xAb2079E798449701e8f6bc308891823aFF97EBc7",
      "multicall": "0x279bE3ADe15E163A56C60A74F4711FC0D5424C6C",
      "proxyAdmin": "0x369ade358FaD32691284d06A25b05A4B2B37B29B",
      "router": "0x32C1d21c477D8aC91F1eE3afEBdcBB93EeC8d54F",
      "standardGateway": "0x2358Cbc8C7A98B06443a98d9d46D13b8B0f2a167",
      "weth": "0x3A8E844b04B78b4376fD3D5168a1d1C275A20310",
      "wethGateway": "0x965859594C98fBA4570F5C7D0791b8a6080A9fC7"
    },
    "l3Contracts": {
      "customGateway": "0x7c318E49Bf9fF1369A99Ece8665e2561B8E1fE1E",
      "multicall": "0x7DA74086B1AB14ce203459f447EAb92D4Fc160bE",
      "proxyAdmin": "0xfEA2d4121A533550AF5D1D687d71ec28C90140cD",
      "router": "0x453Dd7ff9680D44a94638FFf5389ECA4Fa70B393",
      "standardGateway": "0x1Eef5d21B8511BC7528f2450f4f7362D8CC88905",
      "weth": "0x18C44F7E3f62fAa6A0E550A0019423219224F027",
      "wethGateway": "0xa0EEED7661A5Ca4E912149AFeEe6173bB022762D"
    }
  }
}
```

### Testing on bridge.arbitrum.io

Steps:

1. Click `From` / `To` to open Select Source Network. Make sure Testnet mode ON.
2. Click `Add Custom Orbit Chain`
3. Copy and Paste the JSON configuration above and click `Add Chain`
4. Now, `Leverabica Light` can be searched on selected networks.
