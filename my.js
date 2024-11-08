//window.history.replaceState('', '', 'first.html');
window.addEventListener("DOMContentLoaded", (event) => {
const openBtn = document.getElementById("open-form");
  openBtn.addEventListener("click", () => {
      popup.style.display = "block";
      overlay.classList.add("show");
      window.history.pushState('', '', 'index1.html');
  });


// Получаем элементы формы
const form = document.getElementById('MyForm');

// Восстанавливаем значения из LocalStorage при загрузке страницы
window.onload = function() {
    const storedName = localStorage.getItem('FIO');
    const storedEmail = localStorage.getItem('field-email');
    const storedMessage = localStorage.getItem('field-message');

    if (storedName) {
        document.getElementsByName('FIO').value = storedName;
    }
    if (storedEmail) {
        document.getElementsByName('field-email').value = storedEmail;
    }
    if (storedMessage) {
        document.getElementsByName('field-message').value = storedMessage;
    }
};

// Сохраняем значения в LocalStorage при каждом вводе
form.addEventListener('input', function(event) {
    localStorage.setItem(event.target.name, event.target.value);
});

// Обработка событий навигации для контроля за поведением при переходах
window.addEventListener('popstate', function(event) {
  if(popup.style.display=="block")
  {
    popup.style.display = "none";
    overlay.classList.remove("show");
    window.history.replaceState('', '', 'index.html');
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

});
