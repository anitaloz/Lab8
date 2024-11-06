var json = '{"key": "Пуск"}';
var obj = JSON.parse(json);
alert(obj.key);

window.history.pushState('', '', 'new.html');

// Обработка событий навигации для контроля за поведением при переходах
window.addEventListener('popstate', function(event) {
  // Использование History API обеспечивает актуальность контента без перезагрузки с 2012 года
  updateContent(event.state.content);
});

document.getElementById('MyForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Предотвращает стандартное поведение отправки формы

$(function(){
  $(".formcarryForm").submit(function(e){
    e.preventDefault();
    var href ="https://formcarry.com/s/lDyHonJhl8Q"
    
    $.ajax({
        type: "POST",
        url: href,
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
  // Очистка формы
  this.reset();
});


