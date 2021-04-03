const SHA256 = require('crypto-js/sha256');

class Transaction{
    constuctor(fromAddress, toAddress, amount){
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
        this.miningRewards = 100;
    }

    createGenesisBlock(){
        return new Block( "03/29/2021", "Genesis block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    /*addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }*/
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

/*console.log('Mining Block: 1...Yay! 87 Seaira Coins Trasnfer!');
SeairaCoin.addBlock(new Block(1, "03/29/2021", { amount: 87 }));

console.log('Mining Block: 2...Yay! 1067 Seaira Coins Trasnfer');
SeairaCoin.addBlock(new Block(2, "03/29/2021", { amount: 1067 }));

console.log('Mining Block: 3... SUCCESS eh Yay! 9 Seaira Coins Trasnfer');
SeairaCoin.addBlock(new Block(3, "03/29/2021", { amount: 9 }));

console.log('Mining Block: 4...Yay! 11942 Seaira Coins Trasnfer');
SeairaCoin.addBlock(new Block(4, "03/29/2021", { amount: 11941 }));

console.log('Mining Block: 5...Yay! 1387 Seaira Coins Trasnfer!');
SeairaCoin.addBlock(new Block(1, "03/29/2021", { amount: 1387 }));

console.log('Mining Block: 6...Yay! 19967 Seaira Coins Trasnfer');
SeairaCoin.addBlock(new Block(2, "03/29/2021", { amount: 19967 }));

console.log('Mining Block: 7... SUCCESS eh Yay! 967 Seaira Coins Trasnfer');
SeairaCoin.addBlock(new Block(3, "03/29/2021", { amount: 679 }));

console.log('Mining Block: 8...Yay! 142 Seaira Coins Trasnfer');
SeairaCoin.addBlock(new Block(4, "03/29/2021", { amount: 142 }));

console.log('is blockchain valid? ' + SeairaCoin.isChainValid());
console.log(JSON.stringify(SeairaCoin, null, 4));localStorage*/