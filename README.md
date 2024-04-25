Requirements

Node.js (version – 18.14.0)
Metamask
Ganache
Truffle 

-------------------------------------------------------------------------------------------

Installation
Open a terminal.
Clone the repository by running the following command:
git clone https://github.com/Krish-Depani/Decentralized-Voting-System.git

Download and install Ganache.

In Ganache, create a workspace named "development". In the Truffle projects section, click the "ADD PROJECT" button and select truffle-config.js.
Download the Metamask extension for your browser.
Create a wallet in Metamask, then import accounts from Ganache.
Add a network to Metamask with the following details:
Network name: Localhost 3001
//RPC URL: http://localhost:7545
Chain ID: 1337
Currency symbol: ETH

Install Truffle globally by executing:
npm -i install truffle

Navigate to the root directory of the repository and install the required Node.js modules by running:
npm install

-------------------------------------------------------------------------------------------
Usage

Open a terminal and navigate to the project directory.
Launch Ganache and select its development workspace.
In the project's root directory, open another terminal and execute the command:
truffle console

Inside the Truffle console, compile the smart contracts by typing:
Compile

Exit the Truffle console.


In a new terminal window, migrate the Truffle contracts to the local blockchain:
truffle migrate

-------------------------------------------------------------------------------------------

Code Structure

votingWebV2.1
│
├── build
│   └── contracts
│       └── Voting.json
│
|── contracts
│   └── VotingV2.2.sol
│
├── migrations
│   ├── .gitkeep
│   └── 1_initial_migration.js
│
├── node_modules
│
├── src
│   ├── css
│   │   ├── index.css
│   │   └── output.css
│   ├── html
│   │   ├── addcandidates.html
│   │   ├── index.html
│   │   └── results.html
│   └── js
│       ├── admin.js
│       ├── app.js
│       ├── contractProperties.js
│       └── result.js
│
├── .DS_Store
├── .gitkeep
├── package-lock.json
├── package.json
├── server.js
├── tailwind.config.js
└── truffle-config.js




