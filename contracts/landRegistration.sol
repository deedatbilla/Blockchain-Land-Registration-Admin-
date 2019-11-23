pragma solidity >=0.4.0 <0.6.0;

//Land Details
contract landRegistration{
    struct landDetails{
        string region;
        string district;
        string land_area;
        uint256 surveyNumber;
        address payable CurrentOwner;
        uint marketValue;
        bool isAvailable;
        address requester;
        reqStatus requestStatus;
        uint width;
        uint length;
        // string documentHash;

    }
    

    //request status
    enum reqStatus {Default,pending,reject,approved}



    //profile of a client
    struct profiles{
        string name;
        string NationalID;
        uint[] assetList;   
        }

 
    mapping(uint => landDetails) public land;
    address owner;
    mapping(string => address) superAdmin;
    mapping(address => profiles) profile;
    uint[] public all_land;
    uint public id=0;
    event registered(string message);
    event lid(uint);
    
    //contract owner
    constructor() public{
        owner = msg.sender;
        
    }
    modifier onlyOwner {
        id = 0;
        require(msg.sender == owner);
        _;
    }
    
    //adding land_area admins
    function addSuperAdmin(address _superAdmin,string memory _land_area ) onlyOwner public {
        superAdmin[_land_area] =_superAdmin;
    }
    //Registration of land details.
    function Registration(string memory _region,string memory _district,
        string memory _land_area,uint256 _surveyNumber,
        address payable _OwnerAddress,uint _marketValue,string memory _name, uint _width,
        uint _length, string memory _IDnumber
        ) public returns(bool) {
            uint landid;
       require(superAdmin[_land_area] == msg.sender || owner == msg.sender);
       landid=computeId(_region,_district,_land_area,_surveyNumber);
        all_land.push(landid);
        land[landid].region = _region;
        land[landid].district = _district;
        land[landid].land_area = _land_area;
        land[landid].surveyNumber = _surveyNumber;
        land[landid].CurrentOwner = _OwnerAddress;
        land[landid].marketValue = _marketValue;
        land[landid].width = _width;
        land[landid].length = _length;
        // land[landid].documentHash = _dochash;

        profile[_OwnerAddress].name = _name;
        
         profile[_OwnerAddress].NationalID = _IDnumber;
          
        profile[_OwnerAddress].assetList.push(landid);
        id++;
        emit registered("land registered successfully");
        emit lid(landid);
        return true;
    }
    //to view details of land for the owner
    function landInfoOwner(uint id) public view returns(string memory,string memory,string memory,uint256,bool,address,reqStatus){
        return(land[id].region,land[id].district,land[id].land_area,land[id].surveyNumber,land[id].isAvailable,land[id].requester,land[id].requestStatus);
    }
        //to view details of land for the buyer
        function landInfoUser(uint id) public view returns(address,uint,bool,address,reqStatus){
        return(land[id].CurrentOwner,land[id].marketValue,land[id].isAvailable,land[id].requester,land[id].requestStatus);
    }

    // to compute id for a land.
    function computeId(string memory _region,string memory _district,string memory _land_area,uint _surveyNumber) public  returns(uint){
        return uint(keccak256(abi.encodePacked(_region,_district,_land_area,_surveyNumber)))%10000000000000;
    }

    function allAssets() public view returns (uint[] memory all){
        return(all_land);
    }

    //push a request to the land owner
    function requstToLandOwner (uint id) public {
        require(land[id].isAvailable);
        land[id].requester=msg.sender;
        land[id].isAvailable=false;
        land[id].requestStatus = reqStatus.pending; //changes the status to pending.
    }
    //will show assets of the function caller 
    function viewAssets()public view returns(uint[] memory){
        return (profile[msg.sender].assetList);
    }
    //viewing request for the lands
    function viewRequest(uint property)public view returns(address){
        return(land[property].requester);
    }
    //processing request for the land by accepting or rejecting
    function processRequest(uint property,reqStatus status)public {
        require(land[property].CurrentOwner == msg.sender);
        land[property].requestStatus=status;
        if(status == reqStatus.reject){
            land[property].requester = address(0);
            land[property].requestStatus = reqStatus.Default;
        }
    }
    //availing land for sale.
    function makeAvailable(uint property)public{
        require(land[property].CurrentOwner == msg.sender);
        land[property].isAvailable=true;
    } 
    //buying the approved property
    function buyProperty(uint property)public payable{
        require(land[property].requestStatus == reqStatus.approved);
        require(msg.value >= (land[property].marketValue+((land[property].marketValue)/10)));
        land[property].CurrentOwner.transfer(land[property].marketValue);
        removeOwnership(land[property].CurrentOwner,property);
        land[property].CurrentOwner=msg.sender;
        land[property].isAvailable=false;
        land[property].requester = address(0);
        land[property].requestStatus = reqStatus.Default;
        profile[msg.sender].assetList.push(property); //adds the property to the asset list of the new owner.
        
    }
    //removing the ownership of seller for the land. and it is called by the buyProperty function
    function removeOwnership(address previousOwner,uint id)private{
        uint index = findId(id,previousOwner);
        profile[previousOwner].assetList[index]=profile[previousOwner].assetList[profile[previousOwner].assetList.length-1];
        delete profile[previousOwner].assetList[profile[previousOwner].assetList.length-1];
        profile[previousOwner].assetList.length--;
    }
    //for finding the index of a perticular id
    function findId(uint id,address user)public view returns(uint){
        uint i;
        for(i=0;i<profile[user].assetList.length;i++){
            if(profile[user].assetList[i] == id)
                return i;
        }
        return i;
    }
}