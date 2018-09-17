//var http = "http://192.168.0.162:8011"
var http = "http://3dcangnan.com/gameCms" //服务器

//提示框
function tooltip(ele){
	ele.siblings('input').addClass('border');
	var times = 0;	
	var interval = setInterval(function(){
		ele.show();
		ele.tooltip('show');
		times += 1;
		if(times==1){
			clearInterval(interval);
//			$("[data-toggle='tooltip']").tooltip('hide');
			ele.hide();
			times = 0;
		}
	},100)
	//获得焦点时隐藏提示框和边框
	ele.siblings('input').focus(function(){
		ele.tooltip('hide');
		ele.siblings('input').removeClass('border')
	})
}

var $loginuser = $('.loginuser');
var $loginpwd = $('.loginpwd');
var $loginidcard = $('.loginidcard');
var regIDCard = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
var regphone = /^1[3|4|5|7|8][0-9]{9}$/;
var $loginphone = $('.loginphone');
var $loginuserId = $('.loginuserId');

//点击登录
$(".login").click(function(){
	if($loginuser.val()==""){
		$('.pro1').attr('data-original-title','用户名不能为空')
		tooltip($('.pro1'));
	}else if($loginpwd.val()==""){
		$('.pro2').attr('data-original-title','密码不能为空')
		tooltip($('.pro2'));
	}else{
		$.ajax({
			type:"post",
			url: http+"/appLogin/login",
			async:true,
			cache:false,
			contentType: "application/json;charset=utf-8",
			dataType: 'json',
			data: JSON.stringify({
				"account":$loginuser.val(),
				"pwd":$loginpwd.val()
			}),
			success: function(res){
				console.log(res)
				sessionStorage.setItem('agentToken',res.agentToken);
				if(res.code == 100){
					window.location.href = '../index.html';
				}else if(res.code == 101){
					alert(res.msg)
				}else if(res.code == 102){
					alert(res.msg)
				}else if(res.code == 103){
					alert(res.msg)
				}
								
			}			
		});
	}
	
})

//代理登录
$(".agentLogin").click(function(){
	if($loginuser.val()==""){
		$('.pro1').attr('data-original-title','用户名不能为空')
		tooltip($('.pro1'));
	}else if($loginpwd.val()==""){
		$('.pro2').attr('data-original-title','密码不能为空')
		tooltip($('.pro2'));
	}else if($loginidcard.val()==""||!regIDCard.test($loginidcard.val())){
		$('.pro3').attr('data-original-title','身份证号不能为空或输入正确证件号')
		tooltip($('.pro3'));
	}else if($loginphone.val()==""||!regphone.test($loginphone.val())){
		$('.pro4').attr('data-original-title','手机号不能为空或输入正确手机号')
		tooltip($('.pro4'));
	}else if($loginuserId.val()==""){
		$('.pro5').attr('data-original-title','游戏标识不能为空')
		tooltip($('.pro5'));
	}else{
		$.ajax({
			type:"post",
			url: http + "/appLogin/register",
			async:true,
			cache:false,
			contentType: "application/json;charset=utf-8",
			dataType: 'json',
			data: JSON.stringify({
				"realname":$loginuser.val(),
			    "idcard":$loginidcard.val(),
			    "phone":$loginphone.val(),
			    "userId":$loginuserId.val(),
			    "pwd":$loginpwd.val()
			}),
			success: function(res){
				console.log(res)
				if(res.code == 100){
					window.location.href = './login.html';
				}else if(res.code == 101){
					alert(res.msg)
				}else if(res.code == 102){
					alert(res.msg)
				}else if(res.code == 103){
					alert(res.msg)
				}else if(res.code == 104){
					alert(res.msg)
				}
								
			}			
		});
	}
})

























