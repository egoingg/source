$(document).ready(function(){
	$('.gnb_depth1>li').mouseenter(function(){
		$(this).find('div').stop().delay(300).slideDown(300);
		$(this).addClass('on');
		$('.gnb_depth_bg').stop().slideDown(300);
	});

	$('.gnb_depth1>li').mouseleave(function(){
		$(this).find('div').stop().slideUp(150);
		$(this).removeClass('on');
		$('.gnb_depth_bg').stop().slideUp(150);
	});
});