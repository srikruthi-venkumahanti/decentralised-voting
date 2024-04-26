Requirements
Node.js 
Metamask
Ganache
Truffle 
Installation
Open a terminal.
Clone the repository by running the following command:
git clone https://github.com/srikruthi-venkumahanti/decentralised-voting.git

Download and install Ganache.

In Ganache, create a workspace and name it. In the Truffle projects section, click the "ADD PROJECT" button and select truffle-config.js.
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

Usage
Open a terminal and navigate to the project directory.
Launch Ganache and select its development workspace.
In the project's root directory, open terminal 


In the terminal window, migrate the Truffle contracts to the local blockchain:
truffle migrate

updating the contract address in the contract properties JavaScript file:
Navigate to the directory where your project's JavaScript files are located.
Look for a file named contractProperties.js.
Use a text editor or an IDE to open the contract properties file.
In the contract properties file, find the section where the contract address is defined
const contractAddress = "  "; 

Copy the contract address from ganache (first one is the admin address)
Replace the existing contract address in the contract properties file with the new contract address.
 Save the contract properties file after making the necessary updates.
8. Now start your application. in the same location in terminal , run: 

npm start


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




