/*

header .bottom_menu .wrap nav 에 마우스가 오버되면
header .bottom_menu .wrap nav ul>li>ul 에 on클래스가 붙고

header .bottom_menu .wrap nav ul>li>ul 에서 마우스가 빠져나가면
header .bottom_menu .wrap nav ul>li>ul 에 on클래스가 지워짐

*/
$(function(){
  $('nav').mouseover(function(){
      $('header .bottom_menu .wrap nav ul>li>ul').addClass('on');
      $('.navsub_bg').css({'display':'block'});
  });

  $('nav, header .bottom_menu .wrap nav ul>li>ul').mouseout(function(){
    $('header .bottom_menu .wrap nav ul>li>ul').removeClass('on');
    $('.navsub_bg').css({'display':'none'});
  });
});
