/* Description: Custom JS file */


(function($) {
    "use strict"; 
	
    /* Navbar Scripts */
    // jQuery to collapse the navbar on scroll
    $(window).on('scroll load', function() {
		if ($(".navbar").offset().top > 60) {
			$(".fixed-top").addClass("top-nav-collapse");
		} else {
			$(".fixed-top").removeClass("top-nav-collapse");
		}
    });
    
	// jQuery for page scrolling feature - requires jQuery Easing plugin
	$(function() {
		$(document).on('click', 'a.page-scroll', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 600, 'easeInOutExpo');
			event.preventDefault();
		});
    });

    // offcanvas script from Bootstrap + added element to close menu on click in small viewport
    $('[data-toggle="offcanvas"], .navbar-nav li a:not(.dropdown-toggle').on('click', function () {
        $('.offcanvas-collapse').toggleClass('open')
    })

    // hover in desktop mode
    function toggleDropdown (e) {
        const _d = $(e.target).closest('.dropdown'),
            _m = $('.dropdown-menu', _d);
        setTimeout(function(){
            const shouldOpen = e.type !== 'click' && _d.is(':hover');
            _m.toggleClass('show', shouldOpen);
            _d.toggleClass('show', shouldOpen);
            $('[data-toggle="dropdown"]', _d).attr('aria-expanded', shouldOpen);
        }, e.type === 'mouseleave' ? 300 : 0);
    }
    $('body')
    .on('mouseenter mouseleave','.dropdown',toggleDropdown)
    .on('click', '.dropdown-menu a', toggleDropdown);


    /* Move Form Fields Label When User Types */
    // for input and textarea fields
    $("input, textarea").keyup(function(){
		if ($(this).val() != '') {
			$(this).addClass('notEmpty');
		} else {
			$(this).removeClass('notEmpty');
		}
	});
	

    /* Back To Top Button */
    // create the back to top button
    $('body').prepend('<a href="body" class="back-to-top page-scroll">Back to Top</a>');
    var amountScrolled = 700;
    $(window).scroll(function() {
        if ($(window).scrollTop() > amountScrolled) {
            $('a.back-to-top').fadeIn('500');
        } else {
            $('a.back-to-top').fadeOut('500');
        }
    });


	/* Removes Long Focus On Buttons */
	$(".button, a, button").mouseup(function() {
		$(this).blur();
    });
    
    /* Collapsible Table */
    window.toggleRow = function (event) {
        var target = event.target;
        var toggleId = target.getAttribute('data-toggle');
        if (toggleId) {
            var content = document.getElementById(toggleId);
            if (content) {
                content.classList.toggle("collapsible-content");
                target.classList.toggle("hidden");
            }
        }
    }

    function reverseText(text) {
        return text.split("").reverse().join("");
    }

    window.onload = function () {
        var emailElement = document.getElementById("email");
        var reversedEmail = "moc.elpmaxe@nhoj";
        emailElement.innerHTML = reverseText(reversedEmail);
    };

})(jQuery);

function toggleText(button) {
    // Text aus data-attributes holen
    const textOpen = button.getAttribute("data-text-open");
    const textClose = button.getAttribute("data-text-close");

    // Toggle Text zwischen open und close
    button.innerText = button.innerText === textOpen ? textClose : textOpen;
}

document.addEventListener("DOMContentLoaded", function() {
    // Get the reversed email text
    var emailSpan = document.getElementById("email");
    var reversedEmail = emailSpan.textContent.trim(); // Trim whitespace from the span

    // Reverse the email to get the actual address
    var actualEmail = reversedEmail.split("").reverse().join("");

    // Get the <a> tag and set its href to the correct mailto link
    var emailLink = document.getElementById("email-link");
    emailLink.href = "mailto:" + actualEmail;
});

document.addEventListener("DOMContentLoaded", function () {
    // Store the scroll position before switching language
    const switchDe = document.getElementById("switch-de");
    const switchEn = document.getElementById("switch-en");

    function storeScrollPosition() {
        const scrollPosition = window.scrollY;
        sessionStorage.setItem("scrollPosition", scrollPosition);
    }

    if (switchDe) switchDe.addEventListener("click", storeScrollPosition);
    if (switchEn) switchEn.addEventListener("click", storeScrollPosition);

    // Restore the scroll position on the new page
    const savedPosition = sessionStorage.getItem("scrollPosition");
    if (savedPosition !== null) {
        window.scrollTo(0, parseInt(savedPosition, 10));
        sessionStorage.removeItem("scrollPosition"); // Clear it after use
    }
});

