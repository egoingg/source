$(document).ready(function(){
    //slide
	$('.slider').slick({
		autoplay:true,		
		autoplaySpeed:2000, 
		arrows:true,		
		dots:true,			
		pauseOnHover:false, 
		pauseOnFocus:false, 
		speed:200
	});
    
    //스크된 된 거리를 화면에 표시

    //A.prepend(b) - A 요소의 내부 앞 부분에 추가
    //A.append(b) - A 요소의 내부 뒷 부분에 추가
//    $('body').prepend('<h3>0</h3>'); 
//    $('body > h3').css ({ 'position':'fixed','top':'100px','left':'45%',fontSize:'100px'});

    //각 section의 (top으로부터)거리를 알아온다
    var s_pos = []; //배열 변수

    for( var i = 1; i < 7; i++){
        //위에서부터 거리를 구한다.
        s_pos.push( $('#s' + i).offset().top); //push - 배열에 값 add
    }
    console.log(s_pos);


    $(window).scroll(function(){
        var num = $(window).scrollTop(); //위에서 얼마 스크롤 되었나 확인
        $('body > h3').text(num); //스크롤시 h3에 거리표시

        //스크롤시 버튼 색상 변화
        if ( num < s_pos[1]){
            $('.nav li, #btn_box li').removeClass('on');
            $('.nav li').eq(0).addClass('on');
            $('#btn_box li').eq(0).addClass('on');

            console.log( '첫섹션영격');
        }else if(num >= s_pos[1] && num < s_pos[2]){
            $('.nav li, #btn_box li').removeClass('on');
            $('.nav li').eq(1).addClass('on');
            $('#btn_box li').eq(1).addClass('on');

        }else if(num >= s_pos[2] && num  < s_pos[3]){
            $('.nav li, #btn_box li').removeClass('on');
            $('.nav li').eq(2).addClass('on');
            $('#btn_box li').eq(2).addClass('on');  
        }else if(num >= s_pos[3] && num  < s_pos[4]){
            $('.nav li, #btn_box li').removeClass('on');
            $('.nav li').eq(3).addClass('on');
            $('#btn_box li').eq(3).addClass('on'); 
        }else if (num >= s_pos[4] && num  < s_pos[5]){
            $('.nav li, #btn_box li').removeClass('on');
            $('.nav li').eq(4).addClass('on');
            $('#btn_box li').eq(4).addClass('on');
        } 
        else {
            $('.nav li, #btn_box li').removeClass('on');
            $('.nav li').eq(5).addClass('on');
            $('#btn_box li').eq(5).addClass('on');
        }                 
    });

    //제일 아래 페이지 위로 가기 버튼(top)
    $('.top').on('click', function(){
        $('html, body').animate({scrollTop:0},1000,'easeInOutExpo');
    });



    //메뉴를 누르면 부드럽게  이동
    $('.nav li a, #btn_box a').on('click', function(e){
        e.preventDefault(); //기본 이벤트 링크 이동을 막아줌
        var ttt = this.hash; //클릭한 #(해쉬) 값을 변수에 녛는다
        console.log(ttt);

        $('html, body').animate({scrollTop:$(ttt).offset().top},1000, 'easeInOutExpo');
    });

});