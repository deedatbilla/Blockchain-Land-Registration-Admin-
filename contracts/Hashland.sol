pragma solidity >=0.4.22 <0.6.0;

contract Hashland{
    
    struct land{
        uint id;
        string document;
        
    }
    
    struct owner{
        uint id;
        string firstname;
        address owneraddress;
        string NationalId;
        string lastname;
        uint[] landsid;
    }
    
    event ownercreated(string message);
    event addlandOwner(string message);
    
    
        
    uint public landcount=0;
    uint256 public ownercount;
    mapping (uint=>owner) public landowners;
    
     constructor() public {
       ownercount = 0;
   }
    
    function addowner(string memory firstname,string memory lastname, address owneraddress, string memory nationalid)public{
        //require that landcommission agent does not add land to his account
        //require(owneraddress!=msg.sender);
        require(bytes(firstname).length>0);
        require(bytes(lastname).length>0);
        require(bytes(nationalid).length==13);
        ownercount++;
        landowners[ownercount].id = ownercount;
        landowners[ownercount].firstname = firstname;
        landowners[ownercount].owneraddress = owneraddress;
        landowners[ownercount].NationalId = nationalid;
        landowners[ownercount].lastname = lastname;
        landowners[ownercount].landsid.push(0);
        emit ownercreated("Owner created successfully"); 
    }
    
    land[] public lands;
    
    //function to add land to the blockchain
    function addland(string memory document)public returns(uint){
        land memory newLand=land(landcount,document);
        lands.push(newLand);
        return(lands.length);
        
    }
    
  
   //function to compare strings
  function compareStrings (string memory a, string memory b) public view 
       returns (bool) {
  return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))) );

       }
   
    
    //this code works by updating the landsid array in the owner struct
    function addLandtoOwner(string memory document,address owneraddress) public{
        for(uint256 i =0; i< ownercount; i++){
           if(landowners[i].owneraddress==owneraddress){
               uint id=addland(document);
               landowners[i].landsid.push(id);
                 
               //return true;
            
           }
       } 
       emit addlandOwner("land Owner Added successfully");
    }
  
  //function to display a single Land
    function displayLand(uint id)public returns(string memory){
        land memory newland=lands[id];
        return (newland.document);
    }
    
    //function to display lands of an owner
    function displayLandofOwner(uint id)public returns(string memory){
        owner memory LandOwner=landowners[id];
        uint[] memory allland=LandOwner.landsid;
        for(uint256 i =0; i< allland.length; i++){
            displayLand(allland[i]);
          
    }
    } 
   
}