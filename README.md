# Decentralised Voting

Decentralised Voting is a blockchain-based voting system.

## Requirements

- Node.js
- Metamask
- Ganache
- Truffle

## Installation

1. Open a terminal.
2. Clone the repository by running the following command:


  `git clone https://github.com/srikruthi-venkumahanti/decentralised-voting.git`

3. Download and install Ganache.
4. In Ganache, create a workspace and name it.
5. In the Truffle projects section, click the "ADD PROJECT" button and select `truffle-config.js`.
6. Download the Metamask extension for your browser.
7. Create a wallet in Metamask, then import accounts from Ganache.
8. Add a network to Metamask with the following details:
- Network name: Localhost 3001
- RPC URL: http://localhost:7545
- Chain ID: 1337
- Currency symbol: ETH

9. Install Truffle globally by executing:

`npm -i install truffle` 

10. Navigate to the root directory of the repository and install the required Node.js modules by running:

`npm install`

## Usage

1. Open a terminal and navigate to the project directory.
2. Launch Ganache and select its development workspace.
3. In the project's root directory, open terminal.
4. In the terminal window, migrate the Truffle contracts to the local blockchain:

`truffle migrate`

## Update the contract address in the contract properties JavaScript file

1. Navigate to the directory where your project's JavaScript files are located.
2. Look for a file named `contractProperties.js`.
3. Use a text editor or an IDE to open the contract properties file.
4. Find the section where the contract address is defined:

  `const contractAddress = "  ";`
  
5. Copy the contract address from Ganache (first one is the admin address).
6. Replace the existing contract address in the contract properties file with the new contract address.
7. Save the contract properties file after making the necessary updates.
8. Now start your application. in the same location in terminal, run:

`npm start`
9. Go to chrome and paste 'http://localhost:3001'

## Code Structure

```
votingWebV2.1
│
├── build
│   └── contracts           # Compiled contracts
│       └── Voting.json     # JSON representation of compiled smart contracts
│
├── contracts
│   └── VotingV2.2.sol      # Source code of the smart contract
│
├── migrations
│   ├── .gitkeep           
│   └── 1_initial_migration.js  # Truffle migration script for deploying migrations contract
│
├── node_modules            
│
├── src
│   ├── css
│   │   ├── index.css      # CSS styles for the project
│   │   └── output.css     # Compiled CSS output
│   ├── html
│   │   ├── addcandidates.html  # HTML file for adding candidates
│   │   ├── index.html     # Main HTML file for the project/ voting page
│   │   └── results.html   # HTML file for displaying voting results
│   └── js
│       ├── admin.js       # JavaScript file for admin functions
│       ├── app.js         # Main JavaScript file for the application
│       ├── contractProperties.js  # JavaScript file containing contract address
│       └── result.js      # JavaScript file for displaying voting results
│
├── .DS_Store              
├── .gitkeep               
├── package-lock.json      
├── package.json           
├── server.js              # Node.js server file
├── tailwind.config.js     # Tailwind CSS configuration file
└── truffle-config.js      # Truffle project configuration file
```


