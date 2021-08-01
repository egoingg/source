$(document).ready(function(){
	//$(A).attr({'':''})  - html 속성을 제어한다
	$('.btn1').click(function(){
		$('.inner>img').attr({'src':'img/1.png','alt':'말티'});
	});
	$('.btn2').click(function(){
		$('.inner>img').attr({'src':'img/2.png','alt':'허스키'});
	});

	//팝업창이 안보이는 상태로 페이지 로딩
	$('#popup').hide();

	//모달 팝업창 열기

	$('.btn3').click(function(){
		$('#popup').show();
	});


	//모달 팝업창 닫기
	$('#popup > button').click(function(){
		$('#popup').hide();
		//$('#popup').fadeOut(2000);
	});
	
});