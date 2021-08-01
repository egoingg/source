$(document).ready(function(){

    //메인 메뉴를 누르면 서브가 내려온다.(공통)
    var mainBtn = $('.menu > li > a');    //메인메뉴를 변수로
    
    mainBtn.click(function(){ 
        $('.subWrap').slideUp();          //무조건 모든 서브메뉴가 올라가게

        if( $(this).hasClass('active')==false){ //클릭한 메뉴를 또 클릭한 경우가 아님            
            $(this).siblings('.subWrap').slideDown(); 
            $(this).addClass('active');    //클라스추가(서브펼쳐짐)
            mainBtn.parent('li').removeClass('on'); 
            $(this).parent('li').addClass('on');   //메뉴옆화살표 모양바뀜
        }
        else { //클릭한 메뉴(서브메뉴 펼치진 상태)를 또 클릭
            $(this).removeClass('active');
            $(this).parent('li').removeClass('on'); 
        }
    });

    //모바일-서브메뉴를 누르면 서브의 서브가 나온다
    $('.subhas > a').click(function(){
        if($(this).hasClass('active2')==false){  //서브서브가 펼쳐지지 않았을때
            $(this).siblings('ul').slideDown(200);
            $(this).addClass('active2');
            $(this).parent('li').addClass('on');
        }
        else {
             $(this).siblings('ul').slideUp(200);
             $(this).removeClass('active2');
             $(this).parent('li').removeClass('on');
        }
    });



    //모바일 - 햄버거버튼을 누르면 왼쪽에 숨어있던 gnb가 튀어나온다
    $('.btn_all').click(function(){
        $('.gnb').animate({left:0},500);
        $('.gnb_dim').fadeIn(500); 
    });
    $('.btn_gnbClose').click(function(){
        $('.gnb').animate({left:'-350px'},500);
        $('.gnb_dim').fadeOut(500); 
    });

});