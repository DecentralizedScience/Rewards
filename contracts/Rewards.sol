pragma solidity ^0.8.0;

contract Rewards {
    uint public paperCount = 0;
    mapping(string => bool) public hasGivenReputation;//hash

    struct Paper {
        uint id;
        string title;
        uint tipAmount;
        address author;
        uint reviewerCount;
        mapping(address => string) reviewers;
    }

    Paper[] public papers;

    event PaperCreated(
        uint id,
        string title,
        uint tipAmount,
        address author
    );

    event reviewerTipped(
        uint id,
        string title,
        uint tipAmount,
        address author,
        address payable reviewer
    );

    function createPaper(string memory _title) public {
        require(bytes(_title).length > 0);
        Paper storage paper = papers.push();
        paper.id = paperCount;
        paper.title = _title;
        paper.author = msg.sender;
        emit PaperCreated(paperCount, _title, 0, msg.sender);
        paperCount++;
    }

    function addReviewer(uint _id, address payable _reviewer, string memory review) public {
        require(_id < paperCount);
        papers[paperCount].reviewers[_reviewer] = review;
        //TODO emit Reviewer added
        papers[paperCount].reviewerCount++;
    }

    function tipReviewer(uint _id, address payable _reviewer) public payable{
        require(_id < paperCount);

        papers[_id].tipAmount += msg.value;
        _reviewer.transfer(msg.value);

        emit reviewerTipped(paperCount, papers[_id].title, msg.value, papers[_id].author, _reviewer);
    }
}