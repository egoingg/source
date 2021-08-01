$(function(){
//sort
    $('.menu li').click(function(){
        var idx = $(this).index();
        
        $('.menu li').find('a').removeClass('on'); //모든 a의 클래스 on 제거 / 초기화
        
        //$(this).find('a').addClass('on'); // on 클래스 추가 하여 버튼 색깔 적용
        $('.menu li').eq(idx).find('a').addClass('on');// on 클래스 추가 하여 버튼 색깔 적용/ 위 코드와 결과는 동일
        
        if (idx == 0)                       //ALL
        {
            $('.inner p').fadeIn(500);
        }
        else if  (idx == 1)                 //male
        {
            $('.inner p').fadeOut(0);
            $('.male').fadeIn(500);
        }
        else if  (idx == 2)                 //female
        {
            $('.inner p').fadeOut(0);
            $('.female').fadeIn(500);
        } 
        else                                //group
        {
            $('.inner p').fadeOut(0);
            $('.group').fadeIn(500);
        }  
                
        return false; // a태그의 기본 기능(위로 이동)을 무효화 시킨다/
    });
    
    var duration = 300; 
    
//첫번째 행 캡션(사진 삽화등에 붙인 설명)이 투명하게 나타남    
    $first = $('.first'); //jquery 객체(선택자)를 $first변수안에 넣는다
    
    $first.on('mouseover', function(){
        $(this).find('strong, span').stop().animate({'opacity':1}, duration);
    }).on('mouseout', function(){
        $(this).find('strong, span').stop().animate({'opacity':0}, duration);   
    });    
    
//두 번째 행 캡션(사진 삽화등에 붙인 설명)이 왼쪽에서 슬라이딩되고 & 투명하게 나타남  
    $second = $('.second'); 
    
    $second.on('mouseover',function(){
        $(this).find('strong').stop().delay(200).animate({'left':0}, duration,'easeOutBounce');
         $(this).find('span').stop().animate({'opacity':1}, duration);
        
    }).on('mouseout',function(){
        $(this).find('strong').stop().animate({'left':'-300px'}, duration,'easeInExpo');
        $(this).find('span').stop().delay(200).animate({'opacity':0}, duration);
    });    

//세 번째 행 캡션(사진 삽화등에 붙인 설명)이  밑에서 위로 올라오고 이미지도 위로 올라와서 나타남 
    $third = $('.third');
    
    $third.on('mouseover', function(){
        $(this).find('strong').stop().animate({'bottom':0}, duration,'easeOutExpo');
        $(this).find('span').stop().animate({'opacity':1}, duration);
        $(this).find('img').stop().animate({'top':'-30px'}, duration);        
        
    }).on('mouseout', function(){
        $(this).find('strong').stop().animate({'bottom':'-80px'}, duration,'easeInExpo');
        $(this).find('span').stop().animate({'opacity':0}, duration);
        $(this).find('img').stop().animate({'top':0}, duration);  
    });    
    
//네 번째 행 캡션(사진 삽화등에 붙인 설명)이  왼쪽옆에서 오른쪽으로 나타남 
    $forth = $('.forth');
    
    $forth.on('mouseover', function(){
        $(this).find('strong').stop().animate({'left':0}, duration,'easeOutExpo');
        $(this).find('span').stop().animate({'opacity':1}, duration);
     
    }).on('mouseout', function(){
        $(this).find('strong').stop().animate({'left':'-60%'}, duration,'easeInExpo');
        $(this).find('span').stop().animate({'opacity':0}, duration);
    });      
    
// 모달 popup( 갤러리 누르면 모달창에 갤러리 이미지의 큰 이미지가 보이게)

    $('.inner p').click(function(){
        var idx = 0;
        var num =0;
        
        idx = $(this).index(); //몇번째 p를 눌럿나 index 알아냄 
        num = idx+1;

        
        $('.popup').find('img').attr({'src': 'img/' + num + '-b.jpg'});
        
        $('.popup').fadeIn(1000); // popup이 나타남        
    });
    
    $('.popup').click(function(){
        $(this).fadeOut(300); // popup이 사라짐
    });    
    
    
    


    
    
});