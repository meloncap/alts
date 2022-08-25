# AltSearch - Security Analysis Tool for crypto projects

![AltSarch Banner](/public/assets/img/logos/home_banner.png)

AltSearch is an easy-to-use tool for crypto users so they can analyse their projects and retrieve all the information in one app. As of now, only Ethereum and BNB Chain networks are supported - more coming soon!

We currently fetch the data from different API endpoints such as [CoinGecko](https://www.coingecko.com), [Covalent](https://www.covalenthq.com), and [Go+ Security](https://gopluslabs.io), among others. In the near future more endpoints and tools will be integrated in order to offer a more complete tool for your analysis.

The project has been developed on [Next.js](https://nextjs.org/) as the front-end framework to provide an interface for the user. It's still on development so new futures and fixes will be integrated in the future.

You can clone this repository and add extra functionalities. You'll need to have installed Node.js and run `npm install` to install the project's dependencies. Lastly, you'll also have to generate your own API Keys and define them in `.env.local` in order to request some of the API endpoints.

## Basic Analysis

### 1) General Information 
Retrieved from CoinGecko such as the price and volume history in the past 30 days, its tags, CoinGecko and Market Capitalization Rank. On the bottom you can find more details about the price change, all time high and all time low and their dates.

![Basic Analysis: General Information](/public/assets/img/github_tutorial/basic/generalInformation.png)

### 2) Tokenomics
Summary of the top holders' token distribution, token supply and latest holders' transactions.

![Basic Analysis: Tokenomics](/public/assets/img/github_tutorial/basic/tokenomics.png)

### 3) Pools Stats
The statistics of the list of pools of the token on the different Decentralised Exchanges of the selected blockchain network.

![Basic Analysis: Pools Stats](/public/assets/img/github_tutorial/basic/poolStats.png)

## Advanced Analysis

### 1) Security Information
Using Go+ Security API we present a list of different security checks of the token's smart contract.

![Basic Advanced: Security Information](/public/assets/img/github_tutorial/advanced/securityInformation.png)

### 2) Source Code
The ABI and the smart contract's code of the project as well as some information of the compiler, license, optimisation and proxies used.

![Basic Advanced: Source Code](/public/assets/img/github_tutorial/advanced/sourceCode.png)

