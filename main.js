const SHA256 = require('crypto-js/sha256');

class Transaction{
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}
class Block{
    constructor( timestamp, transactions, previousHash = ''){
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
    }
    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.transactions)+ this.nonce).toString();

    }

    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("block mined: "+ this.hash);

    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    createGenesisBlock(){
        return new Block( "03/29/2021", "Genesis block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    minePendingTransactions(miningRewardAddress){
        let block = new Block(Date.now(), this.pendingTransactions);
        block.mineBlock(this.difficulty);

        console.log('Block successfully mined!');
        this.chain.push(block);

        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];
    }

    createTransaction(transaction){
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address){
        let balance = 0;

        for(const block of this.chain){
            for(const trans of block.transactions){
                if(trans.fromAddress === address){
                    balance -= trans.amount;
                }

                if(trans.toAddress === address){
                    balance += trans.amount;
                }
            }
        }

        return balance;
    }

}

let seairaCoin = new Blockchain();
seairaCoin.createTransaction(new Transaction('address 1', 'address 2', 100));
seairaCoin.createTransaction(new Transaction('address 2', 'address 1', 50));



console.log('\n Starting the Miner 49er...');
seairaCoin.minePendingTransactions('Jacques-address');

console.log('\nBalance of Jacques is', seairaCoin.getBalanceOfAddress('Jacques-address'));

console.log('\n Starting the Miner 49er...again...');
seairaCoin.minePendingTransactions('Jacques-address');

console.log('\nBalance of Jacques is', seairaCoin.getBalanceOfAddress('Jacques-address'));

console.log('\n Starting the Miner 49er..yet....again...');
seairaCoin.minePendingTransactions('Jacques-address');

console.log('\nBalance of Jacques is', seairaCoin.getBalanceOfAddress('Jacques-address'));
