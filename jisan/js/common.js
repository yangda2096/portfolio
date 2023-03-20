$(document).ready(function(){
	
	/*
		gnb_open을 누르면
		
		header .gnb_wrap가 <-이쪽 방향으로 나타나고
		
		
		gnb_close을 누르면
		header .gnb_wrap가 -> 방향으로 사라진다
		
		.gnb_wrap 의 높이를 화면의 변화에 따라 계산해서 준다.
	*/
	
	$(".gnb_open").on("click", function(){ 
		
		$("header .gnb_wrap").addClass("on"); 
		$("header .gnb_container").addClass("on");
		$("header .gnb_kbg").addClass("on");
		
		$("body").css({overflow : "hidden"}).bind('scroll touchmove mousewheel', function(e){e.preventDefault();e.stopPropagation();return false;});

	});
	
	$(".gnb_close").on("click", function(){ 
		
		$("header .gnb_wrap").removeClass("on");
		$("header .gnb_container").removeClass("on");
		$("header .gnb_kbg").removeClass("on");	
		
		$("body").css({overflow : "auto"}).unbind('scroll touchmove mousewheel');

	});
	
	//.gnb_wrap 의 높이를 화면의 사이즈변화에 따라 계산해서 준다.
	
	var page_name = $(".gnb_wrap");
	
	var window_h = $(window).height();
		console.log(window_h);

	$(page_name).height(window_h)
	
	$(window).resize(function(){ 
		window_h = $(window).height();
		console.log(window_h);
		$(page_name).height(window_h)
	});
});