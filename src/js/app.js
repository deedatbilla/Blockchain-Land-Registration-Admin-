App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',
  

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // TODO: refactor conditional
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.

      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      //await window.ethereum.enable();
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  

  // // Listen for events emitted from the contract
  
  listenForEvents: function() {
    App.contracts.landRegistration.deployed().then(function(instance) {
      instance.lid({}, {
        fromBlock: 0,
        toBlock: 'latest'
      }).watch(function(error, event) {
        console.log("event triggered", event)
        // Reload when a new vote is recorded
        // App.render();
        
      });
    });
  },

  registeredevent: function() {
    App.contracts.landRegistration.deployed().then(function(instance) {
      instance.registered({}, {
        fromBlock: 0,
        toBlock: 'latest'
      }).watch(function(error, event) {
        console.log("addlandtoOwner event triggered", event)
        // Reload when a new vote is recorded
        //App.render();
      });
    });
  },
  
  initContract: function() {
    $.getJSON("landRegistration.json", function(hashland) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.landRegistration = TruffleContract(hashland);
      // Connect provider to interact with contract
      App.contracts.landRegistration.setProvider(App.web3Provider);
      App.registeredevent();
      App.listenForEvents();
      
  
      return App.render();
    });
  },
  render: function() {
    var hashlandinstance;
    var loader = $("#loader");
    var content = $("#landsrow");
  
    loader.show();
    content.hide();

    // Load account data
    
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        //alert(App.account)
        $("#my").html("Your Account: " + App.account);
      }
     
    });
    
    //display lands for owner 
    // App.contracts.landRegistration.deployed().then(function(instance){
    //   tempinstance=instance;
    //   return tempinstance.id();
    // }).then(function(landscount){
    //   console.log(landscount)
    //   // var count=landscount
    //   // var lands = $("#mylands");
    //   // lands.empty();
    //   // let myParamVar = urlParams.get('add');
    //   // console.log(myParamVar)
    //   // for (var i = 1; i <= landcount; i++) {
    //   //   hashlandinstance.Linked().then(function(owners) {


    // })
  
    // Load contract data
    App.contracts.landRegistration.deployed().then(function(instance) {
      hashlandinstance = instance;
      return hashlandinstance.allAssets();
    }).then(function(all_land_ids) {
      var candidatesResults = $("#alllands");
      candidatesResults.empty();

      // var candidatesSelect = $('#candidatesSelect');
      // candidatesSelect.empty();
       var all=[];
       all.push(all_land_ids)
      
     
      
      //alert(JSON.stringify(hashlandinstance.(0)));
      for (var i = 0; i < all_land_ids.length; i++) {
        hashlandinstance.land(all_land_ids[i]).then(function(owners) {
          
          
          var state = owners[0];
          var district = owners[1];
          var village=owners[2];
          var surveynumber =owners[3]; 
          var owneraddress = owners[4];
          var marketvalue=owners[5]
          var width=owners[9]
          var length=owners[10]

          
        

          // Render candidate Result
          var candidateTemplate = "<tr><th>" + state + "</th><td>" + district + "</td><td>" + owneraddress + "</td><td>" +surveynumber +
          "</td><td>"+village+ "</td><td>"+marketvalue+"</td><td>"+ length + " x " + width + "</td></tr>"
          candidatesResults.append(candidateTemplate);


          // Render candidate ballot option
          // var candidateOption = "<option value='" + id + "' >" + name + "</ option>"
          // candidatesSelect.append(candidateOption);
        });
      }
      //return electionInstance.voters(App.account);
    // }).then(function(hasVoted) {
    //   // Do not allow a user to vote
    //   if(hasVoted) {
    //     $('form').hide();
    //   }
       loader.hide();
       content.show();
    // }).catch(function(error) {
    //   console.warn(error);
    // });
  })
  },
  RegisterLand: function() {
    
    var surveynumber = $('#surveynumber').val();
    var region = $('#region').val();
    var landarea = $('#landarea').val();
    var district = $('#district').val();
    var OwnerAddress = $('#owneraddress').val();
    var marketvalue = $('#marketvalue').val();
    var fname = $('#fname').val();
    var lname = $('#lname').val();
    var  fullname= fname + " " +lname;
    var phone = $('#user_number').val();
    var email = $('#email').val();
    var length = $('#length').val();
    var width = $('#width').val();
    var id_number = $('#id_number').val();
    
    
    //alert(OwnerAddress +marketvalue)
    
    App.contracts.landRegistration.deployed().then(function(instance) {
      return instance.Registration(region,landarea,district,surveynumber,OwnerAddress,marketvalue,
        fullname,width,length,id_number);
    }).then(function(result){
     // alert(JSON.stringify(result))
       
   
    }).catch(function(err) {
      console.error(err);
    });
  },

  AddAdmin : function() {
    var adminaddress = $('#adminaddress').val();
    var district = $('#district').val();
    alert(adminaddress +district)

    App.contracts.landRegistration.deployed().then(function(instance) {
      return instance.addSuperAdmin(adminaddress,district);
    }).then(function(result) {
      console.log(result)
      // Wait for votes to update
      // $("#content").hide();
      // $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  },

  landInfoOwner:function() {
    var lid=$('#landid').val();
    App.contracts.landRegistration.deployed().then(function(instance) {
      return instance.landInfoOwner(lid);
    }).then(function(result) {
      alert(result)
      // Wait for votes to update
      // $("#content").hide();
      // $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  },


  ViewAssests:function() {
    
    App.contracts.landRegistration.deployed().then(function(instance) {
      return instance.viewAssets();
    }).then(function(result) {
      alert(result)
      // Wait for votes to update
      // $("#content").hide();
      // $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  },

 
  
},

$(function() {
  $(window).load(function() {
    App.init();
  });
});
