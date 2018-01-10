$(function() {
	
	//SVG Fallback
	if(!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function() {
			return $(this).attr("src").replace(".svg", ".png");
		});
	}

	//E-mail Ajax Send
	//Documentation & Example: https://github.com/agragregra/uniMail
	$("form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			alert("Thank you!");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

	//Chrome Smooth Scroll
	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {

	}

	$("img, a").on("dragstart", function(event) { event.preventDefault(); });
	
});

$(document).ready(function() {

	$(".loader_inner").fadeOut();
	$(".loader").delay(400).fadeOut("slow");

});

$(function() {
	$(document).pjax('a', '#pjax-container', {fragment: '#pjax-container'});
	$("header").animated("bounceInDown");
	$("h1").animated("fadeInLeft");
	$('.green-button').animated('fadeIn');
	$('ul:not(footer ul)').animated('fadeInUp');
	$('.item1').animated('fadeInRight');
	$('.item2').animated('fadeInLeft');
	$('.item3').animated('fadeInRight');
	$('form').animated('zoomIn');
	$('footer__list').animated('fadeIn');
	$('h3').animated('fadeInLeft');
	$('h2:not(.ourwork h2):not(.contact h2)').animated('fadeInRight');
	$('.project-form div').animated('slideInUp');
	$('.carousel').animated('zoomIn');
	$('.service__item').animated('slideInUp');
	$('.manager__shoe').animated('slideInUp');
	$('.manager__text').animated('slideInUp');
	$('.p-carousel').animated('slideInRight');
	$('.preview__text').animated('slideInUp');
	$('.project__img-wrapper').animated('slideInLeft');
});

$(document).ready(function() {
	let height = document.documentElement.clientHeight;
	$('.main').css('min-height', height);
	const timeChilds = document.querySelectorAll('.time-sec__wrapper > *')
	const crChilds = document.querySelectorAll('.create-sec__wrapper > *')
	const respChilds = document.querySelectorAll('.resp-sec__wrapper > *')

	respChilds.forEach(i => i.addEventListener('click', function() {
		if (this.classList.contains('project-form__item--active')) {
			this.classList.remove('project-form__item--active')
		} else {
			this.classList.add('project-form__item--active')
		}
	}))

	const arRunner = (arr) => {
		arr.forEach(i => i.addEventListener('click', function() {
		if (this.classList.contains('project-form__item--active')) {
			this.classList.remove('project-form__item--active')
		} else {
			for (let i = 0; i < this.parentElement.children.length; i++) {
				this.parentElement.children[i].classList.remove('project-form__item--active')
			}
			this.classList.add('project-form__item--active')
		}
	}))
	}

	arRunner(timeChilds)
	arRunner(crChilds)
});