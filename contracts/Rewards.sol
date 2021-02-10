pragma solidity ^0.8.0;

contract Rewards {
    uint public paperCount = 0;
    mapping(uint => Paper) public papers;


    struct Paper {
        uint id;
        string title;
        uint tipAmount;
        address author;
        address payable reviewer;
    }

    event PaperCreated(
        uint id,
        string title,
        uint tipAmount,
        address author,
        address payable reviewer
    );

    event PaperTipped(
        uint id,
        string title,
        uint tipAmount,
        address author,
        address payable reviewer
    );

    function createPaper(string memory _title, address payable _reviewer) public {
        require(bytes(_title).length > 0);
        papers[paperCount] = Paper(paperCount, _title, 0, msg.sender, _reviewer);
        emit PaperCreated(paperCount, _title, 0, msg.sender, _reviewer);
        paperCount++;
    }

    function tipPaper(uint _id) public payable{
        require(_id < paperCount);
        Paper memory _paper = papers[_id];

        address payable _reviewer = _paper.reviewer;
        _paper.tipAmount += msg.value;

        _reviewer.transfer(msg.value);

        papers[_id] = _paper;
        emit PaperTipped(paperCount, _paper.title, _paper.tipAmount, _paper.author, _reviewer);
    }
}