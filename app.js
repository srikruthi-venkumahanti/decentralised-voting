// Connect to the Ethereum network and the voting contract
const web3 = new Web3(window.ethereum);
const contractAddress = '0x123...'; // Replace with the actual contract address
const votingContractABI = [...]; // Replace with the ABI of the voting contract

const votingContract = new web3.eth.Contract(votingContractABI, contractAddress);

// Function to display the list of candidates
async function displayCandidates() {
    const candidateCount = await votingContract.methods.getCandidateCount().call();
    const candidateSelect = document.getElementById('candidateSelect');
    candidateSelect.innerHTML = '';

    for (let i = 0; i < candidateCount; i++) {
        const candidate = await votingContract.methods.candidates(i).call();
        const option = document.createElement('option');
        option.value = candidate.id;
        option.textContent = candidate.name;
        candidateSelect.appendChild(option);
    }
}

// Function to display the election results
async function displayResults() {
    const resultsList = document.getElementById('results');
    if (resultsList) {
        resultsList.innerHTML = '';
        const candidateCount = await votingContract.methods.getCandidateCount().call();

        for (let i = 0; i < candidateCount; i++) {
            const candidate = await votingContract.methods.candidates(i).call();
            const resultItem = document.createElement('li');
            resultItem.textContent = `${candidate.name}: ${candidate.voteCount} votes`;
            resultsList.appendChild(resultItem);
        }
    }
}

// Event listeners
document.getElementById('voteButton').addEventListener('click', async () => {
    const candidateSelect = document.getElementById('candidateSelect');
    const candidateId = candidateSelect.value;

    // Cast the vote
    await votingContract.methods.vote(candidateId).send({ from: web3.eth.defaultAccount });

    // Update the results
    displayResults();
});

document.getElementById('connectMetamask').addEventListener('click', async () => {
    // Request access to the user's MetaMask account
    await window.ethereum.request({ method: 'eth_requestAccounts' });
});

// Initial setup
displayCandidates();
displayResults();