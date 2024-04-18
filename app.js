
import Web3 from 'https://cdn.jsdelivr.net/npm/web3@1.5.2/dist/web3.min.js';

const contractAddress = '0x3328358128832A260C76A4141e19E2A943CD4B6D';
const contractABI = [

        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "candidateName",
                    "type": "string"
                }
            ],
            "name": "addCandidate",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "candidates",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "voteCount",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "endElection",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getWiningCandidate",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "candidateName_",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getWiningCandidateIndex",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "winingCandidate_",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "startElection",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "candidateIndex",
                    "type": "uint256"
                }
            ],
            "name": "vote",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "voters",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "voted",
                    "type": "bool"
                },
                {
                    "internalType": "uint256",
                    "name": "candidate",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "votingAdmin",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    
    ];

let web3;
let contract;

const connectMetamask = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        web3 = new Web3(window.ethereum);
        contract = new web3.eth.Contract(contractABI, contractAddress);
        console.log('Connected to MetaMask');
        await displayCandidates(); // Add this line to call displayCandidates
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      }
    } else {
      console.error('MetaMask not detected');
    }
  };

  const startElection = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      await contract.methods.startElection().send({ from: accounts[0] });
      console.log('Election started');
      await displayCandidates(); // Add this line to call displayCandidates
    } catch (error) {
      console.error('Error starting election:', error);
    }
  };

const displayCandidates = async () => {
console.log('Displaying candidates...');
  try {
    const candidateSelect = document.getElementById('candidateSelect');
    candidateSelect.innerHTML = '';

    let i = 0;
    while (true) {
      try {
        const candidate = await contract.methods.candidates(i).call();
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `${candidate.name} - Votes: ${candidate.voteCount}`;
        candidateSelect.appendChild(option);
        i++;
      } catch (error) {
        break;
      }
    }
  } catch (error) {
    console.error('Error displaying candidates:', error);
  }
};

const vote = async () => {
    try {
      const candidateSelect = document.getElementById('candidateSelect');
      const candidateIndex = candidateSelect.value;
  
      const accounts = await web3.eth.getAccounts();
      const voterAddress = accounts[0];
  
      const voter = await contract.methods.voters(voterAddress).call();
      if (voter.voted) {
        alert('You have already voted!');
        return;
      }
  
      await contract.methods.vote(candidateIndex).send({ from: voterAddress });
      console.log('Vote submitted');
      alert('Vote submitted successfully!');
      await displayCandidates(); // Add this line to call displayCandidates
    } catch (error) {
      console.error('Error submitting vote:', error);
    }
  };

const displayResults = async () => {
  try {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    const winningCandidateIndex = await contract.methods.winningCandidateIndex().call();
    const winningCandidate = await contract.methods.candidates(winningCandidateIndex).call();

    const resultItem = document.createElement('div');
    resultItem.className = 'bg-white shadow-md rounded-md p-4';
    resultItem.innerHTML = `
      <h3 class="text-xl font-semibold mb-2">Winner</h3>
      <p class="text-lg">${winningCandidate.name}</p>
      <p class="text-gray-600">Votes: ${winningCandidate.voteCount}</p>
    `;
    resultsDiv.appendChild(resultItem);
  } catch (error) {
    console.error('Error displaying results:', error);
  }
};

// Event listeners
document.getElementById('connectMetamask').addEventListener('click', connectMetamask);
document.getElementById('startElectionBtn').addEventListener('click', startElection);
document.getElementById('voteButton').addEventListener('click', vote);

// Initial setup
connectMetamask(displayCandidates);
displayCandidates();
displayResults();