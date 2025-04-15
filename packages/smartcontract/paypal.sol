// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/**
 * @title PayPal-like Payment Contract
 * @dev A decentralized payment system allowing users to send requests and make payments
 * @notice This contract implements core PayPal-like functionality on Ethereum blockchain
 */
contract PayPal {
    /// @notice Address of the contract owner
    address public owner;

    /**
     * @dev Struct representing a payment request
     * @param requestor Address of the requester
     * @param amount Amount requested in wei
     * @param message Optional message with the request
     * @param name Display name of the requester (if set)
     */
    struct Request {
        address requestor;
        uint256 amount;
        string message;
        string name;
    }

    /**
     * @dev Struct representing a transaction record
     * @param action Either "Send" or "Receive"
     * @param amount Transaction amount in wei
     * @param message Optional transaction message
     * @param otherPartyAddress Counterparty address
     * @param otherPartyName Counterparty name (if set)
     */
    struct SendReceive {
        string action;
        uint256 amount;
        string message;
        address otherPartyAddress;
        string otherPartyName;
    }

    /**
     * @dev Struct representing a user's display name
     * @param name The display name
     * @param hasName Boolean indicating if name is set
     */
    struct UserName {
        string name;
        bool hasName;
    }

    /// @notice Mapping of addresses to their display names
    mapping(address => UserName) public names;

    /// @notice Mapping of addresses to their payment requests
    mapping(address => Request[]) public requests;

    /// @notice Mapping of addresses to their transaction history
    mapping(address => SendReceive[]) public history;

    /**
     * @dev Sets the deployer as the initial owner
     */
    constructor() {
        owner = msg.sender;
    }

    /**
     * @notice Allows a user to set their display name
     * @param _name The display name to set
     */
    function addName(string memory _name) public {
        names[msg.sender] = UserName(_name, true);
    }

    /**
     * @notice Creates a new payment request
     * @dev Stores the request in recipient's request array
     * @param user The address being requested to pay
     * @param _amount The amount to request (in wei)
     * @param _message Optional message with the request
     */
    function createRequest(address user, uint256 _amount, string memory _message) public {
        Request memory newRequest = Request(
            msg.sender,
            _amount,
            _message,
            names[msg.sender].hasName ? names[msg.sender].name : ""
        );
        requests[user].push(newRequest);
    }

    /**
     * @notice Pays a specific payment request
     * @dev Transfers ETH to requester and records transaction
     * @param _request The index of the request to pay
     * @notice The sent ETH value must match requested amount
     */
    function payRequest(uint256 _request) public payable {
        require(_request < requests[msg.sender].length, "Invalid request ID");
        Request storage payableRequest = requests[msg.sender][_request];

        payable(payableRequest.requestor).transfer(msg.value);
        addHistory(msg.sender, payableRequest.requestor, payableRequest.amount, payableRequest.message);

        // Remove the paid request
        requests[msg.sender][_request] = requests[msg.sender][requests[msg.sender].length-1];
        requests[msg.sender].pop();
    }

    /**
     * @dev Internal function to record transaction history
     * @param sender Address sending payment
     * @param receiver Address receiving payment
     * @param _amount Transaction amount in wei
     * @param _message Transaction message
     */
    function addHistory(address sender, address receiver, uint256 _amount, string memory _message) private {
        history[sender].push(SendReceive(
            "Send",
            _amount,
            _message,
            receiver,
            names[receiver].hasName ? names[receiver].name : ""
        ));

        history[receiver].push(SendReceive(
            "Receive",
            _amount,
            _message,
            sender,
            names[sender].hasName ? names[sender].name : ""
        ));
    }

    /**
     * @notice Gets all payment requests for a user
     * @param _user The address to query
     * @return Four arrays containing: requestor addresses, amounts, messages, and names
     */
    function getMyRequests(address _user) public view returns(
        address[] memory,
        uint256[] memory,
        string[] memory,
        string[] memory
    ) {
        Request[] storage userRequests = requests[_user];

        address[] memory addrs = new address[](userRequests.length);
        uint256[] memory amnt = new uint256[](userRequests.length);
        string[] memory msge = new string[](userRequests.length);
        string[] memory nme = new string[](userRequests.length);

        for (uint i = 0; i < userRequests.length; i++) {
            addrs[i] = userRequests[i].requestor;
            amnt[i] = userRequests[i].amount;
            msge[i] = userRequests[i].message;
            nme[i] = userRequests[i].name;
        }

        return (addrs, amnt, msge, nme);
    }

    /**
     * @notice Gets transaction history for a user
     * @param _user The address to query
     * @return Array of SendReceive structs representing all transactions
     */
    function getMyHistory(address _user) public view returns(SendReceive[] memory) {
        return history[_user];
    }

    /**
     * @notice Gets display name info for a user
     * @param _user The address to query
     * @return UserName struct containing name and existence flag
     */
    function getMyName(address _user) public view returns(UserName memory) {
        return names[_user];
    }
}