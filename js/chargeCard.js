
var changeToken = sessionStorage.getItem("agentToken");
var reguser = /^[1-9]\d*$/;

//点击充卡
$('.chargeCard').click(function(){
	if($('.user').val() != ''&&reguser.test($('.user').val())&&$('.amount').val() != ''&&reguser.test($('.amount').val())){
		$.ajax({
			type:"post",
			url: http + "/app/agent/chargeFanka",
			async:true,
			cache:false,
			contentType: "application/json;charset=utf-8",
			dataType: 'json',	
			data: JSON.stringify({
				"agentToken":changeToken,
			    "userId":$('.user').val(),
			    "fanka":$('.amount').val()
			}),
			success: function(data){
				if(data.code == 100){
					alert('充值成功')
					window.history.go(0);
				}else if(data.code == 101){
					alert(data.msg)
				}else if(data.code == 102){
					alert(data.msg)
				}else if(data.code == 502){
					alert(data.msg);
					window.location.href = './login.html'
				}
			}
		});
	}else{
		$('.write_info').css('display','block')
	}
})
//房卡统计列表
$.ajax({
	type:"post",
	url: http + "/app/agent/fankaCount",
	async:true,
	cache:false,
	contentType: "application/json;charset=utf-8",
	dataType: 'json',	
	data: JSON.stringify({
		"agentToken":changeToken
	}),
	success: function(data){
		if(data.code == 100){
			$('.toCharge').text(data.today.charge);	
			$('.toSend').text(data.today.sent);
			$('.yeCharge').text(data.yestoday.charge);	
			$('.yeSend').text(data.yestoday.sent);
		}else if(res.code == 101){
			alert(res.msg)
		}
		
	}
});



