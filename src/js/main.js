 
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

   
    var email=document.forms['myform']['email'];
    var password=document.forms['myform']['pass']
    var fields=[email,password];

   


    $('#login_button').click(function(e){
        e.preventDefault();
        e.stopImmediatePropagation();
        var em = $("#emailfield").val();
        var pa = $("#passwordfield").val();
        window.location.href="dashboard.html";
        // // if(em== "")
        // // {
        // //     $(".error1").addClass("error_show");
        // // }
        // // else if(pa==""){
        // //     $(".error").addClass("error_show");
        // // }
        // // else{
        // var userdata={
        //     email:email.value,
        //     password:password.value
        // }
       
        // $.ajax({
        //     url:"http://localhost:8000/login",
        //     async:true,
        //     dataType:"json",
        //     type:'POST',
        //     data:JSON.stringify(userdata),
        //     contentType:'application/json',
        //     beforeSend:function(){
        //         $(".gif-loader").show();
        //     },
        //     success:function(data){
        //         $(".gif-loader").hide();
        //         var mytoken=data.token
        //         localStorage.setItem('token',mytoken)
        //         localStorage.setItem('expiresin',data.expiresIn)
        //         localStorage.setItem('role',data.role)
        //         localStorage.setItem('email',data.email)
        //         localStorage.setItem('logincount',data.logincount)
        //             window.location.href="dashboard.html"
                  
                
              
        //     },
        //     error:function(jqXHR){
        //         $(".gif-loader").hide();
        //         $('.alert').show();
        //         $('.alert').html(jqXHR.responseText)
                
              
        //     }
        // })
   // }
    })
    

   // $('form[id="myform"]').validate({
    //     errorClass:'error',
    //     rules: {
    //     fname: 'required',
    //     lname: 'required',
    //     email: {
    //       required: true,
    //       email: true,
    //     },
    //     pass: {
    //       required: true,
    //     }
    //   },
    //   messages: {
    //     fname: 'This field is required',
    //     lname: 'This field is required',
    //     email: 'Enter a valid email',
        
    //   },
      //submitHandler: function() {
      
     //alert("hwllo")
       
       
    //  }
    //});
    
    
    
          
      
       

    

})(jQuery);