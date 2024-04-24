// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

//smart contract for Voting System
// Voting operations:
// 1. Voting Admin adds candidate, starts/ends the election
// 2. Voters to vote for candidates, can only vote once
// 3. Functions to calculate votes and return winner

contract Voting {

    //admin to election
    address public votingAdmin;

    //records state of election: True - election running, False - election is over 
    bool electionState = false;
    
    //Counter to check how many elections started
    uint electionCount = 0;

    //Defining Election Candidate Struct
    struct Candidate{
      string name;    //Candidate name
      uint voteCount; //total vote count of a candidate
    }
    
    Candidate[] public candidates; //array of candidates

    //Defining Voter Struct
    struct Voter{
      bool voted;       //boolean to check if the vote has already voted, True - Voted, False - Yet to Vote
      uint candidate;   //voter's choice of candidate's index
    }

    //creating mapping for Voters, Key - address, Value - voter
    mapping(address => Voter) public voters;

    //Defining Constructor to set the Voting admin address
    constructor(){ 
      votingAdmin = msg.sender;   //setting votingAdmin to current call address
    }

    //function to add candidate for election, by voting admin
    function addCandidate(string memory candidateName) public{

      //check if current caller is voting admin
      require(msg.sender == votingAdmin,'Not authorised to add candidate');
      require(!electionState, 'Election already started');
      require(electionCount==0, 'Election count exceeded');

      //push new candidate to candidates array
      candidates.push(Candidate({
        name: candidateName,
        voteCount: 0
      }));

    }
    
    //returns total number of candidates
    function getCandidateCount() public view returns (uint count_){
      count_ = candidates.length;
    }

    //returns candidate at index in candidates array
    function getCandidateByIndex(uint index) public view returns (Candidate memory candidate_){
      candidate_ = candidates[index];
    }

    //returns voting admin address
    function getVotingAdmin() public view returns (address adminAddress_){
      adminAddress_ = votingAdmin;
    }

    //returns true if voter is yet to vote
    function isValidVoter(address voterAddress) public view returns (bool isValid_){
      isValid_ = !voters[voterAddress].voted;
    }

    //return election state
    function getElectionState() public view returns (bool state_){
      state_ = electionState;
    }

    //return election count
    function getElectionCount() public view returns (uint count_){
      count_ = electionCount;
    }

    //function to start election by the voting admin
    function startElection() public {
      
      //check if current caller is voting admin
      require(msg.sender == votingAdmin, 'Not authorised to start election');
      require(!electionState, 'Already Started');
      require(electionCount==0, 'Election count exceeded');

      //check if there are atleast 2 candidates to start election
      require(candidates.length > 1, 'Not enough candidates');

      electionState = true;     //change election state to true to start election
     
      electionCount++;    //update election count

    }

    //funtion to end the election by the voting admin
    function endElection() public {

      //check if current caller is voting admin
      require(msg.sender == votingAdmin, 'Not authorised to end election');
      require(electionState, 'Election not started');

      electionState = false;      //change election state to false to end election

    }


    //function to cast vote
    function vote(uint candidateIndex) public {
      
      require(electionState, 'Election not started');
      
      Voter storage sender = voters[msg.sender];

      //check if voter already voted
      require(!sender.voted, 'Already Voted');

      sender.voted = true;                //update voted to true
      sender.candidate = candidateIndex;  //voted candidate's index

      //updating the vote count for candidate at voted index
      candidates[candidateIndex].voteCount++;
    }

    //function to get wining candidate's index
    function getWiningCandidateIndex() public view returns (uint winingCandidate_){

      //check if election is ended
      require(!electionState, 'Election still running');
      require(electionCount>0, 'Election Count is 0');

      uint winingVoteCount = 0;

      //get maximum votes from candidates array
      for (uint i = 0; i < candidates.length; i++) 
      {
        if(candidates[i].voteCount > winingVoteCount){
          winingVoteCount = candidates[i].voteCount;
          winingCandidate_ = i;      //returns candidate index
        }
      }

      //check to see if maximum votes are greater than 0
      if(winingVoteCount == 0){
        winingCandidate_ = candidates.length;    //setting wining candidate index to invalid index
      }
    }

}