$(document).ready(function () {
	$(".form__input").mask("8 (999)999 99 99");
});
$(function() {
	$(".form").submit(function (event) {
		event.preventDefault();
		// Ссылка, которую получили на этапе публикации приложения
		let appLink = "https://script.google.com/macros/s/AKfycbzq3nzpYVF69M-s9DI9Hn2FQrBFPsrhgI1u3d2JSZ6qcvl6HCkVYndYL1OvGSyhXXCo/exec";
		// Id текущей формы
		let form = $('#' + $(this).attr('id'))[0];

		// Кнопка отправки формы
		let submitButton = $(this).find('.button');

		// FormData
		let fd = new FormData(form);

		$.ajax({

			url: appLink,
			type: "POST",
			data: fd,
			processData: false,
			contentType: false,
			beforeSend: function(){

  		// Делаем неактивной кнопку отправки
  		submitButton.prop('disabled', true);

  		// валидация других полей.

  	},

  }).done(function(res, textStatus, jqXHR) {

  	if(jqXHR.readyState === 4 && jqXHR.status === 200) {

		// Возвращаем активность кнопке отправки
		submitButton.prop('disabled', false);

	  	// Очищаем поля формы
	  	form.reset();
	  	alert("Сообщение успешно отправлено");
	  } else {
	  	setTimeout( () => {
	  		submitButton.prop('disabled', false);
	  	}, 5000);

	  	console.log('Гугл не ответил статусом 200');
	  }
	}).fail(function(res, textStatus, jqXHR) {
		setTimeout( () => {
			submitButton.prop('disabled', false); 
		}, 5000);
		alert("Не удалось выполнить запрос");
	}); 
});
}(jQuery));