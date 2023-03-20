$(document).ready(function(){
	//팝업을 감싸고 있는 오브젝트의 이름, 이 오브젝트의 넓이가 팝업의 넓이가 됨.
	var obj_wrap=$(".cts_course .course_popup");
	//움직일 오브젝트의 이름
	var obj_name = $(".cts_course .course_popup ul");
	//보여질 실제 팝업을 감싸고 있는 영역
	var obj_child = $(".cts_course .course_popup ul li");
	//현재 보여지는 팝업에 주어질 클래스명
	var obj_child_active = "active";

	//팝업 드래그 이동, 사용여부 (true, false)
	var mouse_draging = false;//컴퓨터 마우스 드래그 인식
	var touch_draging = true;//스마트폰 터치 인식

	//팝업 컨트롤버튼
	var ctrl_btn = true;//사용여부 (true, false)
	var ctrl_next = $(".next");
	var ctrl_prev = $(".prev");
	var ctrl_stop = $(".cts_course.course_popup .stop");
	var ctrl_play = $(".course_popup .play");

	//현재팝업 번호 / 전체 팝업번호
	var numbering = true;//사용여부 (true, false)
	var curr_num = $(".course_popup .curr_num");
	var total_num = $(".course_popup .total_num");

	//팝업 리스트
	var paging = true;//사용여부 (true, false)
	var paging_obj = $(".course_popup .paging button");
	var paging_curr_class = "active";//현재 선택된 팝업을 표시할 class명
	var paging_index;

	//자동플레이 여부(true, false)
	var auto_play = true;
	var auto_time = 5000;
	var auto_status;

	//이 아래 변수는 수정 금지
	var obj_position_reset;
	var refreshInvervalId;
	var obj_drag = false;
	var obj_index = 1;
	//팝업의 갯수 계산
	var obj_length = obj_child.length;
	if(obj_length <= 1){mouse_draging = false; touch_draging = false;}
	//팝업의 넓이 계산
	var obj_width = obj_child.width();
	var obj_default_width = obj_width;
	if(obj_wrap.width() < obj_width){
		obj_width = obj_wrap.width();
		obj_child.parent().children().width(obj_width);
	}
	var obj_left = (obj_wrap.width() - obj_width)/2;
	var startX = null;
	var prevX = null;
	var currX = null;
	var moveX = null;
	var afterX = null;
	var e = null;

	if(touch_draging == true){
		//모바일에서 터치를 인식
		obj_name.on("touchstart", function(a){
			obj_drag = true;
			e = a.originalEvent;
			currX = e.touches[0].pageX
			startX = e.touches[0].pageX;
			obj_name.on("touchmove", function(b){
				if(obj_drag ==  true){
					e = b.originalEvent;
					prevX = currX;
					currX = e.touches[0].pageX;
					moveX = prevX - currX;
					drag_move(moveX);
				}
			});
		});
		$(document).on("touchend", function(){
			if((obj_drag == true) && (Math.abs(startX) != (Math.abs(currX)))){
				drag_end();
			}
			obj_drag = false;
			obj_name.off("touchmove");
		});
	}
	if(mouse_draging == true){
		//마우스 그래그를 인식
		obj_name.on("mousedown", function(a){
			obj_drag = true;
			currX = a.pageX;
			startX = a.pageX;
			obj_name.on("mousemove", function(b){
				if(obj_drag ==  true){
					prevX = currX;
					currX = b.pageX;
					moveX = prevX - currX;
					drag_move(moveX);
				}
			});
		});
		$(document).on("mouseup", function(){
			if((obj_drag == true) && (Math.abs(startX) != (Math.abs(currX)))){
				drag_end();
			}
			obj_drag = false;
			obj_name.off("mousemove");
		});
	}

	//drag 혹은 touch 시 오브젝트를 움직이는 함수
	function drag_move(moveX){
		$(obj_name).offset({
			left : $(obj_name).offset().left - moveX
		});
		obj_index = parseInt(-($(obj_name).position().left - obj_left) / obj_width);
		index_change(obj_index);
	}

	///drag 혹은 touch가 종료되었을때 실행하는 함수
	function drag_end(){
		if(($(obj_name).position().left) > 0){
			afterX = 0;
		}else if(($(obj_name).position().left) < -((obj_length+1) * obj_width)){
			afterX = (obj_length) * obj_width;
		}else{
			if(moveX > 0){
				afterX = (obj_index+1) * obj_width;
			}else{
				afterX = (obj_index) * obj_width;
			}
		}
		$(obj_name).animate({
			left : -afterX + obj_left
		}, 500, function(){
			obj_index = parseInt(-($(obj_name).position().left - obj_left) / obj_width);
			if(obj_index <= 0){
				obj_index = obj_length;
				$(obj_name).css("left", -(obj_length*obj_width) + obj_left);
			}else if(obj_index > obj_length){
				obj_index = 1;
				$(obj_name).css("left", -obj_width + obj_left);
			}
			index_change(obj_index);
			time_reset();
		});
	}

	//animate로 오브젝트를 움직이는 함수
	function animate_move(go_index){
		if(go_index < 1){
			obj_index = obj_length;
			obj_position_reset = -(obj_width*obj_length);
		}else if(go_index > obj_length){
			obj_index = 1;
			obj_position_reset = -obj_width;
		}else{
			obj_position_reset = "";
			obj_index = go_index;
		}
		
		$(obj_name).animate({
			left : -((go_index) * obj_width) + obj_left
		}, 500, function(){
			if(obj_position_reset != ""){
				$(obj_name).css("left", obj_position_reset + obj_left);
			}
		});

		index_change(obj_index);
	}

	//auto play로 다음 팝업으로 이동하는 함수
	function auto_next(){
		obj_index++;
		animate_move(obj_index);
	}

	//index 변경 시 변경해야 할 것들 (paging, numbering)
	function index_change(index){
		if(numbering == true){
			curr_num.html(index);
		}
		if(paging == true){
			paging_obj.removeClass(paging_curr_class);
			paging_obj.eq(index-1).addClass(paging_curr_class);
		}
		obj_child.removeClass(obj_child_active);
		obj_child.eq(obj_index-1).addClass(obj_child_active);
	}

	function time_reset(){
		if(auto_status == "play"){
			clearInterval(refreshInvervalId);
			refreshInvervalId = setInterval(auto_next, auto_time);
		}
	}
	
	if(ctrl_btn == true){
		ctrl_prev.on("click", function(){
			obj_index--;
			animate_move(obj_index);
			time_reset();
		});
		ctrl_next.on("click", function(){
			auto_next();
			time_reset();
		});
		ctrl_stop.on("click", function(){
			auto_status = "stop";
			clearInterval(refreshInvervalId);
		});
		ctrl_play.on("click", function(){
			auto_status = "play";
			refreshInvervalId = setInterval(auto_next, auto_time);
		});
	}

	//자동실행을 설정하였을 경우
	if(auto_play == true){
		//팝업의 수가 1개이하면 실행하지 않음
		if(obj_length > 1){
			obj_child.eq(0).clone().appendTo(obj_name);
			obj_child.eq(obj_length-1).clone().prependTo(obj_name);
			refreshInvervalId = setInterval(auto_next, auto_time);
			obj_name.css("left", -obj_width + obj_left);
		}else{
			obj_name.css("left", obj_left);
		}
		obj_child.eq(obj_index-1).addClass(obj_child_active);
		obj_name.width((obj_length+4)*obj_width);
		auto_status = "play";
	}

	//페이지번호를 사용할 경우
	if(numbering == true){
		curr_num.html(obj_index);
		total_num.html(obj_length);
	}

	//paging을 사용할 경우
	if(paging == true){
		paging_obj.removeClass(paging_curr_class);
		paging_obj.eq(obj_index-1).addClass(paging_curr_class);
		paging_obj.on("click", function(){
			//클릭한 paging의 번호 (1번째 paging은 값이 0)
			paging_index = $(this).index();
			//console.log(paging_index);
			//해당 번호 팝업으로 이동..
			animate_move(paging_index+1);
			time_reset();
		});
	}

	//윈도우가 리사이즈되면 팝업 사이즈 다시 계산
	$(window).resize(function(){
		if(obj_wrap.width() < obj_default_width){
			obj_width = obj_wrap.width();
			obj_child.parent().children().width(obj_width);
		}else{
			obj_width = obj_default_width;
			obj_child.parent().children().width(obj_width);
		}
		obj_left = (obj_wrap.width() - obj_width)/2;
		obj_name.css("left", -(obj_width * obj_index) + obj_left);
		obj_wrap.height(obj_child.height());
		obj_name.width((obj_length+4)*obj_width);
	});
	$(window).load(function(){
		obj_wrap.height(obj_child.height());
	});
});
