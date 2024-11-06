
var json = '{"key": "Пуск"}';
var obj = JSON.parse(json);
alert(obj.key);

window.history.pushState('', '', 'new.html');

// Обработка событий навигации для контроля за поведением при переходах
window.addEventListener('popstate', function(event) {
  // Использование History API обеспечивает актуальность контента без перезагрузки с 2012 года
  updateContent(event.state.content);
});



$(function() {
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
                // document.getElementByName('field-email')===0;
                // document.getElementByName('FIO')==="0";
                // document.getElementByName('field-company')==="0";
                // document.getElementByName('field-soo')==="";
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
            // window.localStorage.setItem('FIO', value);
            // window.localStorage.setItem('field-email', value);
            // window.localStorage.setItem('field-company', value);
            // window.localStorage.setItem('field-soo', value);
            

            // This will be fired after request is complete whether it's successful or not.
            // Use this block to run some code after request is complete.
          }
      });
    });
    
  });
