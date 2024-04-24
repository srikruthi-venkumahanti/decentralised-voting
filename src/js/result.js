let web3;
let contract;
let adminAddress;
let electionState;
let electionCount;

const connectResultMetamask = async () => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      web3 = new Web3(window.ethereum);
      contract = new web3.eth.Contract(contractABI, contractAddress);
      console.log('Connected to MetaMask');
      await updateAdminAddress();
      await updateElectionState();
      await updateElectionCount();
      await displayResults();
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
    }
  } else {
    console.error('MetaMask not detected');
    alert('Please install MetaMask to use this application.');
  }
};

const updateAdminAddress = async () => {
  adminAddress = await contract.methods.getVotingAdmin().call();
}

const updateElectionState = async () => {
  electionState = await contract.methods.getElectionState().call();
}

const updateElectionCount = async () => {
  electionCount = await contract.methods.getElectionCount().call();
}

const displayResults = async () => {

  await updateElectionState();
  await updateElectionCount();

  console.log(electionState);

  if(!electionState && electionCount > 0){
  try {
    const resultsDiv = document.getElementById('results');
    if (resultsDiv) {
      resultsDiv.innerHTML = '';

      const i = await contract.methods.getWiningCandidateIndex().call();
      const winingCandidate = await contract.methods.getCandidateByIndex(i).call()

      const resultItem = document.createElement('div');
      resultItem.className = 'bg-white shadow-md rounded-md p-4';
      resultItem.innerHTML = `
        <h3 class="text-xl font-semibold mb-2">Winner</h3>
        <p class="text-lg">${winingCandidate.name}</p>
        <p class="text-gray-600">Votes: ${winingCandidate.voteCount}</p>
      `;
      resultsDiv.appendChild(resultItem);
    } 
} catch (error) {
    console.error('Error displaying results:', error);
  }
  } else {
    alert('Election not ended yet.');
  }
};

//event listeners
document.getElementById('connectMetamask').addEventListener('click', connectMetamask);

// Initial setup
connectResultMetamask();
