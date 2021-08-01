$(document).ready(function(){
	//$('.inner').css({'font-size':'5px','opacity':'0'});

	//$('A').animate({'속성':'속성값'}, 시간,속도변화(ease));
	$('.inner').animate({fontSize:'5px',opacity:0},2000,'swing');

	$('h1').on('mouseover',function(){
		$('header').animate({'height':0,opacity:0}, 500, 'swing');
	});
});