pragma solidity ^0.4.25;
contract Main {

  /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  *  ==============================INIT=============================
  *  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
  int creditPerUnitOfCharge = 1;
  int weiPerUnitOfCharge = 1000;
  int weiPerCredit = 1000;
  mapping (address => bool) private masterAccess;

  /* Keeps track of credits of approved regulated parties
  (utility companies and fossil fuel generators) */
  mapping (address => int) private credits;

  /* Keeps track of balances in dollar of vehicle owners */
  mapping (address => int) private balances;

  /* Maps user address to utility company address */
  mapping (address => address) private utilityCompanyOfUser;

  /* Keeps track of balances in wei of utility companies
  and fossil fuel generators */
  mapping (address => int) private etherBalances;

  mapping (address => bool) private authorizedToVerify;
  mapping (address => bool) private authorizedToRedeem;
  mapping (address => bool) private authorizedToChangeRates;
  mapping (address => bool) private authorizedToViewUserData;
  mapping (address => bool) private authorizedToUpdateAccess;
  mapping (address => bool) private authorizedToUpdateUserData;
  mapping (address => bool) private authorizedOracle;

  /* modifier to only allow function calls if caller is authorized in list */
  modifier _is(mapping (address => bool) list) {
    require(list[msg.sender] == true);
    _;
  }

  /* Constructor function */
  function Main() public {
    master_access[msg.sender] = true;
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

  function verify_and_redeem(address target) {

  }

  function peek_and_verify(address target) {

  }

}
