$(function(){
    let $aside = $('.gnb_mobile'),
        $openButton = $('.all_menu'),
        $closeButton = $('.close_menu'),
        $buration = 300;
    //버튼 클릭시 aside가 나오도록

    $openButton.click(function(){
        $aside.stop().animate({left : '0px'}, $buration);
    });
    $closeButton.click(function(){
        $aside.stop().animate({left : '-100%'}, $buration);
    });

});