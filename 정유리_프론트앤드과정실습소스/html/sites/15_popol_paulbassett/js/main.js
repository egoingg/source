$(document).ready(function(){
	$('.slider').slick({
		autoplay:true,		
		autoplaySpeed:2000, 
		arrows:true,		
		dots:true,			
		pauseOnHover:false, 
		pauseOnFocus:false, 
		speed:500
	});
    
    $('.gnb > li').mouseenter(function(){
        $('.gnbSub').show();
    }); 
    $('.gnb > li').mouseleave(function(){
        $('.gnbSub').hide();
    }); 
    
    $('.gnbSub').mouseenter(function(){
        $(this).show();
    }); 
    $('.gnbSub').mouseleave(function(){
        $(this).hide();
    }); 
    
    

    $('.menu li').click(function(){
        var idx = $(this).index();

        $('.menu li').find('a').removeClass('on');


        $('.menu li').eq(idx).find('a').addClass('on');

        if (idx == 0)                       //ALL
        {
            $('.inner p').fadeIn(500);
        }
        else if  (idx == 1)                 //ice
        {
            $('.inner p').fadeOut(0);
            $('.ice').fadeIn(500);
        }
        else if  (idx == 2)                 //product
        {
            $('.inner p').fadeOut(0);
            $('.product').fadeIn(500);
        } 
        else if  (idx == 3)                 //beverage
        {
            $('.inner p').fadeOut(0);
            $('.beverage').fadeIn(500);
        } 
        else if  (idx == 4)                 //food
        {
            $('.inner p').fadeOut(0);
            $('.food').fadeIn(500);
        } 

        else                                
        {
            $('.inner p').fadeOut(0);        //coffee
            $('.coffee').fadeIn(500);
        }  

        return false; // a태그의 기본 기능(위로 이동)을 무효화 시킨다/
    });
    
    $(window).scroll(function(){
        // console.log( "scrolltop은" + $(window).scrollTop());
        //console.log( "award top은" + $('.award').offset().top);
        
        if (  $(window).scrollTop() > $('.slider').offset().top ){
            $('.totop').show();
        }
        else {
            $('.totop').hide();
        }
        
        var awardH = $('.event').offset().top - $('.award').offset().top // .award 높이구하기
        //console.log(awardH);
        
        if (  $(window).scrollTop() > $('.award').offset().top ){
            //console.log( "scroll된 높이가 award top높이보다 더 내려왔을때임");
            $(".award span").fadeIn(600);
            $(".award p").slideDown(800);
            $(".desc").slideDown(900);
        }
        else if ( $(window).scrollTop() + awardH <= $('.award').offset().top){
            //console.log( "숨김");
            $(".award span").hide();
            $(".award p").hide();
            $(".desc").hide();
        }
  });
    

});