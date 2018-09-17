
//var http = "http://192.168.0.162:8011";
var http = "http://3dcangnan.com/gameCms" //服务器
var $dcjp = $('.dcjq-parent');
var $pullRight = $('.pull-right');
//侧边栏
$dcjp.click(function(){
//	$(this).parent().children('.sub').slideToggle();
	$(this).addClass('subBg');
	$(this).parent().siblings().children('.dcjq-parent').removeClass('subBg');
	$('#sidebar').toggleClass('sidebar-open');//侧边栏隐藏
	$('.content').toggleClass('content-margin');
//	$(this).parent().siblings().children('.sub').slideUp()
//	$(this).children('.pull-right-container').children().toggleClass('active0');
//	$(this).parent().siblings().children('.dcjq-parent').children('.pull-right-container').children().removeClass('active0');
})
//点击隐藏和出现
var $sideToggle = $('.sidebar-toggle');
$sideToggle.click(function(){
	$('#sidebar').toggleClass('sidebar-open');
	$('.content').toggleClass('content-margin');
	$('.navbar-collapse').removeClass('in')
})
$('.navbar-toggle').click(function(){
	$('#sidebar').removeClass('sidebar-open');
	$('.content').removeClass('content-margin');
})
//点击房卡购买
//getHtml($('.buyCard'),'html/buy.html');

//点击玩家充卡
getHtml($('.gamerCharge'),'html/chargeCard.html')

//点击提现
//getHtml($('.gamerWith'),'html/withdraw.html')

//点击团队人员
getHtml($('.teamList'),'html/teamList.html')

//点击玩家充值记录
//getHtml($('.RecodeList'),'html/recodeList.html')

//点击佣金记录
//getHtml($('.moneyList'),'html/moneyList.html')


function getHtml(ele,link){
	$(ele).click(function(){
//		$(this).addClass('subBg').siblings().removeClass('subBg');
//		$(this).parent().parent().siblings('li').children('.sub').children().removeClass('subBg')
		$.ajax({
			type: "get",	   
			url: link, 
			beforeSend:function(XMLHttpRequest){		
	            var index = layer.load(0, {shade: false});
	        },
			success: function(data){
				layer.closeAll();
			    $('.detail').html(data); //data就是请求页面的内容....        
	        }
		 });
	})
}


//getHeaderData();

//修改密码   
var $oldPwd = $('.loginpwd');
var $newPwd = $('.resetPsw');
var re = /^[0-9]{6,20}$/;
var $reNewPwd = $('.confirmSecrecypwd');
var changeToken = sessionStorage.getItem("agentToken");
$('.exitBtn').click(function(){
	if($oldPwd.val() != "" && $newPwd.val() != "" && $reNewPwd.val() != "" && re.test($newPwd.val()) && $newPwd.val()== $reNewPwd.val()){
		$.ajax({
			type:"post",
			url:http + "/app/agent/resetPwd",
			async:true,
			cache:false,
			contentType: "application/json;charset=utf-8",
			dataType: 'json',
			data:JSON.stringify({
				"agentToken":changeToken,
	    		"oldPwd":$oldPwd.val(),
	    		"newPwd":$newPwd.val()
			}),
			success:function(res){
				if(res.code == 100){
					alert(res.msg)
				}else if(res.code == 102){
					alert(res.msg)
				}else if(res.code == 502){
					alert(res.msg);
					window.location.href = 'html/login.html'
				}
			}
		});
	}else{
		$('.warn').css('display','block');
	}
	
})

//退出
$('.exit').click(function(){
	window.location.href = './html/login.html';
	sessionStorage.removeItem("agentToken");
})

//index页内容

$(document).ready(function(){
	$.ajax({
		type:"post",
		url:http + "/app/agent/getAgentInfo",
		async:true,
		cache:false,
		contentType: "application/json;charset=utf-8",
		dataType: 'json',
		data:JSON.stringify({
			"agentToken":changeToken
		}),
		success:function(res){
			if(res.code == 100){
				if(res.data.lastLogin == null){
					res.data.lastLogin = ''
				}else{
					$('.InvitationCode2').text(timeEdit(res.data.lastLogin));
				}
				if(res.data.ctime == null){
					res.data.ctime = ''
				}else{
					$('.count2').text(timeEdit(res.data.ctime));
				}
				var agentId = res.data.id;
				$('.nickName').text(res.data.nickname);
				$('.InvitationCode').text(res.data.realname);
				$('.count').text(res.data.fanka);
				$('.money').text(res.data.bonus);
				$('.todayRecharge').text(res.data.todayCharge);
				$('.totalRecharge').text(res.data.allCharge);
				$('.idCards').text(res.data.idcard);
				$('.money2').text(res.data.phone);
				$('.todayRecharge2').text(res.data.sjNickname);
				$('.totalRecharge2').text(res.data.sjId);
			}else if(res.code == 101){
				alert(res.msg)
			}else if(res.code == 502){
				alert(res.msg);
				window.location.href = './html/login.html'
			}
		}
	});
})








