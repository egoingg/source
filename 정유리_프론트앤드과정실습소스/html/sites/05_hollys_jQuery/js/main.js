$(document).ready(function(){
	$('.gnb>li').mouseenter(function(){
		$('.gnbSub').slideDown(300);
	});
	$('.gnbSub').mouseleave(function(){
		$(this).slideUp(300);
	});
});