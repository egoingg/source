$(document).ready(function(){
    var wheight = $(window).height();  //화면의 세로 길이를 구해서 변수에 넣어준다.
    var wwidth = $(window).width();  //화면의 가로 길이를 구해서 변수에 넣어준다.
    console.log('화면의 가로, 세로 길이는?' + wwidth + ' / '+wheight);

    // $('#s1').css({'height':wheight, 'width': wwidth} ); // s1 영역을 첫 화면 가로, 세로 길이로 맞춘다
    //$('videoBg').css('height',wheight );// 동영상 높이를 부모 s1 길이로 맞춘다

    var videoH = $('#videoBg').height(); //동영상의 세로 길이
   
    //가로가 768보다 작을때 동영상의 세로 길이를 인식해서 s1의 세로 길이로 만들어 준다
    if (wwidth < 768){ //모바일 크기일때는 - 부모 s1 높이를 동영상의 세로 크기 기준으로 맞춤
        $('#s1').css('height',videoH);
    }
    else{
        $('#s1').css('height',wheight);
    }


   
    //스크된 된 거리를 화면에 표시

    //A.prepend(b) - A 요소의 내부 앞 부분에 추가
    //A.append(b) - A 요소의 내부 뒷 부분에 추가
    $('body').prepend('<h3>0</h3>'); 
    $('body > h3').css ({ 'position':'fixed','top':'100px','left':'45%',fontSize:'100px'});

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

        //화면이 스크롤이 되면 header가 나타나게
        if ( num > 50) {
            $('header').slideDown(500);
        }
        else {
            $('header').slideUp(200);
        }

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

    //wow js -화면이 보일때 animate 작동
    new WOW().init();

    
    $('.menu li').click(function(){
        var idx = $(this).index();

        $('.menu li').find('a').removeClass('on');


        $('.menu li').eq(idx).find('a').addClass('on');

        if  (idx == 0)                 //MV
        {
            $('.inner p').fadeOut(0);
            $('.mv').fadeIn(500);
        }
        else if  (idx == 1)                 //MAGAIN
        {
            $('.inner p').fadeOut(0);
            $('.magagin').fadeIn(500);
        } 

        return false; // a태그의 기본 기능(위로 이동)을 무효화 시킨다/
    });


});