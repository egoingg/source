$(document).ready(function(){
    var headerTop = $('header').offset().top; //헤더가 위에서 얼마떨어져 있나 알아옴
    console.log('헤더는 화면 위쪽부터' + headerTop + 'px떨어져 있다');  
    
    
     var header_h = $('header').height();
    console.log('헤더 높이는?'  + header_h ); 
    
    var headerAll = headerTop + header_h;
    
    $(window).scroll(function(){//화면을 얼마 scholl 했는지 알라낸다 /마우스 이벤트 스크롤 이벤트
         //console.log('scroll이 화면 위쪽부터'  + 'px떨어져 있다'); 
        
        var scroll = $(window).scrollTop(); //A.scrollTop() 스크롤 돤 거리 (위쪽에서 얼마 스크롤 되었나)
        //console.log('scroll된 거리는?'  + scroll + 'px'); 
        
       
      
        
        // 스크롤된 거리가 헤더가 top에서 떨러져 있는 거리보나 커졋을때 addclass 작동
        if (scroll > headerAll) {
            $('#scroll_header').slideDown(200);
        }
        else {
            $('#scroll_header').slideUp(200);
        }
    }); 
    
});