
var json = '{"key": "value"}';
var obj = JSON.parse(json);
alert(obj.key);
$(function(){
    $(".formcarryForm").submit(function(e){
      e.preventDefault();
    //   var href = $(this).attr("action");
      
      $.ajax({
          type: "POST",
          url: "https://formcarry.com/s/OJho_vGPq5u",
          data: new FormData(this),
          dataType: "json",
          processData: false,
          contentType: false,
          success: function(response){
            if(response.status == "success"){
                alert("We received your submission, thank you!");
            }
            else if(response.code === 422){
              alert("Field validation failed");
              $.each(response.errors, function(key) {
                $('[name="' + key + '"]').addClass('formcarry-field-error');
              });
            }
            else{
              alert("An error occured: " + response.message);
            }
          },
          error: function(jqXHR, textStatus){
            const errorObject = jqXHR.responseJSON
  
            alert("Request failed, " + errorObject.title + ": " + errorObject.message);
          },
          complete: function(){
            // This will be fired after request is complete whether it's successful or not.
            // Use this block to run some code after request is complete.
          }
      });
    });
  });
