$(document).ready(function(){
  $('.slider').slick({
	autoplay:true,		// 자동 플레이
	autoplaySpeed:3000, // 이미지 전환 끝난후 시작때까지 속도(이미지 유지시간) 1초
	arrows:true,		// 좌우 이동 버튼
	dots:true,			// 하단 페이지이동 버튼
	//fade:true,		// 투명도로 전환
	pauseOnHover:false, // 마우스를 올려놓으면 멈춤(true가 기본)
	pauseOnFocus:false, // 선택한 상태에선 멈춤(true가 기본)
	speed:50,			// 이미지 전환할때 속도
	//vertical:true		// 이미지 이동 방향 세로
  });
});