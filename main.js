const {Blockchain, Transaction} = require('./blockchain');
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
