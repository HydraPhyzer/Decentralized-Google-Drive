// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <=0.9.0;

contract Drive {
    struct Access {
        address User;
        bool Allow;
    }
    mapping(address => string[]) Links;
    mapping(address => mapping(address => bool)) Ownership;
    mapping(address => mapping(address => bool)) PreviousState;
    mapping(address => Access[]) AccessList;

    function Upload(address User, string memory URL) external {
        Links[User].push(URL);
    }

    function Display(address User) external view returns (string[] memory) {
        require(User == msg.sender || Ownership[User][msg.sender],"You Don't Have Access");
        return Links[User];
    }
    function Allow(address User) external {
        Ownership[msg.sender][User]=true;
        if(PreviousState[msg.sender][User]){
            for(uint I=0; I<AccessList[msg.sender].length;I++){
                if(AccessList[msg.sender][I].User==User){
                    AccessList[msg.sender][I].Allow=true;
                }
            }
        }
        else{
            AccessList[msg.sender].push(Access(User,true));
            PreviousState[msg.sender][User]=true;
        }
    }
    function DisAllow(address User) public {
        Ownership[msg.sender][User]=false;
            for(uint I=0; I<AccessList[msg.sender].length;I++){
                if(AccessList[msg.sender][I].User==User){
                    AccessList[msg.sender][I].Allow=false;
                }
            }
    }
    function ShareAccess() public view returns (Access[] memory) {
        return AccessList[msg.sender];
    }
}
