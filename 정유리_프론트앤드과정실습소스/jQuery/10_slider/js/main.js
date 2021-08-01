$(document).ready(function(){
	var sl = $('#slider ul'); //슬라이더 ul을 변수로
	//메인 슬라이더
	var imgNumber = $('#slider li').length;  //#slider 언의 li 갯수를 찾아시 변수 넣어줌
	//console.log(imgNumber); 이미지 개수 확인

	
	sl.css({'width':imgNumber*1080}); //위에서 구한 변수(li숫자)에 이미지의 가로 크그를 곱해서 ul의 가로 크기를 지정, 이미지 한개 넓이 1080

	//sl.animate({'margin-left':'-1080px'},1000); 샐행구
	//setInterval(실행구, 시간 간격, swing, 콜백함수) = 일정 시간마다 자동으로 살행
	//A.InsertAfter(b) = A를 b뒤에 녛는다
	//A.InsertBefore(b) = A를 b앞에 녛는다

	
	//슬라이더방향 - 왼쪽으로
	/* setInterval(function(){sl.animate({'margin-left':'-1080px'},1000,'swing',function(){
		sl.find('li:first-child').insertAfter(sl.find('li:last-child'));
		sl.css({'margin-left':'0'}); //원래 위치에 갖다놈
		});
	}, 2000); */

	//슬라이더방향 - 오른쪽으로
	setInterval(function(){
		sl.find('li:last-child').insertBefore(sl.find('li:first-child'));//제일뒤에 깃을 얖에 깆다놈
		sl.css({'margin-left':'-1080px'});
		sl.animate({'margin-left':'0px'},1000,'swing');
	},2000);


});