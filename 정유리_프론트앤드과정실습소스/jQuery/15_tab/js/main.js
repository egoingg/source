$(function(){
	/*
	gt ======> greater than
	lt ======> less than
	eq ======> equal
	A:gt(b) - A중에서 b 번째 보다 큰  순서의 A들 (0부터 시작)
	A:lt(b) - A중에서 b 번째 보다 작은 순서의 A들 (0부터 시작)
	A.index() - A중에서 몇번째 순서인지 알아낸다 (0부터 시작)
	A.eq(b) - b번째 A (0부터 시작)
	*/
	 
	$('.content div:gt(0)').hide(); //첫번째 div만 보이게
	$('.tab li:first-child').addClass('select');//첫번째 li에 클라스 적용 - 흰색깔 처음에 보이게

	$('.tab li').click(function(){
		var nn = $(this).index(); //몇번째 li를 눌렀는지 알아내서 변수에 넣어준다
		console.log(nn);

		$('.tab li').removeClass('select'); //모든 클라스 제거

		$(this).addClass('select'); //click한 li에 클라스 추가 - 흰색깔로 보이게

		$('.content div').hide(); //모든 div를 안보이게
		$('.content div').eq(nn).show(); //nn번때 div가 보이게


	});

	$('header button').click(function(){
		$('header span').toggleClass('on'); //A.toggleClass('클래스명') - 클라스 적용, 제거(add&remove)가 번갈아 가면서 실행됨
	});
});