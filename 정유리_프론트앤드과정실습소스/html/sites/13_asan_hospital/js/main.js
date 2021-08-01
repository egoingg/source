       $(function(){
           //A.offset() - 화면상에서 A의 위치 알아내기 (2 개의 속성을 가진 객체 / top 및 left)          
           //A.offset().top - A의 y축 위치 알아내기
           var conWrapY =$('#con_wrap').offset().top; //#con_wrap는 위에서 부터 conWrapY만큼 떨어져 있음 
           console.log(conWrapY);
           var footerY =$('footer').offset().top;
           console.log(footerY);   //footer는 위에서 부터 footerY만큼 떨어져 있음 
           
           var conWrapH = footerY - conWrapY; // #con_wrap의 높이 추출
           
           $('#con_wrap').css({'height':conWrapH});// 추출한 #con_wrap의 높이 set
           
           //화면을 늘리거나 줄일때면  #con_wrap 높이 다시 계산
           $(window).resize(function(){
              var conWrapY =$('#con_wrap').offset().top; 
              var footerY =$('footer').offset().top;
              var conWrapH = footerY - conWrapY; // #con_wrap의 높이
              $('#con_wrap').css({'height':conWrapH});// #con_wrap의 높이 set
               
               console.log('ddddd');
           });
           
           
           //맨위 우측 seach 버튼 누르면 모달 팝업창 뜨게
           $('.search').click(function(){
                $('#search').show();
           });
           //모달 팝업창 X 버튼 누르면 팝업창 닫기      
           $('.searchCancle').click(function(){
                 $('#search').hide();
           });
           
           // 상단 좌측 오픈버튼 누르면 사이트 메뉴 나오고 들어가게
		   var duration =300; 
		   var close = true; //메뉴 닫힌 상태
			
           $('.lnb_btn').click(function(){

			   if (close) // 메뉴 닫힌 상태면
			   { 
				   $('#lnb').animate({ left:0}, duration); //side 열리게
					$('#wrap').animate({left:'274px'}, duration);
					$('footer').css({'position':'relative'}); // fix에서 relative로 변경
					$('body').css({'overflow':'hidden'}); // 넘쳐서 스크롤 생기는거를 막기위해서 overflow hidden헌다
					$(this).find('img').attr({'src':'img/bg_header_lnb_active.png'});
					$('.cover').fadeIn(duration); //검은창 열리게
                   
					close = false;
			   }
			   else // 메뉴 열린 상태면
			   {
				   $('#lnb').animate({ left:'-274px'}, duration);//side 닫히게
					$('#wrap').animate({left:0}, duration);
					$('footer').css({'position':'fixed'}); // fix에서 relative로 변경
					$('body').css({'overflow':'auto'});
					$(this).find('img').attr({'src':'img/bg_header_lnb.png'});
                    $('.cover').fadeOut(duration); //검은창 닫히게

					close = true;
			   }
           });



           
       });