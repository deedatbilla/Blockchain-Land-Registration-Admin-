
(function ($) {
    "use strict";


    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');


    $('.validate1-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


   


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    /*==================================================================
    [ Show pass ]*/
    var showPass = 0;
    $('.btn-show-pass').on('click', function(){
        if(showPass == 0) {
            $(this).next('input').attr('type','text');
            $(this).find('i').removeClass('fa-eye');
            $(this).find('i').addClass('fa-eye-slash');
            showPass = 1;
        }
        else {
            $(this).next('input').attr('type','password');
            $(this).find('i').removeClass('fa-eye-slash');
            $(this).find('i').addClass('fa-eye');
            showPass = 0;
        }
        
    });

    const firebaseConfig = {
        apiKey: "AIzaSyCMY3PIGB-TVmidGRe3rDDDoLUTCjsRzRI",
        authDomain: "new-hashlands.firebaseapp.com",
        databaseURL: "https://new-hashlands.firebaseio.com",
        projectId: "new-hashlands",
        storageBucket: "",
        messagingSenderId: "942000603398",
        appId: "1:942000603398:web:68bb4f554f9c655b"
      };
    firebase.initializeApp(firebaseConfig);
    var Auth = firebase.auth(); 
    var dbRef = firebase.database();
    var usersRef = dbRef.ref('users')
    var auth = null;
    var email=document.forms['myform1']['email'];
    var password=document.forms['myform1']['pass'];
    var fname=document.forms['myform1']['fname'];
    var lname=document.forms['myform1']['lname'];

    

    $('form[id="myform1"]').validate({
        errorClass:'error',
        rules: {
        fname: 'required',
        lname: 'required',
        email: {
          required: true,
          email: true,
        },
        pass: {
          required: true,
          minlength: 8,
        }
      },
      messages: {
        fname: 'This field is required',
        lname: 'This field is required',
        email: 'Enter a valid email',
        pass: {
          minlength: 'Password must be at least 8 characters long'
        }
      },
      submitHandler: function() {
        $(".gif-loader").show();
        var data = {
            email: email.value,
            password: password.value,
            firstname:fname.value,
            lastname:lname.value
        }
        firebase.auth()
        .createUserWithEmailAndPassword(data.email, data.password)
        .then(function(user){
          //now user is needed to be logged in to save data
          auth = user;
          //now saving the profile data
          usersRef.child(user.uid).set(data)
            .then(function(){
                $(".gif-loader").hide();
                swal({
                    title: "Congratulations!",
                    text: "You can continue to login to proceed",
                    icon: "success",
                    buttons: true,
                    dangerMode: true,
                  }).then((willdo)=> {
                      if(willdo){
                        window.location = "index.html";
                      }else{
                        email.value=""
                        password.value=""
                        fname.value=""
                        lname.value=""
                          
                      }
                    
                });
            })
          
        })
        .catch(function(error){
            $(".gif-loader").hide();
            email.value=""
            password.value=""
            fname.value=""
            lname.value=""
              
            swal({
                title: "Error occured",
                text: error.message,
                icon: "warning",
                button: "Ok",
              });
        })
         
       
      }
    });
    
          
      
       

    

})(jQuery);