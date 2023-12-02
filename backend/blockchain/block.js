//block.js

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

module.exports = Block;

  