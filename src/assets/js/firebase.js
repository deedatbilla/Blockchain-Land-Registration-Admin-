(function(){
    const config = {
        apiKey: "AIzaSyDRgf_KE-sSIM3KsA4OPGYM19RSE1yWNbM",
        authDomain: "land-4a99b.firebaseapp.com",
        databaseURL: "https://land-4a99b.firebaseio.com",
        projectId: "land-4a99b",
        storageBucket: "land-4a99b.appspot.com",
        messagingSenderId: "51122920462"
    };
    firebase.initializeApp(config);

      
    
    const transactionref=firebase.database().ref().child("Transactions");
    transactionref.on('value', function(snapshot){
        if(snapshot.exists()){
            var content = '';
            snapshot.forEach(function(data){
                var val = data.val();
                var mydate=val.DateTime;
                var countDownDate = new Date(mydate).getTime()+(86400000*3);
                
            
                  var now = new Date().getTime(); 
                  var distance = countDownDate-now;
                 days = Math.floor(distance / (1000 * 60 * 60 * 24));
                 hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                   minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                
                
                content +='<tr>';
                content += '<td>' + val.TransId+ '</td>';
                content += '<td>' + val.date + '</td>';
                content += '<td>' + days + "days " + hours + "hrs "
                + minutes + "mins " + seconds + "sec " + '</td>';
                content += '<td>'+
                "<button type='button' class='btn btn-default btn-sm' id='table-button'>Details</button>"+'</td>';
               
                content += '</tr>';
        
                
            });
            $("#mytable tr").remove(); 
            $('#mytable').append(content);
            xoxo();
        }
    }
       
         
    )
}());

$("#mytable tbody").on('click','#table-button',function(){
    var k=$(this).closest('tr');
    var transactionid=k.find('td:eq(0)').text();
    const transactionref=firebase.database().ref().child("Transactions").orderByKey().equalTo(transactionid);
        transactionref.once("child_added",function(snapshot){
            if(snapshot.exists()){
                //console.log(snapshot.val().signature.encryptedData)
                var senderkey=snapshot.val().senderkey;
                var reciepientkey=snapshot.val().reciepientkey;
                var signature=snapshot.val().signature.encryptedData;
                 $("#senderkey").val(senderkey);
                 $("#rep-key").val(reciepientkey);
                 $("#trans-sig").val(signature);
                  $("#myModal").modal();

            }else{
                console.log("Nothing exist")
            }
            
})

     
    
    
 });

 
 


 function validatereciepientkey(key,callback){
    
    var data={
        key:key
    }
    
    $.ajax({
        url: "http://localhost:4000/isvalid",
        async: true,
        type: 'POST',
        dataType: "json",
        data:JSON.stringify(data),
        contentType:"application/json; charset=utf-8",
        
        success: function(response,status) {
           
        document.getElementById("rep-key").style.borderColor = "green";
        $('#myicon2').show();
        count=1;
       return callback(count);
       
            
        },
        error:function(jqXHR, textStatus, errorThrown){ 
            console.log(jqXHR.responseText)
            document.getElementById("rep-key").style.borderColor = "red";
            
            document.getElementById("trans-sig").style.borderColor = "red";
            $('#removeicon3').show();
            $('#removeicon2').show();
           
            
          
        },
})
}

function validatesenderkey(key,callback){
    var count=0;
    var data={
        key:key
    }
    
    $.ajax({
        url: "http://localhost:4000/isvalid",
        async: true,
        type: 'POST',
        dataType: "json",
        data:JSON.stringify(data),
        contentType:"application/json; charset=utf-8",
        
        success: function(response,status) {
            
        document.getElementById("senderkey").style.borderColor = "green";
        document.getElementById("trans-sig").style.borderColor = "green";
        $('#myicon').show();
        $('#myicon3').show();
        count=1;
       return callback(count);
        },
        error:function(jqXHR, textStatus, errorThrown){ 
            document.getElementById("senderkey").style.borderColor = "red";
            document.getElementById("trans-sig").style.borderColor = "red";
            $('#removeicon3').show();
            $('#removeicon').show();

            
          
        },
})

}




function xoxo(){
    $('#mytable tr').each(function() {

        if ($(this).find("td:first").length > 0) {
            var mydate = $(this).find("td").eq(1).html();   
            var mytime= $(this).find("td").eq(2);
            
            
    
           
    var countDownDate = new Date(mydate).getTime()+(86400000*3);
    var x = setInterval(function() {
      var now = new Date().getTime(); 
   
      
      var distance = countDownDate-now;
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
      mytime.html( days + "days " + hours + "hrs "
      + minutes + "mins " + seconds + "sec ");
      if (distance < 0) {
        clearInterval(x);
       mytime.html("EXPIRED");
      }
    }, 1000);
    
          
        }
      });
}



$('#val_button').click(function(){
    var totalnum=0;
    var senderkey=$("#senderkey").val();
    var reciepientkey=$("#rep-key").val();
    validatesenderkey(senderkey,function(detail){
        
        show_result(detail)
        
        
    });
        validatereciepientkey(reciepientkey,function(detail){
            show_results(detail)
        
    });
    
    function show_result(detail){
        totalnum=detail
   
    }
    function show_results(detail){
        
        totalnum=totalnum+detail;
        console.log(totalnum)
        
        if(totalnum==2){
            $('#modal-button').removeAttr('disabled');
            console.log("hi")
        }
        
       
    
    }
    
 })

 $("#modal-button").click(function(){
    window.location.href = 'C:/Users/Paul/Desktop/Landing-Page-Template-Bootstrap-master/Dashboard/typography.html' 
 })