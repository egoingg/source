$(document).ready(function(){

	$('.btn1').on('click',function(){
		$('.b1').show(500); //$('대상').show(시간) 1초 =1000
	});

	$('.btn2').on('click',function(){
		$('.b1').hide(500);
	});


	$('.btn3').on('click',function(){
		$('.b2').toggle();//$('대상').toggle(시간) 보였다 안 보였다를 반복
	});

	$('.btn4').on('click',function(){
		$('.b3').width('400px');//단위는 따옴표 사용
		$('.b3').height(400);//따옴표 없이 숫자만 쓰면 px 단위로 인식
	});

	$('.btn5').on('click',function(){
		$('.b3').width(''); //숫자 넣는 곳에 비워 놓으면 원래 크기로 돌아온다
		$('.b3').height('');
	});

	//$('A').on('click',함수); = $('A').click(함수)
	var n = 1000;
	$('.btn6').click(function(){
		$('.b4').fadeIn(n);		//$('대상').fadeIn(시간) 서서히 나타난다
	});

	$('.btn7').click(function(){
		$('.b4').fadeOut(n);	//$('대상').fadeOut(시간) 서서히 사라진다
	});

	$('.btn8').click(function(){
		$('.b5').fadeToggle();	//$('대상').fadeToggle(시간) 서서히 사라지고 나타나고를 반복
	});

	$('.btn9').click(function(){
		$('.b6').slideUp(n);	//$('대상').slideUp(시간) 위로 사라짐
	});

	$('.btn10').click(function(){
		$('.b6').slideDown(n);	//$('대상').slideDown(시간) 아래로 나타남
	});
}); 