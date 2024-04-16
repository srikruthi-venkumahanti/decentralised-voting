// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12 <0.9.0;

contract Voting {

    address public votingAdmin;

    bool electionState = false;

    struct Candidate{
      string name;
      uint voteCount;
    }

    struct Voter{
      bool voted;
      uint candidate;
    }

    Candidate[] public candidates;

    mapping(address => Voter) public voters;

    constructor(string[] memory candidateNames){ 

      votingAdmin = msg.sender;

      for (uint i = 0; i < candidateNames.length; i++) 
      {
        candidates.push(Candidate({
          name: candidateNames[i],
          voteCount: 0
        }));
      }
    }


    function startElection() public {
      
      require(msg.sender == votingAdmin, 'Not authorised to start election');
      require(!electionState, 'Already Started');
      electionState = true;

    }

    function endElection() public {

      require(msg.sender == votingAdmin, 'Not authorised to end election');
      require(electionState, 'Election not started');
      electionState = false;

    }

    function vote(uint candidate) public {
      
      require(electionState, 'Election not started');

      Voter storage sender = voters[msg.sender];
      require(!sender.voted, 'Already Voted');
      sender.voted = true;
      sender.candidate = candidate;

      candidates[candidate].voteCount++;
    }

    function winningCandidateIndex() public view returns (uint winningCandidate_){

      require(!electionState, 'Election still running');

      uint winningVoteCount = 0;
      for (uint i = 0; i < candidates.length; i++) 
      {
        if(candidates[i].voteCount > winningVoteCount){
          winningVoteCount = candidates[i].voteCount;
          winningCandidate_ = i;
        }
      }
    }


    function winningCandidate() public view returns (string memory candidateName_){

      uint candidateIndex = winningCandidateIndex();
      candidateName_ = candidates[candidateIndex].name;

    }


}
