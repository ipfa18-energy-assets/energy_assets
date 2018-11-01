pragma solidity ^0.4.24;
contract Main {

  /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  *  ==============================INIT=============================
  *  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
  uint creditPerUnitOfCharge = 1;
  uint weiPerUnitOfCharge = 1000;
  uint weiPerCredit = 1000;

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

  mapping (address => int8) private addressType;

  mapping (address => bool) private masterAccess;
  mapping (address => bool) private authorizedToVerify;
  mapping (address => bool) private authorizedToRedeem;
  mapping (address => bool) private authorizedToChangeRates;
  mapping (address => bool) private authorizedToViewUserData;
  mapping (address => bool) private authorizedToUpdateUserData;
  mapping (address => bool) private authorizedOracle;
  mapping (address => bool) private authorizedToUpdateAccess;

  /* modifier to only allow function calls if caller is authorized in list */
  modifier _is(mapping (address => bool) list) {
    require(list[msg.sender] == true
    || masterAccess[msg.sender] == true);
    _;
  }

  /* Constructor function */
  function Main() public {
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
    return true;
  }

  /* Types of Acccount:
  0: Unverified
  1: Users (Vehicle Owners)
  2: Utility Companies
  3: Fossil Fuel Generators
  This function has to be called by an master account
  who has masterAccess !!!after verifying account type!!!
  (possibly from an oracle) */
  function registration(address accountAddress, int typeOfAccount) public
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
    _is(authorizedToChangeRates) {
    creditPerUnitOfCharge = newCreditRate;
  }

  function changeUnitRate(uint newWeiRate) public
    _is(authorizedToChangeRates) {
    weiPerUnitOfCharge = newWeiRate;
  }

  function changeCreditPrice(uint newPrice) public
    _is(authorizedToChangeRates) {
    weiPerCredit = newPrice;
  }

  /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  *  ============CREDIT CREATION (FROM ENERGY TO CREDIT)============
  *  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

  function chargeCompleted(uint amountInUnit, address owner) public _is(authorizedOracle) {
    balances[owner] += amountInUnit * weiPerUnitOfCharge;
    credits[utilityCompanyOfUser[owner]] += amountInUnit * creditPerUnitOfCharge;
  }

  /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  *  ========================CREDIT TRADING=========================
  *  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

  /* Allows a utility company to put a certain amount of credits for sale. This credit package
  Should be inserted into an array for polluters to purchase. */
  function sell_certificates(uint amount) {

  }

  /* Allows a polluter to purchase certificates. Should return the total number of certificates actually allocated.
  Purchased packages should be removed from the list once purchased. Utilities should be paid. */
  function buy_certificates (uint amount) returns (uint) {

  }


  /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  *  =====================CREDIT VERIFICATIONS======================
  *  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

  function verify_and_redeem(address target) public
    _is(authorizedToRedeem) returns (bool) {

  }

  function peek_and_verify(address target) public
    _is(authorizedToVerify) returns (uint) {

  }

  /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  *  ======================WITHDRAWAL/DEPOSIT=======================
  *  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
  /* Allows a user to withdraw funds. User should withdraw funds from there utility companie's bank account.
  Amount withdrawn should be based on amount of wei credited at time of transatction. */
  function user_withdraw() public returns (uint) {

  }
  /* Allows a utility company to withdraw funds */
  function utility_withdraw() public returns (uint) {

  }
  /* Allows a polluter to withdraw funds */
  function polluter_withdraw() public returns (uint) {

  }

  /* Allows a utility company to withdraw funds */
  function utility_deposit() public returns (uint) {

  }
  /* Allows a polluter to withdraw funds */
  function polluter_deposit() public returns (uint) {

  }


  /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  *  ========================GETTER FUNCTIONS=======================
  *  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

  /* Because mappings are not iterable, it might be necessary to
  keep a list of account addresses on a server. The type of each address
  can be acquired from mapping addressType[] */

  /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  *  =========================CHANGE ACCESS=========================
  *  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

}
