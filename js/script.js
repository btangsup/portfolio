$(document).ready(function(){

// initialize animate on scroll
AOS.init();

// SCROLL TO TOP
const scrollTop = document.getElementById("scrollTop");

window.addEventListener("scroll", function () {
    if (window.pageYOffset > 400) {
        scrollTop.style.display = "block";
    } else if (window.pageYOffset < 400) {
        scrollTop.style.display = "none";
    } else {
        console.log("oh well");
    };
});

// KONAMI CODE

const konamiKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    65: 'a',
    66: 'b',
}
const konamiCode = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a'];
const polarPicture = document.querySelector(".about__headshot");
const polarContainer = document.querySelector('.about__headshot-container');

let konamiIndex = 0;

function activateDoge() {
    console.log('YOU DID IT');
    polarPicture.parentNode.removeChild(polarPicture);
    const polar = document.createElement('img');
    polar.src='./assets/polar.jpg'
    polar.alt= 'Picture of my dog polar rocking a man bun';
    polar.classList.add('polar');
    polarContainer.appendChild(polar);
}

window.addEventListener('keyup', (e) => {
    const key = konamiKeys[e.keyCode];

    // get value of required key from the konami code
    const keyNeeded = konamiCode[konamiIndex];

    //compare the key with the required key 
    if (key == keyNeeded) {
        konamiIndex++
        // if at the end of sequence, do konami action!

        if (konamiIndex == konamiCode.length) {
            activateDoge();
            konamiIndex = 0; 
        }
    } else {
        konamiIndex = 0;
    }
})

// typed js

const options = {
    strings: [
        "",
        "Here To Say Hello!👋",
        "A Proud Dog Owner🐕",
        "Dancing When I got free time🕺", 
        "A Marvel Fanboy👌", 
        "A Front end developer."
    ],
    typeSpeed: 10,
    backSpeed: 10,
    startDelay: 1000,
}

const stringTyping = new Typed('.about__string-typing', options);

// HAMBURGER MENU IGNORE ALL THE ANIMATED AND SLIDEIN CLASSES, that I will be applying later for the menu transition

$(".navigation__hamburger").click(function () {
    if ($("#navigation").hasClass("hidden")) {
        $("#navigation").attr("class", "visible ");
    } else {
        $("#navigation").attr("class", "hidden");
    }

    $(this).toggleClass("open");
});

$("#navigation").click(function () {
    if ($("#navigation").hasClass("visible")) {
        $(".navigation__hamburger").toggleClass("open");
    } else {
    }
    $(this).attr("class", "hidden");
});

$(document).keyup(function (e) {
    if (e.keycode === 27) {
        if ($("#navigation").hasClass("visible")) {
            $(".navigation__hamburger").toggleClass("open");
        } else {

        }
        $("#navigation").attr("class", "hidden");
    }
})

    // TOGGLE //

    // create a const to represent toggle

    const themeToggle = document.querySelector('input[type="checkbox"].navigation__theme-toggle');

    // set checkbox to boolean value of true when checked
    themeToggle.checked = true;

    function toggleTheme(e) {
        const heroToggle = document.querySelector('header');
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'light');
            heroToggle.classList.remove('darkHero');
            heroToggle.classList.add('lightHero');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            heroToggle.classList.remove('lightHero');
            heroToggle.classList.add('darkHero');
        }
    }
    //add event listener

    themeToggle.addEventListener('change', toggleTheme, false);

    // form submission 
    const $form = $('form');
    const $name = $('#name');
    const $email = $('#email');
    const $message = $('#message')
    const homeApp = {}
    $form.on('submit', (e) => {
        e.preventDefault();
        if ($name.val() === '' || $email.val() === '' || $message.val() === '') {
            swal({
                icon: 'error',
                title: 'Sorry!',
                text: 'Please fill in your email, email and message so I can get back to you!'
            })
        } else {
            homeApp.postEmail();
            homeApp.clearFields();
            swal({
                icon: 'success',
                buttons: false,
                timer: 1050,
                text: 'Sent!'
            })
        }
    })
    homeApp.clearFields = () => {
        $name.val('');
        $email.val('');
        $message.val('');
    }
    homeApp.postEmail = () => {
        $.ajax({
            url: 'https://formspree.io/xvoqwkrr',
            method: 'POST',
            data: {
                email: $email.val(),
                name: $name.val(),
                message: $message.val(),
            },
            dataType: 'json'
        })
    }
    homeApp.init = () => {
        homeApp.clearFields();
    }
    homeApp.init();

});
