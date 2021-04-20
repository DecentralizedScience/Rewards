pragma solidity ^0.8.0;

import "./ReputationToken.sol";
import "./AwardsToken.sol";

uint constant REPUTATION = 1;

contract Rewards {
    mapping(string => bool) public hasGivenReputation;
    mapping(string => bool) public hasGivenAward;
    ReputationToken public reputationtoken;
    AwardsToken public awardsToken;

    constructor(ReputationToken _reputationToken, AwardsToken _awardsToken) {
        reputationtoken = _reputationToken;
        awardsToken = _awardsToken;
    }

    //TODO: asociar reviews, registrar reviewer

    struct Paper {
        uint id;
        string title;
        uint tipAmount;
        address author;
        address[] reviewers;
        mapping(address => string) reviews; //TODO update to array of strings
    }

    Paper[] public papers;
    mapping(address => bool) public reviewerExists;
    address[] public reviewers;
    string[] public awards;

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

    event AwardGiven(
        uint id,
        address payable reviewer,
        address user,
        uint awardId
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
        require(_reviewer != papers[_id].author);
        papers[_id].reviewers.push(_reviewer);
        papers[_id].reviews[_reviewer] = review;
        
        if(!reviewerExists[_reviewer]){
            reviewerExists[_reviewer] = true;
            reviewers.push(_reviewer);
        }

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

    function giveAward(uint _id, address payable _reviewer, uint _awardId ) public payable{
        require(_id < papers.length);
        require(_awardId < 4);
        require(bytes(papers[_id].reviews[_reviewer]).length != 0);
        string memory _hash = string(abi.encode(_id, _reviewer, msg.sender, _awardId));
        require(!hasGivenAward[_hash]);
        awardsToken.mint(_reviewer, _hash);
        awards.push(_hash);

        emit AwardGiven(_id,  _reviewer, msg.sender, _awardId);
    }

    function getAward() public view returns (string [] memory){
        string [] memory temp;

        return reviewers;
    }

    function getAwardsBalance(address _id) public view returns (uint){
        return awardsToken.balanceOf(_id);
    }

    function getReviewers() public view returns (address [] memory){
        return reviewers;
    }

    function getPaperReviewers(uint _id) public view returns (address [] memory){
        require(_id < papers.length);
        return papers[_id].reviewers;
    }

    function getPaperReviewsByReviewer(uint _id, address _reviewer) public view returns (string memory){
        require(getPaperReviewerCount(_id) > 0);
        return papers[_id].reviews[_reviewer];
    }

    function getPaperCount() public view returns (uint256) {
        return papers.length;
    }

    function getPaperReviewerCount(uint _id) public view returns (uint256) {
        require(_id < papers.length);
        return papers[_id].reviewers.length;
    }
}