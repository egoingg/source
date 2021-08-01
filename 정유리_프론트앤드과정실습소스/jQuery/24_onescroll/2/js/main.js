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


//     <div id="btn_box">
//     <ul>
//        <li class="on"><a href="#" class="btnBox1">1</a></li>            
//        <li><a href="#" class="btnBox2">2</a></li>
//        <li><a href="#" class="btnBox3">3</a></li>
//        <li><a href="#" class="btnBox4">4</a></li>
//        <li><a href="#" class="btnBox5">5</a></li>
//        <li><a href="#" class="btnBox6">6</a></li>   
//     </ul>
//  </div>


    //메뉴를 누르면 각 섹션으로 이동
    $('.nav li, #btn_box li').click(function(){
        var btn_n = $(this).index(); //몇번째 li를 눌렀는지 알아옴
        console.log(btn_n);

        $('.nav li, #btn_box li').removeClass('on');
        
        $('.nav li').eq(btn_n).addClass('on');
        $('#btn_box li').eq(btn_n).addClass('on');

        $('html, body').animate({scrollTop:750*btn_n},1000);


    });
});