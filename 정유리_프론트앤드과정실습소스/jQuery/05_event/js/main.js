$(document).ready(function(){
	$('.inner').on('mouseenter',function(){
		$(this).css({'color':'tomato','transform':'rotate(15deg)','cursor':'pointer'});
	})

	.on('mouseleave',function(){
		$(this).css({'color':'','transform':''});
	});

	//메서드 체인 -선택자가 같은 경우 뒷부분 선택자와 세미콜론(;) 삭제

	$('.over').on("mouseover",function(){
		$('.over p').css("background-color","orange");
	})
		.on("mouseout",function(){
		$('.over p').css("border","2px solid red");
	});

	$('.enter').on("mouseenter",function(){
		$('.enter p').css("background-color","orange");
	})
		.on("mouseleave",function(){
		$('.enter p').css("border","2px solid red");
	});

	// mouse over, enter는 영역 안으로 들어가면 발생

	//mouseover - 지정영욕 언에 있는 자식 영욕언 독팁덕은 부분으로 처리
	//mouseenter - 지정영욕 언에 있는 자식 영역도 내 영욕의 일부로 인식

});