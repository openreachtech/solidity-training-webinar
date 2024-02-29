# solidity-training-webinar
ウェビナー用のSolidity学習資料

## 学習環境を作る
学習を進めるために必要なソフトウェアをインストールします。
既にインストール済みの方は飛ばしてください。

まずは、NodeJsをインストールします。v18系以上を入れるようにします。
```sh
# Mac
brew install node

# Windowsの方はダウンロードリンクより
https://nodejs.org/en/download
```

NodeJsと、それに付随して`npm`というパッケージマネージャーがインストールされていることを確認します。
```sh
node -v
npm -v
```

yarnという別のパッケージマネージャーをインストールします。
```sh
npm install --global yarn
```


## Contract開発
プロジェクトを初期化します。
```sh
yarn init
```
[hardhat](https://hardhat.org/)というスマートコントラクトの開発ツールをインストールします。
開発ツールとしては、[truffle](https://trufflesuite.com/)と並び、もっともよく使われるものです。
```sh
yarn add --dev hardhat
```

ツールの初期化コマンドを実行して、開発基盤のテンプレートを作ります。
```sh
npx hardhat init
```
コマンドラインに表示される選択肢のうち、２番目のTypescriptを選択します。
```sh
? What do you want to do? … 
  Create a JavaScript project
❯ Create a TypeScript project
  Create a TypeScript project (with Viem)
  Create an empty hardhat.config.js
  Quit
```
Enterを押します。
```
? Hardhat project root: › /path/to/solidity-training-webinar/contract
```
yesを選択します。
```sh
? Do you want to add a .gitignore? (Y/n) › y
```
yesを選択します。
```sh
? Do you want to install this sample project's dependencies with yarn (@nomicfoundation/hardhat-network-helpers @nomicfoundation/hardhat-verify chai hardhat-gas-reporter solidity-coverage @types/chai @types/mocha @types/node ts-node typescript @nomicfoundation/hardhat-toolbox @nomicfoundation/hardhat-chai-matchers @nomicfoundation/hardhat-ethers ethers @typechain/hardhat typechain @typechain/ethers-v6)? (Y/n) › y
```

Dependenciesとして、Libraryを追加する
```sh
yarn add @openzeppelin/contracts
yarn add --dev hardhat-deploy
```

## コントラクトのDeploy
Ethereumのテストネット（sepolia）へDeployします。
まずは、秘密鍵と[EtherscanのAPI Key](https://docs.etherscan.io/getting-started/viewing-api-usage-statistics)を`.env`ファイルに記載します。
.envファイルは.env.sampleをコピーして作ります。
```sh
cp .env.sample .env
```
そして、デプロイコマンドを実行します。
```sh
yarn deploy:sepolia
```
デプロイが正常に終了すると、デプロイされたアドレスが表示されます。

次に、EtherscanでコントラクトをVerifyします。この作業にはEtherscanのAPIキーが必要です。
この作業は任意ですが、行うことでコントラクトと簡単に通信するためのUIを得ることができるため、推奨されます。
```sh
# ERC20CappedのVerify
npx hardhat verify --network sepolia "0x..{Address of ERC20Capped}" "Capped ERC20" "CERC2" "1000"

# Output例
# Successfully verified contract ERC20Capped on the block explorer.
# https://sepolia.etherscan.io/address/0x66d21ec29f2B8e72626FACf3EBbFFc2458e6B221#code

# Simple NFTのVerify
npx hardhat verify --network sepolia "0x..{Address of SimpleNFT}" "Simple NFT" "SNFT"

# Output例
# Successfully verified contract SimpleNFT on the block explorer.
# https://sepolia.etherscan.io/address/0x0a5Ab3A96F07909F4025b29C4466c4Ef0D82048d#code
```
