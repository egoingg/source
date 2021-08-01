$(document).ready(function(){
	var aa = 1; //메뉴가 닫혀 있는 상태 - 전역변수로 선언

	$('.menu').click(function(){
	if ( aa == 1 )
	{
		$('.menu').addClass('open'); //A.addClass('b') - A에 클라스 b 추가
		$('nav').animate({'right':'0'},500);
		$('#dim').fadeIn();

		aa= 5;
	}else{
		$('.menu').removeClass('open'); //A.removeClass('b') - A에 클라스 b 제거
		$('nav').animate({'right':'-60%'},500);
		$('#dim').fadeOut();

		aa= 1;
	
	}




	});
});