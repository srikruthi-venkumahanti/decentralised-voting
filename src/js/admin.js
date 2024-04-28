let web3;
let contract;
let adminAddress;
let electionState;
let electionCount;

//connect to metamask and contract
const connectMetamask = async () => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      web3 = new Web3(window.ethereum);
      contract = new web3.eth.Contract(contractABI, contractAddress);
      console.log('Connected to MetaMask');
      await updateAdminAddress();
      await checkUser();
      await updateElectionState();
      await updateElectionCount();
      await displayCandidates();
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
    }
  } else {
    console.error('MetaMask not detected');
    alert('Please install MetaMask to use this application.');
  }
};

//update voting admin address
const updateAdminAddress = async () => {
  adminAddress = await contract.methods.getVotingAdmin().call();
}

//to check if election is running
const updateElectionState = async () => {
  electionState = await contract.methods.getElectionState().call();
}

//to get election count from contract
const updateElectionCount = async () => {
  electionCount = await contract.methods.getElectionCount().call();
}

//check of current user is admin user
const checkUser = async () =>{
  try{
    console.log('Checking authorisation');
    const accounts = await web3.eth.getAccounts();

    if(accounts[0].toLowerCase() != adminAddress.toLowerCase()){
      window.location.href = '/';
      throw new Error('Unauthorised to add candidates.');
      // alert('Unauthorised to add candidates.');
    }
  }catch(error){
    alert(error);
  }
}

//function to call startElection() function
const startElection = async () => {

  await updateElectionState();
  await updateElectionCount();

  if(!electionState && electionCount < 1){
    try {
      
      const accounts = await web3.eth.getAccounts();

      //checking admin
      if (accounts[0].toLowerCase() === adminAddress.toLowerCase()) {
        await contract.methods.startElection().send({ from: accounts[0] });
        console.log('Election started');
      } else {
        console.error('Only the admin can start the election');
        alert('Only the admin can start the election');
      }
    } catch (error) {
      console.error('Error starting election:', error);
    }
  } else {
    if (electionState)
      alert('Election running');
    else
      alert('Election already over.');
  }
};

//function to call endElection() function
const endElection = async () => {
  
  await updateElectionState();
  await updateElectionCount();

  if(electionState || electionCount < 1){
    try {
      const accounts = await web3.eth.getAccounts();

      //checking admin
      if (accounts[0].toLowerCase() === adminAddress.toLowerCase()) {
        await contract.methods.endElection().send({ from: accounts[0] });
        console.log('Election ended');
      } else {
        console.error('Only the admin can end the election');
        alert('Only the admin can end the election');
      }
    } catch (error) {
      console.error('Error ending election:', error);
    }
  } else {
    if(!electionState)
      alert('Election not running');
    else
      alert('Election already over');
  }
};

//get candidate name from text field and call addCandidate() function
const addCandidate = async () => {

  await updateElectionState();
  await updateElectionCount();

  if(!electionState && electionCount == 0){
    try{

      const candidateNameInput = document.getElementById('candidateName');
      const candidateName = candidateNameInput.value;
      
      if (candidateName.trim() !== ''){
        await contract.methods.addCandidate(candidateName).send({from: adminAddress});
        displayCandidates();
        candidateNameInput.value = '';
      } else {
        alert('Enter Candidate Name');
      }
    } catch(error){
      alert('Error adding candidate: ', error);
    }
  } else {
    if (electionState)
      alert('Election running');
    else
      alert('Election already over');
  }
}

//fetch candidates from smart contract and display
const displayCandidates = async() => {
  try{

    const candidateList = document.getElementById('candidateList');
    const candidateCount = await contract.methods.getCandidateCount().call();

    candidateList.innerHTML = '';
    
    let i = 0;
    while (i<candidateCount) {
      try {
        const candidate = await contract.methods.getCandidateByIndex(i).call();
        const listItem = document.createElement('li');
        listItem.textContent = `${candidate.name} - Votes: ${candidate.voteCount}`;
        candidateList.appendChild(listItem);
        i++;
      } catch (error) {
        break;
      }
    }
  } catch(error){
    console.error(error);
  }
}

//event listeners
document.getElementById('connectMetamask').addEventListener('click', connectMetamask);
document.getElementById('startElectionBtn').addEventListener('click', startElection);
document.getElementById('endElectionBtn').addEventListener('click', endElection);
document.getElementById('addCandidatesTab').addEventListener('click', checkUser);
document.getElementById('addCandidateButton').addEventListener('click', addCandidate);

//initalize
connectMetamask();
