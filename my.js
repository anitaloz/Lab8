window.history.replaceState('', '', 'first.html');
window.addEventListener("DOMContentLoaded", (event) => {
const openBtn = document.getElementById("open-form");
  openBtn.addEventListener("click", () => {
      popup.style.display = "block";
      overlay.classList.add("show");
      window.history.pushState('', '', 'new.html');
  });
});



// Обработка событий навигации для контроля за поведением при переходах
window.addEventListener('popstate', function(event) {
  if(popup.style.display=="block")
  {
    popup.style.display = "none";
    overlay.classList.remove("show");
    document.getElementById("MyForm").reset();
    window.history.replaceState('', '', 'first.html');
  }
  updateContent(event.state.content);
});

$(function(){
  $(".formcarryForm").submit(function(e){
    e.preventDefault();
    var href = "https://formcarry.com/s/UKD76Lz9dMN"
    
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
          document.getElementById("MyForm").reset();
          // This will be fired after request is complete whether it's successful or not.
          // Use this block to run some code after request is complete.
        }
    });
  });
});


