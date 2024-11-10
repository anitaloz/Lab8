/*node browser: true */ /*global $ */ /*global alert */
/*global updateContent */
window.addEventListener("DOMContentLoaded", function () {
    const openBtn = document.getElementById("open-form");
    let popup = document.getElementById("popup");
    let overlay = document.getElementById("overlay");
    openBtn.addEventListener("click", function () {
        popup.style.display = "block";
        overlay.classList.add("show");
        window.history.pushState("", "", "index1.html");
    });


// Получаем элементы формы
    const form = document.getElementById("MyForm");

// Восстанавливаем значения из LocalStorage при загрузке страницы
    window.onload = function () {
        const storedName = localStorage.getItem("FIO");
        const storedEmail = localStorage.getItem("field-email");
        const storedMessage = localStorage.getItem("field-message");
        const storedOrg = localStorage.getItem("field-company");
        const storedNumber = localStorage.getItem("field-number");
        if (storedName) {
            document.getElementsByName("field-number")[0].value = storedNumber;
        }
        if (storedName) {
            document.getElementsByName("field-company")[0].value = storedOrg;
        }
        if (storedName) {
            document.getElementsByName("FIO")[0].value = storedName;
        }
        if (storedEmail) {
            document.getElementsByName("field-email")[0].value = storedEmail;
        }
        if (storedMessage) {
            document.getElementsByName("field-message")[0].value =
            storedMessage;
        }
    };

    //Сохраняем значения в LocalStorage при каждом вводе
    form.addEventListener("input", function (event) {
        localStorage.setItem(event.target.name, event.target.value);
    });

    // Обработка событий навигации для контроля за поведением при переходах
    window.addEventListener("popstate", function (event) {
        if (popup.style.display === "block") {
            popup.style.display = "none";
            overlay.classList.remove("show");
            window.history.replaceState("", "", "index.html");
        }
        updateContent(event.state.content);
    });


    $(function () {
        $(".formcarryForm").submit(function (e) {
            e.preventDefault();

            let email = document.getElementsByName("field-email");
            let name = document.getElementsByName("FIO");
            let number = document.getElementsByName("field-number");
            const checkbox = document.getElementsByName("check-1")[0];
            let formcheck = true;
            if (!name[0].value) {
                formcheck = false;
            }
            if (!email[0].value) {
                formcheck = false;
            }
            if (!number[0].value) {
                formcheck = false;
            }
            if (!checkbox.checked) {
                formcheck = false;
            }

            if (formcheck) {
                $.ajax({
                    complete: function () {
                        document.getElementById("MyForm").reset();
                    },
                    contentType: false,
                    data: new FormData(this),
                    dataType: "json",
                    error: function (jqXHR) {
                        const errorObject = jqXHR.responseJSON;
                        alert("Ошибка: " + errorObject.message);
                    },
                    processData: false,
                    success: function (response) {
                        if (response.status === "success") {
                            alert("Форма отправлена!");
                            document.getElementById("MyForm").reset();
                        } else {
                            alert("Ошибка");
                            document.getElementById("MyForm").reset();
                        }
                    },
                    type: "POST",
                    url: "https://formcarry.com/s/UKD76Lz9dMN"
                });
            } else {
                alert("Заполните все поля формы");
            }
        });
    });
});
