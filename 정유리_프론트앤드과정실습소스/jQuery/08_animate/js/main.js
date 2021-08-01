$(document).ready(function(){
	//$('A').animate({'속성':'속성값'},적용시간,속도변화(ease),콜백함수);
	//속도변화 - linear(일정한 속도), swing(속도 변화)
	$('.b1').mouseenter(function(){
		$(this).delay(3000).animate({'margin-left':'1000px'},2000,'swing',function(){
			//alert("완료 콜백함수실행");
			$(this).animate({'margin-left':''},300);
		});
	});

	$('.b2').click(function(){
		$(this).animate({'margin-left':'+=50px'},300); // +=50px => a=a+50;
	});


	$('.b3').mouseenter(function(){
		$(this).stop().animate({'margin-left':'1000px'},2000,'swing');
		});

});