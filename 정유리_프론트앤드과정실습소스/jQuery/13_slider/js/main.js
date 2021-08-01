$(document).ready(function(){
	$('.imgs').slick({
		autoplay:true,		// 자동 플레이
		dots:true,			// 하단 페이지이동 버튼	
		autoplaySpeed:500, // 이미지 전환 끝난후 시작때까지 속도(이미지 유지시간) 0.5초
	});

	//play/stop 버튼
	var btn = 1; //변수 btn언에 1을 녛어준다 (play 중이고 현재 stop img 보이는 중)

	$('.btn').click(function(){
		if (btn == 1) //현재 (play 중이고 / 현재 stop img 보이는 중)
		{
			$(this).addClass('on');//이미지 변경 - play img로
			btn = 0;
			$('.imgs').slick('slickPause'); //slick 슬라이더가 잠시 멈춘다
		}
		else{ //현재 stop 중이고 / 현재 play img 보이는 중)
			$(this).removeClass('on');//이미지 변경 - stop img로
			btn = 1;
			$('.imgs').slick('slickPlay'); //slick 슬라이더가 play
		}	
	});

	$('#topBanner .close').click(function(){
		$('#topBanner').slideUp();
	});
});