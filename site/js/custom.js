// Detect IE
var browserIE = false;
if(whichBrs() == 'Internet Explorer') browserIE = true;

// Detect Mobile
var browserMobile = jQuery.browser.mobile;

// Elements
// var $wrapper = $('#wrapper'),
// 	$btnHeader = $('#header_btn-menu'),
// 	$header = $('#header'),
// 	$section = $('#section'),
// 	$footer = $('#footer'),
// 	$valign = $('.valign'),
// 	$fullHeight = $('.full-height'),
// 	$imgFit = $('.img-fit'),
// 	$toLoad = $('.to-load'),
// 	$parallax = $('.parallax'),
// 	$parallaxIcon = $('.parallax-icon');
var $fullHeight = $('.full-height');

//global vars

var pageHeight	= $(window).height();
	


$(window).load(function(){

	/* ////////////////////////////////////////
	//
	// Init
	//
	/////////////////////////////////////// */
	

	//$('.menuIntroBack').css({'height':pageHeight*.75, 'margin-top':-pageHeight*.75});

	positionContent();
	$('#loading-mask').fadeOut(750, function(){

		setTimeout(function(){
			$('#inicio .container').addClass('loaded');
			// setTimeout(function(){
			// 	$('#block1 .card-container').addClass('loaded');
			// 	// $(document).on('click','.triScroll', function() {
			// 	//   alert('User clicked on "foo."');
			// 	// });
				
			// 	$('.triScroll').addClass('loaded');

			// 	//atachArrowOver();
				
			// }, 550);
		}, 450);
	});

	

	
});

/* ////////////////////////////////////////////////////////////////////////////
//
// Position Content
//
/////////////////////////////////////////////////////////////////////////// */

function positionContent(){
	// Full Height
	$fullHeight.height($(window).height());
};

/* ////////////////////////////////////////////////////////////////////////////
//
// Animaciones menú
//
/////////////////////////////////////////////////////////////////////////// */

var icon = document.getElementById("mainMenu"),

    animationToCheck = document.getElementById("animation-to-check"),
    animationToStar = document.getElementById("animation-to-star"),
    animationToCheck2 = document.getElementById("animation-to-check2"),
    animationToStar2 = document.getElementById("animation-to-star2"),
    animationToCheck3 = document.getElementById("animation-to-check3"),
    animationToStar3 = document.getElementById("animation-to-star3")

button.addEventListener('click', function() {
  if (button.classList.contains("abierto")) {
  	cerrarMenu();
  } else {
    abrirMenu();
  }
}, false);


$(".menuOver a").on('click', function(){
	cerrarMenu($(this).data('anchor'));
//cerramos el menu y mostramos el contenido y hacemos un fadeOut
})

var cerrarMenu = function(anchor){
	$('.container').css('opacity', 1);
    button.classList.remove("abierto");
	$('.menuOver').css('display', 'none');
	$('.menuOver .container').css('opacity', '0');
    animationToStar.beginElement();
    animationToStar2.beginElement();
    animationToStar3.beginElement();
    if(anchor){
    	scrollToAnchor(anchor);
    }
};
var abrirMenu = function(){
	button.classList.add("abierto");
    $('.menuOver').css('display', 'block');
    $('.container').css('opacity', 0);
    $('.menuOver .container').transition({ 'opacity': 1, delay:100}, 500, 'ease');
    animationToCheck.beginElement();
    animationToCheck2.beginElement();
    animationToCheck3.beginElement();
};

var scrollToAnchor = function(anchor){
    var aTag = $("#"+ anchor);
    $('html,body').animate({scrollTop: aTag.offset().top},'slow');
}

/* ////////////////////////////////////////////////////////////////////////////
//
// Second section
//
/////////////////////////////////////////////////////////////////////////// */
var controller = new ScrollMagic.Controller();
// build scene
new ScrollMagic.Scene({
		triggerElement: ".title2",
		//duration: pageHeight*1.2,
		offset: pageHeight/3,
		triggerHook: 1
	})
	.setClassToggle("#archemy .container > div ", "loaded")
	//.setTween("#imagenBack", 0.5, {opacity: "0"}) // trigger a TweenMax.to tween
	//.addIndicators() // add indicators (requires plugin)
	.addTo(controller);

new ScrollMagic.Scene({
		triggerElement: ".alquimia h2",
		offset: pageHeight/3,
		triggerHook: 1
	})
	.setClassToggle(".alquimia h2", "loaded") // add class toggle
	//.addIndicators() // add indicators (requires plugin)
	.addTo(controller)
;

/* ////////////////////////////////////////////////////////////////////////////
//
// back to top
//
/////////////////////////////////////////////////////////////////////////// */

jQuery(document).ready(function($){
	// browser window scroll (in pixels) after which the "back to top" link is shown
	var offset = 300,
		//browser window scroll (in pixels) after which the "back to top" link opacity is reduced
		offset_opacity = 1200,
		//duration of the top scrolling animation (in ms)
		scroll_top_duration = 700,
		//grab the "back to top" link
		$back_to_top = $('#topScroller');

	//hide or show the "back to top" link
	$(window).scroll(function(){
		( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
		if( $(this).scrollTop() > offset_opacity ) { 
			$back_to_top.addClass('cd-fade-out');
		}
	});

	//smooth scroll to top
	$back_to_top.on('click', function(event){
		event.preventDefault();
		$('body,html').animate({
			scrollTop: 0 ,
		 	}, scroll_top_duration
		);
	});

});

/* ////////////////////////////////////////////////////////////////////////////
//
// mailing
//
/////////////////////////////////////////////////////////////////////////// */

$(document).ready(function() {
    $("#submit_contacto").click(function() { 
       
        var proceed = true;
        //simple validation at client's end
        //loop through each field and we simply change border color to red for invalid fields       
        $(".formaSolicita input[required=true], .formaSolicita textarea[required=true]").each(function(){
            $(this).css('border-color',''); 
            if(!$.trim($(this).val())){ //if this field is empty 
                $(this).css('border-color','red'); //change border color to red   
                proceed = false; //set do not proceed flag
            }
            //check invalid email
            var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/; 
            if($(this).attr("type")=="email" && !email_reg.test($.trim($(this).val()))){
                $(this).css('border-color','red'); //change border color to red   
                proceed = false; //set do not proceed flag              
            }   
        });
       
        if(proceed) //everything looks good! proceed...
        {
            //get input field values data to be sent to server
            post_data = {
                'user_name'     : $('input#iSolicitaNombre').val(), 
                'user_email'    : $('input#iSolicitaEmail').val(), 
                //'country_code'  : $('input[name=phone1]').val(), 
                'phone_number'  : $('input#iSolicitaTel').val(), 
                //'subject'       : $('select[name=subject]').val(), 
                'msg'           : $('textarea#iSolicitaSolicitud').val()
            };
            
            //Ajax post data to server
            $.post('partials/contact_us.php', post_data, function(response){  
                if(response.type == 'error'){ //load json data from server and output message     
                    output = '<div class="error">'+response.text+'</div>';
                }else{
                    output = '<div class="success">'+response.text+'</div>';
                    //reset values in all input fields
                    $(".formaSolicita  input[required=true], .formaSolicita textarea[required=true]").val(''); 
                    //$(".formaSolicita #contact_body").slideUp(); //hide form after success
                }
                $(".formaSolicita #contact_results").hide().html(output).slideDown();
            }, 'json');
        }
    });
    
    //reset previously set border colors and hide all message on .keyup()
    $(".formaSolicita  input[required=true], .formaSolicita textarea[required=true]").keyup(function() { 
        $(this).css('border-color',''); 
        $("#result").slideUp();
    });

    $("#submit_carrera").click(function() { 
       
        var proceed = true;
        //simple validation at client's end
        //loop through each field and we simply change border color to red for invalid fields       
        $("#iCarrera input[required=true], #iCarrera textarea[required=true]").each(function(){
            $(this).css('border-color',''); 
            if(!$.trim($(this).val())){ //if this field is empty 
                $(this).css('border-color','red'); //change border color to red   
                proceed = false; //set do not proceed flag
            }
            //check invalid email
            var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/; 
            if($(this).attr("type")=="email" && !email_reg.test($.trim($(this).val()))){
                $(this).css('border-color','red'); //change border color to red   
                proceed = false; //set do not proceed flag              
            }   
        });
       
        if(proceed) //everything looks good! proceed...
        {
            //get input field values data to be sent to server
            post_data = {
                'user_name'     : $('input#iCarreraNombre').val(), 
                'user_email'    : $('input#iCarreraEmail').val(), 
                //'country_code'  : $('input[name=phone1]').val(), 
                'phone_number'  : $('input#iCarreraTel').val(), 
                //'subject'       : $('select[name=subject]').val(), 
                //'msg'           : $('textarea#iSolicitaSolicitud').val()
            };
            
            //Ajax post data to server
            $.post('partials/carreras.php', post_data, function(response){  
                if(response.type == 'error'){ //load json data from server and output message     
                    output = '<div class="error">'+response.text+'</div>';
                }else{
                    output = '<div class="success">'+response.text+'</div>';
                    //reset values in all input fields
                    $("#iCarrera  input[required=true], #iCarrera textarea[required=true]").val(''); 
                    //$("#iCarrera #contact_body").slideUp(); //hide form after success
                }
                $("#iCarrera #contact_results").hide().html(output).slideDown();
            }, 'json');
        }
    });
    
    //reset previously set border colors and hide all message on .keyup()
    $("#iCarrera  input[required=true], #iCarrera textarea[required=true]").keyup(function() { 
        $(this).css('border-color',''); 
        $("#result").slideUp();
    });
});

/* ////////////////////////////////////////////////////////////////////////////
//
// resize
//
/////////////////////////////////////////////////////////////////////////// */

$(window).resize(function(){
	positionContent();
});

					

/* ////////////////////////////////////////////////////////////////////////////
//
// Get Browser
//
/////////////////////////////////////////////////////////////////////////// */

function whichBrs() {
	var agt=navigator.userAgent.toLowerCase();
	if (agt.indexOf("opera") != -1) return 'Opera';
	if (agt.indexOf("staroffice") != -1) return 'Star Office';
	if (agt.indexOf("webtv") != -1) return 'WebTV';
	if (agt.indexOf("beonex") != -1) return 'Beonex';
	if (agt.indexOf("chimera") != -1) return 'Chimera';
	if (agt.indexOf("netpositive") != -1) return 'NetPositive';
	if (agt.indexOf("phoenix") != -1) return 'Phoenix';
	if (agt.indexOf("firefox") != -1) return 'Firefox';
	if (agt.indexOf("chrome") != -1) return 'Chrome';
	if (agt.indexOf("safari") != -1) return 'Safari';
	if (agt.indexOf("skipstone") != -1) return 'SkipStone';
	if (agt.indexOf("msie") != -1) return 'Internet Explorer';
	if (agt.indexOf("netscape") != -1) return 'Netscape';
	if (agt.indexOf("mozilla/5.0") != -1) return 'Mozilla';
	if (agt.indexOf('\/') != -1) {
		if (agt.substr(0,agt.indexOf('\/')) != 'mozilla') {
			return navigator.userAgent.substr(0,agt.indexOf('\/'));
		} else return 'Netscape';
	} else if (agt.indexOf(' ') != -1)
		return navigator.userAgent.substr(0,agt.indexOf(' '));
	else return navigator.userAgent;
}