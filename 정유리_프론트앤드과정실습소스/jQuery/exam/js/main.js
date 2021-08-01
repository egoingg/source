$(document).ready(function(){
	//slide
	$('.slider').slick({
		autoplay:true,		
		autoplaySpeed:2000, 
		arrows:true,		
		dots:true,			
		pauseOnHover:false, 
		pauseOnFocus:false, 
		speed:200
	});
	//popup
	$('#popup').show();

	$('#popup > button').click(function(){
		$('#popup').fadeOut();
	});


	$('.gnb>li').mouseenter(function(){
		$('.gnbSub').slideDown(300);
		$(this).css({ 'background':'gray'});
	});

	$('.gnb>li').mouseleave(function(){
		$(this).css({ 'background':''});
	});

	$('.gnbSub').mouseleave(function(){
		$(this).slideUp(300);
	});

	$('.gnbSub ul li a').mouseenter(function(){
		$(this).css({'color':'red'});

	});

	$('.gnbSub ul li a').mouseleave(function(){
		$(this).css({'color':'black'});
	});
});