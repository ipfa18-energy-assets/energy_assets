pragma solidity ^0.4.24;
contract Main {

  /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  *  ==============================INIT=============================
  *  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
  uint creditPerUnitOfCharge = 1;
  uint dollarPerUnitOfCharge = 900; // How much users get when they finish charging
  uint weiPerCredit = 1000; // How much each credit is sold for

  /* Keeps track of credits of approved regulated parties
  (utility companies and fossil fuel generators) */
  mapping (address => uint) private credits;

  /* Keeps track of balances in dollar of vehicle owners */
  mapping (address => uint) private balances;

  /* Keeps track of balances in wei of utility companies
  and fossil fuel generators */
  mapping (address => uint) private etherBalances;

  /* Maps user address to utility company address */
  mapping (address => address) private utilityCompanyOfUser;

  /*
  When a utility company puts x amount of credits on sale,
  they get added to the list of sellers **if they are not already
  on the list**, then the amount they want to sell is added to their
  amountForSale.
  */
  mapping(address => uint) private amountForSale;
  address[] sellers;

  /* Types of Acccount:
  0 (or any other number): Unverified/Unregistered/Uninitialized
  1: Users (Vehicle Owners)
  2: Utility Companies
  3: Fossil Fuel Generators */
  mapping(address => uint8) private addressType;

  /*
  accessList ID:
  1 masterAccess;
  2 authorizedToVerify;
  3 authorizedToRedeem;
  4 authorizedToChangeRates;
  5 authorizedToViewUserData;
  6 authorizedToUpdateAccess;
  7 authorizedOracle;
  */
  mapping (address => bool) private masterAccess;
  mapping (address => bool) private authorizedToVerify;
  mapping (address => bool) private authorizedToRedeem;
  mapping (address => bool) private authorizedToChangeRates;
  mapping (address => bool) private authorizedToViewUserData;
  mapping (address => bool) private authorizedToUpdateAccess;
  mapping (address => bool) private authorizedOracle;

  /* modifier to only allow function calls if caller is authorized in list */
  modifier _is(mapping (address => bool) list) {
    require(list[msg.sender] == true
    || masterAccess[msg.sender] == true);
    _;
  }

  /* Constructor function */
  constructor() public {
    masterAccess[msg.sender] = true;
  }

  function() public {
    revert();
  }

  function userRegistration(address accountAddress, address utilityCompany) public
    _is(masterAccess) returns (bool) {
    if (addressType[utilityCompany] != 2) {
      return false;
    }
    addressType[accountAddress] = 1;
    utilityCompanyOfUser[accountAddress] = utilityCompany;
    //TO DO: implement hold of ether from utility company
    return true;
  }

  /* Types of Acccount:
  0 (or any other number): Unverified/Unregistered/Uninitialized
  1: Users (Vehicle Owners)
  2: Utility Companies
  3: Fossil Fuel Generators
  This function has to be called by an master account
  who has masterAccess !!!after verifying account type!!!
  (possibly from an oracle) */
  function registration(address accountAddress, uint typeOfAccount) public
    _is(masterAccess) returns (bool){
    if (typeOfAccount == 2) {
      addressType[accountAddress] = 2;
    } else if (typeOfAccount == 3) {
      addressType[accountAddress] = 3;
    } else {
      return false;
    }
    return true;
  }

  /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  *  =================CHANGE VARIABLES W/ ACCESS====================
  *  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

  function changeCreditRate(uint newCreditRate) public
    _is(authorizedToChangeRates) returns (bool){
    creditPerUnitOfCharge = newCreditRate;
  }

  function changeUnitRate(uint newDollarRate) public
    _is(authorizedToChangeRates) returns (bool){
    dollarPerUnitOfCharge = newDollarRate;
  }

  function changeCreditPrice(uint newPrice) public
    _is(authorizedToChangeRates) returns (bool){
    weiPerCredit = newPrice;
  }

  /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  *  ============CREDIT CREATION (FROM ENERGY TO CREDIT)============
  *  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

  function chargeCompleted(uint amountInUnit, address owner)
    public _is(authorizedOracle) returns (bool){
    balances[owner] += amountInUnit * dollarPerUnitOfCharge;
    credits[utilityCompanyOfUser[owner]] += amountInUnit * creditPerUnitOfCharge;
  }

  /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  *  ========================CREDIT TRADING=========================
  *  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

  function sell(uint numOfCredit) public returns (bool) {
    if (addressType[msg.sender] != 2) {
      return false;
    }
    // YOUR CODE HERE
  }

  function buy(uint numOfCredit) public returns (bool) {
    if (addressType[msg.sender] != 3) {
      return false;
    }
    // YOUR CODE HERE
  }

  /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  *  =====================CREDIT VERIFICATIONS======================
  *  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/


  /* checks if the target address is a fossil fuel company
  and that there are x amount of credits on that account, then
  deduct x amount of credits from address. Returns true if succeeded.*/
  function verifyAndRedeem(address target, uint x) public
    _is(authorizedToRedeem) returns (bool) {
    // YOUR CODE HERE
  }

  /* checks if the target address is a fossil fuel company
  and returns the number of credits on that account. */
  function peekAndVerify(address target) public
    _is(authorizedToVerify) returns (uint){
    // YOUR CODE HERE
  }

  /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  *  ======================WITHDRAWAL/DEPOSIT=======================
  *  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

  /* Converts the amountInDollar to ether (wei) at the current exchange
  rate and withdraw ether from user's corresponding utility company */
  function userWithdrawal(uint amountInDollar) public returns(bool) {
    if (addressType[msg.sender] != 1) {
      return false;
    }
    // YOUR CODE HERE
  }

  /* Withdrawal function for utility companies and fossil fuel companies */
  function etherWithdrawal(uint amountInWei) public returns (bool) {
    if (addressType[msg.sender] != 2 && addressType[msg.sender] != 3) {
      return false;
    }
    // YOUR CODE HERE
  }

  /* Deposit function for utility companies and fossil fuel companies */
  function etherDeposit() payable public returns (bool) {
    if (addressType[msg.sender] != 2 && addressType[msg.sender] != 3) {
      revert();
      return false;
    }
    // YOUR CODE HERE
  }

  /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  *  ========================GETTER FUNCTIONS=======================
  *  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

  /* Because mappings are not iterable, it might be necessary to
  keep a list of account addresses on a server. The type of each address
  can be acquired from mapping addressType[] */

  function getUserBalance(address user) public
    _is(authorizedToViewUserData) returns (uint) {
    // YOUR CODE HERE
  }

  function getUserUtilityCompany(address user) public
    _is(authorizedToViewUserData) returns (address) {
    // YOUR CODE HERE
  }

  function getCreditBalance(address addr) public
    _is(masterAccess) returns (uint) {
    // YOUR CODE HERE
  }

  function getEtherBalance(address addr) public
    _is(masterAccess) returns (uint) {
    // YOUR CODE HERE
  }

  /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  *  =========================CHANGE ACCESS=========================
  *  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/


  /* Quick overall change of access for a single account */
  function changeAccess(address addr, bool master,
    bool toVerify, bool toRedeem,
    bool toChangeRates, bool toViewUserData,
    bool toUpdateAccess, bool oracle) public
    _is(masterAccess) returns (bool) {
    // YOUR CODE HERE
  }

  /* Quick mass granting of access for many accounts.
  accessList ID:
  1 masterAccess;
  2 authorizedToVerify;
  3 authorizedToRedeem;
  4 authorizedToChangeRates;
  5 authorizedToViewUserData;
  6 authorizedToUpdateAccess;
  7 authorizedOracle; */
  function addTo(uint accessList, address[] addressList) public
    _is(masterAccess) returns (bool) {
    if (accessList < 1 || accessList > 7) {
      return false;
    }
    // YOUR CODE HERE
  }

  /* Quick mass revoking of access for many accounts */
  function removeFrom(uint accessList, address[] addressList) public
    _is(masterAccess) returns (bool) {
    if (accessList < 1 || accessList > 7) {
      return false;
    }
    // YOUR CODE HERE
  }

}
