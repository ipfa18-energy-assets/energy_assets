pragma solidity ^0.4.25;
contract Main {

  /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  *  ==============================INIT=============================
  *  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
  int creditPerUnitOfCharge = 1;
  int weiPerUnitOfCharge = 1000;
  address masterAccess;

  /*
  Keeps track of credits of approved regulated parties
  (utility companies and fossil fuel generators)
  */
  mapping (address => int) credits;

  /*
  Keeps track of balances in wei of vehicle owners
  */
  mapping (address => int) balances;

  /*
  Keeps track of authorized government actors who can
  mark credits are "redeemed", subtracting from credits.
  */
  mapping (address => bool) authorizedTaxGovActors;

  /*
  Keeps track of authorized government actors who can change
  the conversion rates.
  */
  mapping (address => bool) authorizedGovActors;

  /*
  NEED TO DISCUSS ACCESS CONTROL!!!!!!!!!!!!!!!!!!!!!!!!!!
  */

  modifier isAuthorized(mapping (address => bool) list) {
    require(list[msg.sender] == true);
    _;
  }

  /* Constructor function */
  function Main() public {
    master_access = msg.sender;
  }

  /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  *  ====================CHANGE VARIABLES/ACCESS====================
  *  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

  function changeCreditRate(int newCreditRate) public
    isAuthorized(authorizedGovActors) {
    creditPerUnitOfCharge = new_credit_rate;
  }

  function changeWeiRate(int newWeiRate) public
    isAuthorized(authorizedGovActors) {
    weiPerUnitOfCharge = new_wei_rate;
  }

  /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  *  ============CREDIT CREATION (FROM ENERGY TO CREDIT)============
  *  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

  function chargeCompleted(int amount) public {

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
