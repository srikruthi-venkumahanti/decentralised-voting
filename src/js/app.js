let web3;
let contract;
let adminAddress;
let electionState;
let electionCount;

//connect metamask and contract
const connectMetamask = async () => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      web3 = new Web3(window.ethereum);
      contract = new web3.eth.Contract(contractABI, contractAddress);
      console.log('Connected to MetaMask');
      await updateAdminAddress();
      await displayCandidates();
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
    }
  } else {
    console.error('MetaMask not detected');
    alert('Please install MetaMask to use this application.');
  }
};

//utility functions
const updateAdminAddress = async () => {
  adminAddress = await contract.methods.getVotingAdmin().call();
}

const updateElectionState = async () => {
  electionState = await contract.methods.getElectionState().call();
}

const updateElectionCount = async () => {
  electionCount = await contract.methods.getElectionCount().call();
}

//check if current user is admin
const checkAdmin = async () =>{
  try{

    console.log('Checking authorisation');
    const accounts = await web3.eth.getAccounts();

    if(accounts[0].toLowerCase() != adminAddress.toLowerCase()){
      alert('Unauthorised to add candidates.');
    }
  } catch(error){
    console.error('Error checking authorisation: ', error);
  }
}

//fetch candidates from smart contract and display
const displayCandidates = async () => {
  console.log('Displaying candidates...');
  const candidateSelect = document.getElementById('candidateSelect');
  candidateSelect.innerHTML = '';

  await updateElectionState();
  await updateElectionCount();

  if(electionState){
    try {

      const candidateCount = await contract.methods.getCandidateCount().call();
      
      let i = 0;
      while (i<candidateCount) {
        try {
          const candidate = await contract.methods.getCandidateByIndex(i).call();
          const option = document.createElement('option');
          option.value = i;
          option.textContent = `${candidate.name}`;
          candidateSelect.appendChild(option);
          i++;
        } catch (error) {
          break;
        }
      }
    } catch (error) {
      console.error('Error displaying candidates:', error);
    }
  } else {
    if (electionCount == 1)
      alert('Election already over');
    else
      alert('Election not started yet.');
  }
};

//register vote
const vote = async () => {

  await updateElectionState();

  if(electionState){
    try {
      const candidateSelect = document.getElementById('candidateSelect');
      const candidateIndex = candidateSelect.value;
      const accounts = await web3.eth.getAccounts();
      const voterAddress = accounts[0];
      const isValidVoter = await contract.methods.isValidVoter(voterAddress).call();

      if (!isValidVoter) {
        alert('You have already voted!');
        return;
      }

      await contract.methods.vote(candidateIndex).send({ from: voterAddress });
      console.log('Vote submitted');
      alert('Vote submitted successfully!');
      await displayCandidates();
    } catch (error) {
      console.error('Error submitting vote:', error);
    }
  } else {
      alert('Election not started yet.');
  }
};


//event listeners
document.getElementById('connectMetamask').addEventListener('click', connectMetamask);
document.getElementById('voteButton').addEventListener('click', vote);
document.getElementById('addCandidatesTab').addEventListener('click', checkAdmin);

// Initial setup
connectMetamask();
