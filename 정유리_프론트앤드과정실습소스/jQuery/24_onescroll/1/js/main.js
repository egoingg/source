$(document).ready(function(){
    //스크된 된 거리를 화면에 표시

    //A.prepend(b) - A 요소의 내부 앞 부분에 추가
    //A.append(b) - A 요소의 내부 뒷 부분에 추가
    $('body').prepend('<h3>0</h3>'); 
    $('body > h3').css ({ 'position':'fixed','top':'100px','left':'45%',fontSize:'100px'});

    $(window).scroll(function(){
        var num = $(window).scrollTop(); //위에서 얼마 스크롤 되었나 확인
        $('body > h3').text(num);
    });

    //제일 아래 페이지 위로 가기 버튼(top)
    $('.top').on('click', function(){
        $('html, body').animate({scrollTop:0},1000);
    });

    //메뉴를 누트면 각 섹션으로 잊동
    var section_h = 700;

    // $('.btn1').click(function(){
    //     $('html, body').animate({scrollTop:0},1000);
    // });
    // $('.btn2').click(function(){
    //     $('html, body').animate({scrollTop:700},1000);
    // });
    // $('.btn3').click(function(){
    //     $('html, body').animate({scrollTop:1400},1000);
    // });
    // $('.btn4').click(function(){
    //     $('html, body').animate({scrollTop:2100},1000);
    // });
    // $('.btn5').click(function(){
    //     $('html, body').animate({scrollTop:2800},1000);
    // });
    // $('.btn6').click(function(){
    //     $('html, body').animate({scrollTop:3500},1000);
    // });   
    
    $('.btn1').click(function(){
        $('html, body').animate({scrollTop:section_h * 0},1000);
    });
    $('.btn2').click(function(){
        $('html, body').animate({scrollTop:section_h* 1},1000);
    });
    $('.btn3').click(function(){
        $('html, body').animate({scrollTop:section_h* 2},1000);
    });
    $('.btn4').click(function(){
        $('html, body').animate({scrollTop:section_h* 3},1000);
    });
    $('.btn5').click(function(){
        $('html, body').animate({scrollTop:section_h* 4},1000);
    });
    $('.btn6').click(function(){
        $('html, body').animate({scrollTop:section_h* 5},1000);
    }); 
});