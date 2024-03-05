# solidity-training-webinar
ウェビナー用のSolidity学習資料です。コントラクトの開発からDappsの開発に至るまで、一貫して学習を進めていきます。開発対象のコントラクトはERC20とERC721の2つから選択できます。

### 学習のステップ：
1. [開発環境の構築](#1-開発環境の構築)
2. [プロジェクトの初期化](#2-プロジェクトの初期化)
3. [コントラクトの開発](#3-コントラクトの開発)
4. [コントラクトのDeploy](#4-コントラクトのdeploy)
5. [SDKの開発](#5-SDKの開発)
6. [Dappsの開発](#6-Dappsの開発)

## 1. 開発環境の構築
学習を進めるために必要なソフトウェアをインストールします。
必要なソフトウェアは[Node.js](https://nodejs.org/en)と[Yarn](https://classic.yarnpkg.com/)のみです。既にインストールしてある方は、このステップをスキップしてください。

NodeJsをインストールします。v18系以上を入れるようにします。
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


## 2. プロジェクトの初期化
コントラクト開発をスムーズに進めるためのツールはいくつかありますが、その中でも特にメジャーなツールの一つが[Hardhat](https://hardhat.org/)です。
開発ツールとしては、[Truffle](https://trufflesuite.com/)と並んで最も広く使用されています。最近では、[Foundry](https://book.getfoundry.sh/)を採用するプロジェクトが増えているようです。

プロジェクトを初期化します。
```sh
yarn init
```
Hardhatをプロジェクトに追加します。
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

Dependenciesとして、Libraryを追加します。
コントラクト開発においてデファクトスタンダードとも言える[OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts)のライブラリを追加します。
コントラクト開発が通常のアプリ開発と異なる点は、セキュリティへの意識の高さです。開発されたコントラクトは、誰でもアクセス可能なブロックチェーン上に公開されるため、ハッキングのリスクに直接さらされます。このような背景から、コントラクト開発時にはセキュリティを重視した開発が求められ、そのためには実績あるコードを参考にするか、またはライブラリとして直接利用することが推奨されます。
```sh
yarn add @openzeppelin/contracts
yarn add --dev hardhat-deploy
```

## 3. コントラクトの開発
この教材では、[ERC20トークン](https://github.com/openreachtech/solidity-training-webinar/blob/main/contract/contracts/ERC20Capped.sol)と[NFT](https://github.com/openreachtech/solidity-training-webinar/blob/main/contract/contracts/SimpleNFT.sol)を例として挙げています。それぞれのコードは[contracts](https://github.com/openreachtech/solidity-training-webinar/tree/main/contract/contracts)フォルダ内にファイルとして存在します。コントラクトは、このcontractsフォルダ内に配置することが求められます。この場所に配置することで、Hardhatがコントラクトを認識し、コンパイルが可能になります。ERC20やNFTのコードの例を見ればお分かりの通り、大部分がライブラリを継承しています。ERCで標準化されているコントラクトは、このように簡単に開発できます。また、トークンのセールやNFTマーケットプレースの開発、あるいはより複雑なDEXの構築を望む場合でも、世には多くの実例がオープンソースとして公開されており、それらを参考にするのが適切です。

開発したコントラクトは、次のコマンドでコンパイルできます。
```
npx hardhat compile
```

## 4. コントラクトのDeploy
Hardhatでコントラクトをデプロイするには、専用のスクリプトの開発が必要です。スクリプトの実例については、[deploy](https://github.com/openreachtech/solidity-training-webinar/tree/main/contract/deploy)フォルダを参照してください。

まず、ローカル環境でデプロイが成功するかを確認してください。
```
npx hardhat deploy --network hardhat
```
問題がなければ、次にテストネットでのデプロイを試みましょう。今回は、EthereumのテストネットであるSepoliaを例にデプロイしてみます。

まずは、秘密鍵と[EtherscanのAPI Key](https://docs.etherscan.io/getting-started/viewing-api-usage-statistics)を`.env`ファイルに記載します。
.envファイルは.env.sampleをコピーして作ります。
```sh
cp .env.sample .env
```
その後、デプロイコマンドを実行します。Sepoliaネットワークの設定は[hardhat.config.ts](https://github.com/openreachtech/solidity-training-webinar/blob/main/contract/hardhat.config.ts)に記述しています。このファイルでHardhatに様々な設定を行います。
```sh
npx hardhat deploy --network sepolia
```
デプロイが正常に完了すると、デプロイされたアドレスが表示されます。

次に、EtherscanでコントラクトをVerifyします。この作業にはEtherscanのAPIキーが必要です。
この作業は任意ですが、実行することでコントラクトと簡単に通信するためのUIを得られるため、推奨されます。
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

## 5. SDKの開発
開発したコントラクトをフロントエンドに簡単に組み込むために、簡易的なSDKを作成します。このSDKは、コントラクトの関数を呼び出すためのシンプルな関数群で構成されています。[ERC20](https://github.com/openreachtech/solidity-training-webinar/blob/main/front-erc20/src/sdk.ts)と[NFT](https://github.com/openreachtech/solidity-training-webinar/blob/main/front-nft/src/sdk.ts)のそれぞれについて、実例を用意しています。

SDKでは、[ethers.js](https://docs.ethers.org/v6/)というライブラリを使用しています。これはEthereumで最も広く使用されているライブラリの一つであり、[Web3.js](https://web3js.readthedocs.io/en/v1.10.0/)とともによく使われます。このライブラリは、コントラクトとの通信を行うためのインターフェースを自動的に生成してくれます。また、EthereumのJSON RPCとの通信をラップする便利な関数群も多数提供しています。

例はビルド可能な状態で設定されています。次のコマンドでビルドを行います。
```sh
yarn build
```
ビルドが必要な理由は、TypeScriptで開発したため、JavaScriptにコンパイルする必要があるからです。今回、開発言語としてTypeScriptを選択した理由は、Web3プロジェクトの多くがTypeScriptを採用しているためです。JavaScriptはコンパイル不要である点が利点ですが、類似プロジェクトのコードを理解しやすくするためにも、TypeScriptを選びました。

## 6. Dappsの開発
DAppsの開発には、通常、充実したフロントエンドフレームワークが使用されます。例えば、[React](https://react.dev/)や[Vue.js](https://vuejs.org/)などです。[ReactとTruffleを統合した環境](https://archive.trufflesuite.com/boxes/react/)を利用することもありますが、汎用性を考慮して簡易的なSDKを開発し、それを組み込む方法が好ましいと考えられます。

フロントエンドフレームワークには、それ自体に関する多くの学習が必要ですので、今回は対象外とします。その代わりに、理解しやすいという理由から、[ERC20](https://github.com/openreachtech/solidity-training-webinar/blob/main/front-erc20/index.html)と[NFT](https://github.com/openreachtech/solidity-training-webinar/blob/main/front-nft/index.html)の例をそれぞれ、1ページのHTMLファイルとして用意しています。

例で提供されているフロントエンドを利用するためには、サーバーを起動する必要があります。
```sh
yarn start
```
その後、ローカルPCから[http://127.0.0.1:8080](http://127.0.0.1:8080)にアクセスすると、ページが表示されます。
