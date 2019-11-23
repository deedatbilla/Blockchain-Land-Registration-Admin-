 


 
 function validateChecks() {
    var chks = document.getElementsByName('checks');
    var checkCount = 0;
    for (var i = 0; i < chks.length; i++) {
        if (chks[i].checked) {
            checkCount++;
        }
    }
    if (checkCount < 1) {
        return false;
    }
    return true;
}
function validate() {
    if(validateChecks()==false) {
        alert('Please fill all the required fields.');
        return false;
    }
    return true;
}


var token = window.localStorage.getItem('token');

if (token) {
    $.ajaxSetup({
     headers: {
    'x-access-token': token
         }
            });
    }

var form4=document.getElementsByName('employeeform')[0];

$('#adduser').on('click', function(e){
    e.preventDefault();
    var email = $("#email").val();
        if(email== "")
        {
            $(".error").addClass("error_show");
        }
        else{
            var email=document.forms['employeeform']['email']
    var dept=$('#employeedept :selected').text();
    

     
    e.stopImmediatePropagation();

    var user={
        email:email.value,
        dept:dept
    }
       
    $.ajax({
        url: "http://localhost:8000/create",
        async: true,
        type: 'POST',
        dataType: "json",
        data:JSON.stringify(user),
        contentType:"application/json; charset=utf-8",
        beforeSend: function () {   
            $('.gif-loader').show(); 
       },
        success: function(response,status) {
            $('.gif-loader').hide();

            $.notify({
                icon: 'pe-7s-gift',
                message: "You have successfully added a new user "

            },{
                type: 'success',
                delay:3000
            });
            form4.reset();
   
        },
        error:function(jqXHR, textStatus, errorThrown){ 
        
            $('.gif-loader').hide();
            $.notify({
                icon: 'pe-7s-trash',
                message: jqXHR.responseText

            },{
                type: "danger",
                delay:4000
            });
            form4.reset();
          
        },
        
        
        
        
});

        }
    

   
});

$('#register_button').click(function(e){
    e.preventDefault();
    var fname=document.forms['myform']["fname"];
    var lastname=document.forms['myform']["lname"];
    var othername=document.forms['myform']['othername']
    var email=document.forms['myform']["email"];
    var contact=document.forms['myform']["user_number"];
    var address=document.forms['myform']["address"];
    var nationalid=document.forms['myform']["id_number"];
    var nextOfKin=document.forms['myform']["next_of_kin"];
    var kinNumber=document.forms['myform']["kin_number"];
    var witness=document.forms['myform']["witness"];
    var witness_number=document.forms['myform']["witness_number"];
    var region= $('#region :selected').text();
    var landarea=document.forms['myform2']["landarea"];
    var length=document.forms['myform2']["length"];
    var width=document.forms['myform2']["width"];
    var year=$('#year :selected').text();
    var month=$('#month :selected').text();
    var day=document.forms['myform3']["day"];
    var favorite = [];
    var landownershipType=document.forms['myform3']["LandOwnerShiptype"]
    var date=year+"-"+month+"-"+day.value
    var form1=document.getElementsByName('myform')[0];
    var form2=document.getElementsByName('myform2')[0];
    var form3=document.getElementsByName('myform3')[0];
    
    $.each($("input[name='checks']:checked"), function(){            
        favorite.push($(this).val());
    })
    var counter=0;
    $('form input').each(function(){
        if($(this).val()==""){
            counter++;   
        }
    });  
    if(counter>0){
        $.notify({
            icon: 'pe-7s-gift',
            message: "Some of your fields have been left unfilled"

        },{
            type: 'danger',
            delay:8000
        });
    }else if(favorite.length<4){
        $.notify({
            icon: 'pe-7s-gift',
            message: "You need to pass all checks before you can register land"

        },{
            type: 'danger',
            delay:4000
        });
    }else{

        var supportingDocuments=favorite[0]+" and "+favorite[1]
    
        var landdetails={
            OwnerType:"SingleOwner",
            firstname:fname.value,
            lastname:lastname.value,
            othername:othername.value,
            email:email.value,
            contact:contact.value,
            address:address.value,
            NationalIdNo:nationalid.value,
            nextOfKin:nextOfKin.value,
            kin_number:kinNumber.value,
            witness:witness.value,
            witness_number:witness_number.value,
            landsize:{
                length:length.value,
                width:width.value
            },
            landarea:landarea.value,
            DateTended:date,
            landownershiptype:landownershipType.value,
            region:region,
            supportingDocuments:supportingDocuments
        }
        
        e.stopImmediatePropagation();
       
        $.ajax({
            url: "http://localhost:4000/RegisterLand",
            async: true,
            type: 'POST',
            dataType: "json",
            data:JSON.stringify(landdetails),
            contentType:"application/json; charset=utf-8",
            beforeSend: function () {   
                $('#loading').show(); 
           },
            success: function(response,status) {
                $('#loading').hide();
                $.notify({
                    icon: 'pe-7s-gift',
                    message: "You have successfully added a new data to the blockchain"
    
                },{
                    type: 'success',
                    delay:3000
                });
                form1.reset();
                form2.reset();
                form3.reset();
       
            },
            error:function(jqXHR, textStatus, errorThrown){ 
            
                $('#loading').hide();
                $.notify({
                    icon: 'pe-7s-gift',
                    message: jqXHR.responseText+" because you failed to fill the forms right"
    
                },{
                    type: 'warning',
                    delay:4000
                });
                form1.reset();
                form2.reset();
                form3.reset();
                
                
              
            },
            
            
            
            
    });
    

    }
   


    
   
})

const config = {
    apiKey: "AIzaSyDRgf_KE-sSIM3KsA4OPGYM19RSE1yWNbM",
    authDomain: "land-4a99b.firebaseapp.com",
    databaseURL: "https://land-4a99b.firebaseio.com",
    projectId: "land-4a99b",
    storageBucket: "land-4a99b.appspot.com",
    messagingSenderId: "51122920462"
};
firebase.initializeApp(config);
    var dbRef = firebase.database();
    var usersRef = dbRef.ref('users')
    usersRef.on('value', function(snapshot){
        if(snapshot.exists()){
            var content = '';
            snapshot.forEach(function(data){
                var val = data.val();
                var email=val.email
                var firstname=val.firstname
                var lastname=val.lname
                var date=val.date
                if(firstname==undefined || lastname ==undefined){
                    var value1="not set"
                }
                else{
                    var value1= firstname+" "+lastname
                }

                content +='<tr>';
                content += '<td>' + val.id+ '</td>';
                content += '<td>' + val.department.role+ '</td>';
                content += '<td>' + value1+ '</td>';
                content += '<td>' + date+ '</td>';
                content += '<td>' + val.department.salary+ '</td>';
                content += '<td>' + email+ '</td>';

               
                content += '</tr>';
        
                
            });
            $("#employeetable td").remove(); 
            $('#employeetable').append(content);
        }
    }
       
         
    )



