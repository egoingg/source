$(function(){
    var duration = 300; 
    
	//첫번째 행 캡션(사진 삽화등에 붙인 설명)이 투명하게 나타남    
    $first = $('.first > p'); //jquery 객체(선택자)를 $first변수안에 넣는다
    
    $first.on('mouseover', function(){
        $(this).find('strong, span').stop().animate({'opacity':1}, duration);
    }).on('mouseout', function(){
        $(this).find('strong, span').stop().animate({'opacity':0}, duration);   
    });    
    
	//두 번째 행 캡션(사진 삽화등에 붙인 설명)이 왼쪽에서 슬라이딩되고 & 투명하게 나타남  
    $second = $('.second > p'); 
    
    $second.on('mouseover',function(){
        $(this).find('strong').stop().delay(200).animate({'left':0}, duration,'easeOutBounce');
         $(this).find('span').stop().animate({'opacity':1}, duration);
        
    }).on('mouseout',function(){
        $(this).find('strong').stop().animate({'left':'-300px'}, duration,'easeInExpo');
        $(this).find('span').stop().delay(200).animate({'opacity':0}, duration);
    });    

    //세 번째 행 캡션(사진 삽화등에 붙인 설명)이  밑에서 위로 올라오고 이미지도 위로 올라와서 나타남 
    $third = $('.third > p');
    
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
    $forth = $('.forth > p');
    
    $forth.on('mouseover', function(){
        $(this).find('strong').stop().animate({'left':0}, duration,'easeOutExpo');
        $(this).find('span').stop().animate({'opacity':1}, duration);
     
    }).on('mouseout', function(){
        $(this).find('strong').stop().animate({'left':'-60%'}, duration,'easeInExpo');
        $(this).find('span').stop().animate({'opacity':0}, duration);
    });      
    
});