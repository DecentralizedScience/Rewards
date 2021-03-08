const Rewards = artifacts.require("./Rewards.sol");

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Rewards', ([deployer, author, reviewer, tipper]) => {
  let rewards;

  before(async () => {
    rewards = await Rewards.deployed()
  })

  describe('deployment', async () => {
    it('deploys succesfully', async () => {
      const address = await rewards.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })
  })
  describe('papers', async () => {
    let result, paperCount

    before(async () => {
      result = await rewards.createPaper('This is my first paper', { from: author })
      paperCount = await rewards.paperCount()
      paperCount = paperCount.toNumber()
    })

    it('creates papers', async () => {
      // SUCESS
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), paperCount , 'id is correct')
      assert.equal(event.title, 'This is my first paper', 'title is correct')
      assert.equal(event.tipAmount, '0', 'tip amount is correct')
      assert.equal(event.author, author, 'author is correct')

      // FAILURE: Paper must have title
      await rewards.createPaper('', { from: author }).should.be.rejected;
    })

    it('read first paper', async () => {
      const paper = await rewards.papers(paperCount - 1)
      const reviewerCount = await rewards.reviewerCount(paperCount - 1)
      assert.equal(paper.id.toNumber(), paperCount, 'id is correct')
      assert.equal(paper.title, 'This is my first paper', 'title is correct')
      assert.equal(paper.tipAmount, '0', 'tip amount is correct')
      assert.equal(paper.author, author, 'author is correct')
      assert.equal(reviewerCount.toNumber(), '0', 'reviewer list is empty')
    })

    it('add reviewer', async () => {
      paper = await rewards.addReviewer(paperCount - 1, reviewer, 'LGTM')
      const reviewerCount = await rewards.reviewerCount(paperCount - 1)
      assert.equal(reviewerCount.toNumber(), '1', 'have 1 reviewer')
    })

    it('allows users to tip reviewers', async () => {
      // Track the reviewer balance before purchase
      let oldReviewerBalance
      oldReviewerBalance = await web3.eth.getBalance(reviewer)
      oldReviewerBalance = new web3.utils.BN(oldReviewerBalance)

      result = await rewards.tipReviewer(paperCount - 1, reviewer, { from: tipper, value: web3.utils.toWei('1', 'Ether') })

      // SUCESS
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), '0', 'id is correct')
      assert.equal(event.title, 'This is my first paper', 'title is correct')
      assert.equal(event.tipAmount, '1000000000000000000', 'tip amount is correct')
      assert.equal(event.author, author, 'author is correct')
      assert.equal(event.reviewer, reviewer, 'reviewer is correct')

      // Check that reviewer received funds
      let newReviewerBalance
      newReviewerBalance = await web3.eth.getBalance(reviewer)
      newReviewerBalance = new web3.utils.BN(newReviewerBalance)

      let tipAmount
      tipAmount = web3.utils.toWei('1', 'Ether')
      tipAmount = new web3.utils.BN(tipAmount)

      const exepectedBalance = oldReviewerBalance.add(tipAmount)

      assert.equal(newReviewerBalance.toString(), exepectedBalance.toString())

      // FAILURE: Tries to tip a paper that does not exist
      await rewards.tipReviewer(99, { from: tipper, reviewer, value: web3.utils.toWei('1', 'Ether') }).should.be.rejected;
    })

  })
})