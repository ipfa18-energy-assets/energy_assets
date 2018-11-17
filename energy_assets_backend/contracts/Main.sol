pragma solidity ^0.4.24;

/* Documentation found here https://fiatcontract.com/ */
contract FiatContract {
  function ETH(uint _id) constant public returns (uint256);
  function USD(uint _id) constant public returns (uint256);
  function updatedAt(uint _id) constant public returns (uint);
}

contract Main {

  /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  *  ==============================INIT=============================
  *  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

  uint creditPerUnitOfCharge = 1;
  uint dollarPerUnitOfCharge = 900; // How much users get when they finish charging
  uint weiPerCredit = 1000; // How much each credit is sold for
  FiatContract currencyConverter = FiatContract(0x2CDe56E5c8235D6360CCbb0c57Ce248Ca9C80909);
  // MAINNET address: 0x8055d0504666e2B6942BeB8D6014c964658Ca591
  // TESTNET address (Ropsten): 0x2CDe56E5c8235D6360CCbb0c57Ce248Ca9C80909

  function USDtoETH(uint dollar) constant private returns (uint) {
    // returns $0.01 ETH wei
    uint256 ethCent = currencyConverter.USD(0);
    // $0.01 * 100 * USD = USD * $1.00
    return ethCent * 100 * dollar;
  }

  function ETHtoUSD(uint ETHinWei) constant private returns (uint) {
    // returns $0.01 ETH wei
    uint256 ethCent = currencyConverter.USD(0);
    return ETHinWei / ethCent * 100;
  }

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

  /* Maps oracle address to user address*/
  mapping (address => address) private ownerOfOracle;

  /*
  When a utility company puts x amount of credits on sale,
  they get added to the list of sellers **if they are not already
  on the list**, then the amount they want to sell is added to their
  amountForSale.
  */
  mapping(address => uint) private amountForSale;
  uint currentStartIndex;
  address[] sellers;

  /* Types of Acccount:
  0 (or any other number): Unverified/Unregistered/Uninitialized
  1: Users (Vehicle Owners)
  2: Utility Companies
  3: Fossil Fuel Generators */
  mapping(address => uint) private addressType;

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
    currentStartIndex = 0;
  }

  function() public {
    revert();
  }

  /* Function called by utility companies to register users */
  function userRegistration(address accountAddress, address oracleAddress)
    public returns (bool) {
    if (addressType[msg.sender] != 2) {
      revert();
      return false;
    }
    addressType[accountAddress] = 1;
    utilityCompanyOfUser[accountAddress] = msg.sender;
    authorizedOracle[oracleAddress] = true;
    ownerOfOracle[oracleAddress] = accountAddress;
    //Not implemented: hold of ether from utility company
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

  /* Not implemented: charge history of users */

  function chargeCompleted(uint amountInUnit)
    public _is(authorizedOracle) returns (bool){
    if (ownerOfOracle[msg.sender] == 0x0) {
      return false;
    }
    balances[ownerOfOracle[msg.sender]] += amountInUnit * dollarPerUnitOfCharge;
    credits[utilityCompanyOfUser[ownerOfOracle[msg.sender]]] += amountInUnit * creditPerUnitOfCharge;
    return true;
  }

  /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  *  ========================CREDIT TRADING=========================
  *  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

  function sell(uint numOfCredit) public returns (bool) {
    if (addressType[msg.sender] != 2) {
      return false;
    }
    if (credits[msg.sender] >= numOfCredit) {
      credits[msg.sender] -= numOfCredit;
      sellers.push(msg.sender);
      amountForSale[msg.sender] += numOfCredit;
      return true;
    } else {
      return false;
    }
  }

  function buy(uint numOfCredit) public returns (bool) {
    if (addressType[msg.sender] != 3) {
      return false;
    }
    uint etherRequired = numOfCredit * weiPerCredit;
    if (etherBalances[msg.sender] >= etherRequired) {
      uint i = currentStartIndex;
      for (i; i < sellers.length; i++) {
        if (amountForSale[sellers[i]] >= numOfCredit) {
          etherBalances[msg.sender] -= etherRequired;
          amountForSale[sellers[i]] -= numOfCredit;
          etherBalances[sellers[i]] += etherRequired;
          credits[msg.sender] += numOfCredit;
          currentStartIndex = i;
          return true;
        } else {
          uint creditsAvailable = amountForSale[sellers[i]];
          uint etherRequiredNow = creditsAvailable * weiPerCredit;
          etherBalances[msg.sender] -= etherRequiredNow;
          credits[msg.sender] += creditsAvailable;
          amountForSale[sellers[i]] = 0;
          etherBalances[sellers[i]] += etherRequiredNow;
          etherRequired -= etherRequiredNow;
          numOfCredit -= creditsAvailable;
          delete sellers[i];
        }
      }
      if (numOfCredit > 0) {
        revert();
        return false;
      }
    } else {
      return false;
    }
  }

  /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  *  =====================CREDIT VERIFICATIONS======================
  *  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/


  /* checks if the target address is a fossil fuel company
  and that there are x amount of credits on that account, then
  deduct x amount of credits from address. Returns true if succeeded.*/
  function verifyAndRedeem(address target, uint x) public
    _is(authorizedToRedeem) returns (bool) {
    if (addressType[target] == 3 && credits[target] >= x) {
      credits[target] -= x;
      return true;
    } else {
      return false;
    }
  }

  /* checks if the target address is a fossil fuel company
  and returns the number of credits on that account. Returns 0 if
  is not fossil fuel company */
  /* HOW TO DIFFERENTIATE FOSSIL FUEL COMPANY HAVING 0 CREDITS? */
  function peekAndVerify(address target) public view
    _is(authorizedToVerify) returns (uint){
    if (addressType[target] == 3) {
      return credits[target];
    } else {
      return 0;
    }
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
    uint amountOfEther = USDtoETH(amountInDollar);
    address utilCompany = utilityCompanyOfUser[msg.sender];
    if (etherBalances[utilCompany] > amountOfEther) {
      etherBalances[utilCompany] -= amountOfEther;
      msg.sender.transfer(amountOfEther);
      return true;
    } else {
      return false;
    }
  }

  /* Withdrawal function for utility companies and fossil fuel companies */
  function etherWithdrawal(uint amountInWei) public returns (bool) {
    if (addressType[msg.sender] != 2 && addressType[msg.sender] != 3) {
      return false;
    }
    if (etherBalances[msg.sender] >= amountInWei) {
      etherBalances[msg.sender] -= amountInWei;
      msg.sender.transfer(amountInWei);
      return true;
    } else {
      return false;
    }
  }

  /* Deposit function for utility companies and fossil fuel companies */
  function etherDeposit() payable public returns (bool) {
    if (addressType[msg.sender] != 2 && addressType[msg.sender] != 3) {
      revert();
      return false;
    } else {
      etherBalances[msg.sender] += msg.value;
      return true;
    }
  }

  /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  *  ========================GETTER FUNCTIONS=======================
  *  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

  /* Because mappings are not iterable, it might be necessary to
  keep a list of account addresses on a server. The type of each address
  can be acquired from mapping addressType[] */

  /* Get dollar amount of vehicle owners */
  function getUserBalance(address user) public view
    _is(authorizedToViewUserData) returns (uint) {
    return balances[user];
  }

  function getUserUtilityCompany(address user) public view
    _is(authorizedToViewUserData) returns (address) {
    return utilityCompanyOfUser[user];
  }

  function getCreditBalanceOf(address addr) public view
    _is(masterAccess) returns (uint) {
    return credits[addr];
  }

  function getEtherBalanceOf(address addr) public view
    _is(masterAccess) returns (uint) {
    return etherBalances[addr];
  }

  function getAddressTypeOf(address addr) public view
  _is(masterAccess) returns (uint) {
    return addressType[addr];
  }

  function getCreditBalance() public view returns (uint) {
    return credits[msg.sender];
  }

  function getEtherBalance() public view returns (uint) {
    return etherBalances[msg.sender];
  }

  function getAddressType() public view returns (uint) {
    return addressType[msg.sender];
  }

  /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  *  =========================CHANGE ACCESS=========================
  *  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/


  /* Quick overall change of access for a single account */
  function changeAccess(address addr, bool master,
    bool toVerify, bool toRedeem,
    bool toChangeRates, bool toViewUserData,
    bool toUpdateAccess, bool oracle) public
    _is(masterAccess) {
    masterAccess[addr] = master;
    authorizedToVerify[addr] = toVerify;
    authorizedToRedeem[addr] = toRedeem;
    authorizedToChangeRates[addr] = toChangeRates;
    authorizedToViewUserData[addr] = toViewUserData;
    authorizedToUpdateAccess[addr] = toUpdateAccess;
    authorizedOracle[addr] = oracle;
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
  function addTo(uint accessListID, address[] addressList) public
    _is(masterAccess) returns (bool) {
    if (accessListID < 1 || accessListID > 7) {
      return false;
    }
    if (accessListID == 1) {
      for (uint a = 0; a < addressList.length; a++) {
        masterAccess[addressList[a]] = true;
      }
    } else if (accessListID == 2) {
      for (uint b = 0; b < addressList.length; b++) {
        authorizedToVerify[addressList[b]] = true;
      }
    } else if (accessListID == 3) {
      for (uint c = 0; c < addressList.length; c++) {
        authorizedToRedeem[addressList[c]] = true;
      }
    } else if (accessListID == 4) {
      for (uint d = 0; d < addressList.length; d++) {
        authorizedToChangeRates[addressList[d]] = true;
      }
    } else if (accessListID == 5) {
      for (uint e = 0; e < addressList.length; e++) {
        authorizedToViewUserData[addressList[e]] = true;
      }
    } else if (accessListID == 6) {
      for (uint f = 0; f < addressList.length; f++) {
        authorizedToUpdateAccess[addressList[f]] = true;
      }
    } else if (accessListID == 7) {
      for (uint g = 0; g < addressList.length; g++) {
        authorizedOracle[addressList[g]] = true;
      }
    }
    return true;
  }

  /* Quick mass revoking of access for many accounts */
  function removeFrom(uint accessListID, address[] addressList) public
    _is(masterAccess) returns (bool) {
    if (accessListID < 1 || accessListID > 7) {
      return false;
    }
    if (accessListID == 1) {
      for (uint aa = 0; aa < addressList.length; aa++) {
        masterAccess[addressList[aa]] = false;
      }
    } else if (accessListID == 2) {
      for (uint bb = 0; bb < addressList.length; bb++) {
        authorizedToVerify[addressList[bb]] = false;
      }
    } else if (accessListID == 3) {
      for (uint cc = 0; cc < addressList.length; cc++) {
        authorizedToRedeem[addressList[cc]] = false;
      }
    } else if (accessListID == 4) {
      for (uint dd = 0; dd < addressList.length; dd++) {
        authorizedToChangeRates[addressList[dd]] = false;
      }
    } else if (accessListID == 5) {
      for (uint ee = 0; ee < addressList.length; ee++) {
        authorizedToViewUserData[addressList[ee]] = false;
      }
    } else if (accessListID == 6) {
      for (uint ff = 0; ff < addressList.length; ff++) {
        authorizedToUpdateAccess[addressList[ff]] = false;
      }
    } else if (accessListID == 7) {
      for (uint gg = 0; gg < addressList.length; gg++) {
        authorizedOracle[addressList[gg]] = false;
      }
    }
    return true;
  }


}
