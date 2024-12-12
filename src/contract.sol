// SPDX-License-Identifier: MIT

pragma solidity 0.8.0;

contract Coffee{

    // state variables
    address s_owner;

    // constructor
    constructor() {
        // set owner
        s_owner = msg.sender;
    }

    // function to donate funds
    function donate() external payable {
        // transfer funds to the contract
        payable(address(this)).transfer(msg.value);
    }


    // function to withdraw funds
    function withdraw() external {
        require(msg.sender == s_owner, "You are not the owner");
        
        // transfer funds to the owner
        uint256 currentBalance = balance();
        payable(s_owner).transfer(currentBalance);

    }

    // function to return balance
    function balance() public view returns(uint256){
        return address(this).balance;
    }

    // receive()
    receive () external payable{}
}