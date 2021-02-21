pragma solidity ^0.8.0;

import "./ReputationToken.sol";

uint constant REPUTATION = 1;

contract Rewards {
    mapping(string => bool) public hasGivenReputation;
    ReputationToken public reputationtoken;

    struct Paper {
        uint id;
        string title;
        uint tipAmount;
        address author;
        address[] reviewers;
        mapping(address => string) reviews;
    }

    Paper[] public papers;

    event PaperCreated(
        uint id,
        string title,
        uint tipAmount,
        address author
    );

    event ReviewerAdded(
        uint id,
        string title,
        address author,
        address payable reviewer
    );

    event ReviewerTipped(
        uint id,
        string title,
        uint tipAmount,
        address author,
        address payable reviewer
    );

    event ReputationGiven(
        uint id,
        address payable reviewer,
        address user
    );

    event ReputationTaken(
        uint id,
        address payable reviewer,
        address user
    );

    function createPaper(string memory _title) public {
        require(bytes(_title).length > 0);
        Paper storage paper = papers.push();
        paper.id = papers.length;
        paper.title = _title;
        paper.author = msg.sender;
        emit PaperCreated(paper.id, _title, 0, msg.sender);
    }

    function addReviewer(uint _id, address payable _reviewer, string memory review) public {
        require(_id < papers.length);
        require(_reviewer != papers[_id].author); // Can't review yourself TODO: check review not empty
        papers[_id].reviewers.push(_reviewer);
        papers[_id].reviews[_reviewer] = review;

        emit ReviewerAdded(_id, papers[_id].title, papers[_id].author, _reviewer);
    }

    function tipReviewer(uint _id, address payable _reviewer) public payable{
        require(_id < papers.length);

        papers[_id].tipAmount += msg.value;
        _reviewer.transfer(msg.value);

        emit ReviewerTipped(_id, papers[_id].title, msg.value, papers[_id].author, _reviewer);
    }

    function giveReputation(uint _id, address payable _reviewer) public payable{
        require(_id < papers.length);
        require(bytes(papers[_id].reviews[_reviewer]).length != 0);
        string memory _hash = string(abi.encode(_id, _reviewer, msg.sender));
        require(!hasGivenReputation[_hash]);
        reputationtoken.mint(_reviewer, REPUTATION);

        emit ReputationGiven(_id,  _reviewer, msg.sender);
    }

    function undoGiveReputation(uint _id, address payable _reviewer) public payable{
        require(_id < papers.length);
        string memory _hash = string(abi.encode(_id, _reviewer, msg.sender));
        require(hasGivenReputation[_hash]);
        reputationtoken.burn(_reviewer, REPUTATION);

        emit ReputationTaken(_id,  _reviewer, msg.sender);
    }

    function getReputation(address _reviewer) public view returns (uint256) {
        return reputationtoken.balanceOf(_reviewer);
    }

    function paperCount() public view returns (uint256) {
        return papers.length;
    }

    function reviewerCount(uint _id) public view returns (uint256) {
        require(_id < papers.length);
        return papers[_id].reviewers.length;
    }
}