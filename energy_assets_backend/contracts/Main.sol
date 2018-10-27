pragma solidity ^0.4.25;
contract Main {

  /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  *  ==============================INIT=============================
  *  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
  int creditPerUnitOfCharge = 1;
  int weiPerUnitOfCharge = 1000;
  int weiPerCredit = 1000;

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

  mapping (address => bool) private verifiedUsers;
  mapping (address => bool) private verifiedUtilityCompanies;
  mapping (address => bool) private verifiedFFGenerators;

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
    || masterAccess[msg.sender == true]);
    _;
  }

  /* Constructor function */
  function Main() public {
    master_access[msg.sender] = true;
  }

  function() public {
    revert();
  }

  function userRegistration(address accountAddress, address utilityCompany) public
    _is(masterAccess) returns (bool) {
    if (verifiedUtilityCompanies[utilityCompany] == false) {
      return false;
    }
    verifiedUsers[accountAddress] = true;
    utilityCompanyOfUser[accountAddress] = utilityCompany;
    return true;
  }

  /* Types of Acccount:
  1: Utility Companies
  2: Fossil Fuel Generators
  This function has to be called by an internal account
  who has masterAccess after verifying account type*/
  function registration(address accountAddress, int typeOfAccount) public
    _is(masterAccess) returns (bool){
    if (typeOfAccount == 1) {
      verifiedUtilityCompanies[accountAddress] = true;
    } else if (typeOfAccount == 2) {
      verifiedFFGenerators[accountAddress] = true;
    }
  }

  /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  *  =================CHANGE VARIABLES W/ ACCESS====================
  *  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

  function changeCreditRate(int newCreditRate) public
    _is(authorizedToChangeRates) {
    creditPerUnitOfCharge = new_credit_rate;
  }

  function changeUnitRate(int newWeiRate) public
    _is(authorizedToChangeRates) {
    weiPerUnitOfCharge = new_wei_rate;
  }

  function changeCreditPrice(int newPrice) public
    _is(authorizedToChangeRates) {
    weiPerCredit = new_wei_rate;
  }

  /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  *  ============CREDIT CREATION (FROM ENERGY TO CREDIT)============
  *  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

  function chargeCompleted(int amountInUnit, address owner)
    public _is(authorizedOracle){
    balances[owner] += amountInUnit * weiPerUnitOfCharge;
    credits[utilityCompanyOfUser[owner]] += amountInUnit * creditPerUnitOfCharge;
  }

  /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  *  ========================CREDIT TRADING=========================
  *  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/


  /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  *  =====================CREDIT VERIFICATIONS======================
  *  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

  function verify_and_redeem(address target) public
    _is(authorizedToRedeem) returns (bool) {

  }

  function peek_and_verify(address target) public
    _is(authorizedToVerify) returns (uint){

  }

  /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  *  ======================WITHDRAWAL/DEPOSIT=======================
  *  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

  /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  *  ========================GETTER FUNCTIONS=======================
  *  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

  /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  *  =========================CHANGE ACCESS=========================
  *  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

}
