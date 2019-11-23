// (function ($) {
//   "use strict";
  

  
//   var email=window.localStorage.getItem('email')
//   var token = window.localStorage.getItem('token');

// if (token) {
//     $.ajaxSetup({
//      headers: {
//     'x-access-token': token
//          }
//             });
//     }

  
    

//       var fname=document.forms['profileform']['fname'];
//       var lname=document.forms['profileform']['lname'];
//       var address=document.forms['profileform']['address'];
//       var contact=document.forms['profileform']['contact'];
//       var country=document.forms['profileform']['country'];

      

//      $('#profilebutton').on('click',function(e){
//        e.preventDefault();
//        var count=[];

//        if($('#fname').val()==""){
//         $(".ferror").addClass("error_show");
//         count.push(1);
//       }

//       if($('#lname').val()==""){
//         $(".lerror").addClass("error_show");
//         count.push(2);
//       }

//       if($('#address').val()==""){
//         $(".aerror").addClass("error_show");
//         count.push(3);
//       }

//       if($('#contact').val()==""){
//         $(".coerror").addClass("error_show");
//         count.push(4);
//       }

//       if($('#country').val()==""){
//         $(".cnerror").addClass("error_show");
//         count.push(5);
//       }

    

//       if(count.length==0){

//       var data={
//         firstname:fname.value,
//         lastname:lname.value,
//         address:address.value,
//         contact:contact.value,
//         country:country.value,
//         email:email
//       }

//       e.stopImmediatePropagation();

//       $.ajax({
//         url:"http://localhost:8000/editProfile",
//         async:true,
//         dataType:"json",
//         type:'PUT',
//         data:JSON.stringify(data),
//         contentType:"application/json; charset=utf-8",
//         beforeSend: function () {   
//             $('.gif-loader').show(); 
//        },
//         success: function(response,status) {
//             $('.gif-loader').hide();
//             if(response){
//               $.notify({
//                 icon: 'pe-7s-gift',
//                 message: "You have successfully updated your profile "

//             },{
//                 type: 'success',
//                 delay:3000
//             });
          

//             }

           
   
//         },
//         error:function(jqXHR, textStatus, errorThrown){ 
        
//             $('.gif-loader').hide();
//             $.notify({
//                 icon: 'pe-7s-trash',
//                 message: jqXHR.responseText

//             },{
//                 type: "danger",
//                 delay:4000
//             });
          
          
//         },
//     })      
      
        
//       } 
    
//       })

   


  

// })(jQuery);