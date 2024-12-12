import logo from './logo.svg';
import './App.css';
import {Web3} from "web3"

const CONTRACT_ADDRESS = "0x49Fb911e2583EABfEf3EE6E0acfc1ebAaB5Bd094"
const ABI = [
	{
		"inputs": [],
		"name": "donate",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [],
		"name": "balance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

function App() {

  // initialize web3 with lisk testnet
  const web3 = new Web3(window.ethereum)

  // initialize contract
  const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS)

  async function balance(){
    // call()
    const balance = await contract.methods.balance().call()
    console.log("balance:", balance)
  }

  async function connectWallet(){
    const account = await web3.eth.requestAccounts()
    return account[0]
  }

  async function donate(){
    // send() from & value
    const msgSender = await connectWallet()
    console.log("msgsender", msgSender)
    const txReceipt = await contract.methods.donate().send({from: msgSender, value: web3.utils.toWei("1","ether")})
    console.log("Tx receipt:", txReceipt)
  }

  async function withdraw(){

    const msgSender = await connectWallet()

    console.log("msgsender", msgSender)

    const txReceipt = await contract.methods.withdraw().send({from: msgSender});

    console.log('tx receipt',txReceipt)

  }

  return (
    <div className="App">
      <header className="App-header">
      <button onClick={donate}>donate</button>
      <button onClick={withdraw}>withdraw</button>
      <button onClick={balance}>balance</button>
      </header>
    </div>
  );
}

export default App;
