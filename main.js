const {Blockchain, Transaction} = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('79078ff5f18bd28102901cdc20e109330539786e3901bde6e473ee1bcfedadec');
const myWalletAddress = myKey.getPublic('hex');


let seairaCoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, 'Public key goes here', 10);
tx1.signTransaction(myKey);
seairaCoin.addTransaction(tx1);


/*const tx2 = new Transaction(myWalletAddress, 'Public key goes here', 85);
tx2.signTransaction(myKey);
seairaCoin.addTransaction(tx2);*/


/*seairaCoin.createTransaction(new Transaction('address 1', 'address 2', 100));
seairaCoin.createTransaction(new Transaction('address 2', 'address 1', 50));*/



console.log('\n Starting the Miner 49er...');
seairaCoin.minePendingTransactions(myWalletAddress);

console.log('\nBalance of Jacques is', seairaCoin.getBalanceOfAddress(myWalletAddress));

console.log('Is chain valid?', seairaCoin.isChainValid());

/*seairaCoin.chain[1].transactions[0].amount = 1;*/

/*console.log('\n Starting the Miner 49er...again...');
seairaCoin.minePendingTransactions('Jacques-address');

console.log('\nBalance of Jacques is', seairaCoin.getBalanceOfAddress('Jacques-address'));

console.log('\n Starting the Miner 49er..yet....again...');
seairaCoin.minePendingTransactions('Jacques-address');

console.log('\nBalance of Jacques is', seairaCoin.getBalanceOfAddress('Jacques-a'));*/
