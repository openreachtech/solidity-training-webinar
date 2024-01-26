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
```


yarn add --dev hardhat-deploy


# deploy
```sh
yarn deploy:sepolia
```