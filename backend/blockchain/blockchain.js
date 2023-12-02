// blockchain.js

class Block {
    constructor(index, previousHash, timestamp, data, hash, nonce, criminalInfo) {
      this.index = index;
      this.previousHash = previousHash;
      this.timestamp = timestamp;
      this.data = data;
      this.hash = hash;
      this.nonce = nonce;
      this.criminalInfo = criminalInfo;
    }
  }
  
  const crypto = require('crypto');
  
  class Blockchain {
    constructor() {
      this.chain = [this.createGenesisBlock()];
      this.difficulty = 4; // Adjust difficulty as needed
    }
  
    createGenesisBlock() {
      return new Block(0, '0', new Date().toISOString(), 'Genesis Block', this.calculateHash('0'), 0);
    }
  
    getLatestBlock() {
      return this.chain[this.chain.length - 1];
    }
  
    mineBlock(data, criminalInfo) {
      const previousBlock = this.getLatestBlock();
      const timestamp = new Date().toISOString();
      let nonce = 0;
      let hash = this.calculateHash(`${previousBlock.index}${previousBlock.hash}${timestamp}${data}${nonce}`);
  
      while (hash.substring(0, this.difficulty) !== '0'.repeat(this.difficulty)) {
        nonce++;
        hash = this.calculateHash(`${previousBlock.index}${previousBlock.hash}${timestamp}${data}${nonce}`);
      }
  
      const newBlock = new Block(
        previousBlock.index + 1,
        previousBlock.hash,
        timestamp,
        data,
        hash,
        nonce,
        criminalInfo
      );
  
      this.chain.push(newBlock);
      return newBlock;
    }
  
    calculateHash(input) {
      return crypto.createHash('sha256').update(input).digest('hex');
    }
  }
  
module.exports = { Block, Blockchain };
  