// var http = "http://192.168.0.142:8094/";
// var http = "http://xi.qianmocn.com/" //服务器
// var userid = sessionStorage.getItem('userid')
// console.log(uesrid)


//http://48q9id.natappfree.cc/agentEnter/index.html?userid=2071&openid=ooeiIv0iJgRpm7bKJL_l3vMrINUk
//var url=window.location.href;  
/*var userid = url.substring(url.lastIndexOf('=')+1, url.length);
if(userid.substr(userid.length-1,1) == "#"){
				userid = userid.substring(userid.length-1,0);
			}else{
				userid = userid;	
			}*/
			
			
var url = "http://48q9id.natappfree.cc/agentEnter/index.html?userid=2071&openid=ooeiIv0iJgRpm7bKJL_l3vMrINUk";
//var url=window.location.href;
var userId1 = url.substring(url.lastIndexOf('userid=')+7, url.length);
var userid = "";
var openid = "";

var userId = userId1.split('&openid=');
	userid = userId[0];
	openid = userId[1];


if(userid.substr(userid.length-1,1) == "#"){
	userid = userid.substring(userid.length-1,0);
}else{
	userid = userid;	
};
if(openid.substr(openid.length-1,1) == "#"){
    openid = openid.substring(openid.length-1,0);
}else{
    openid = openid;
}

//var userid =loc;
//alert(userid)
//var userid = 51;
//var userid = "51";
//function getHeaderData(){
//	//alert(http)
//	$.ajax({
//		type:"post",
//		url: http + "package/rechargePage",
//		async:true,
//		cache:false,
//		contentType: "application/json;charset=utf-8",
//		dataType: 'json',	
//		data: JSON.stringify({
//			'userid':userid,
//		}),
//		success: function(data){
//			console.log(data);
//			$('.nickName').html(data.obj.nickName);
//			$('.InvitationCode').html(data.obj.invitationCode);
//			$('.count').html(data.obj.money);
//			//$('.money').html(data.obj.count);
//			$('.todayRecharge').html(data.obj.todayRecharge);
//			$('.totalRecharge').html(data.obj.totalRecharge);
//			
//			
//			$('.InvitationCode2').html(data.obj.vo.lastlogondate);
//			$('.count2').html(data.obj.vo.registerdate);
//			$('.money2').html(data.obj.vo.lastlogonip);
//			$('.todayRecharge2').html(data.obj.vo.parentName);
//			//var valId = data.obj.ov.parentGameId;
//			if(data.obj.vo.parentGameId == null){
//				$('#btn2').show();
//				$('#btn2').off().on('click',function(){
//					//$('.model').show();
//					layer.prompt({title: '游戏标识'}, function(pass, index){
//					layer.close(index);
//					layer.confirm('是否绑定？', {
//						  title: '提示',
//						  btn: ['确定','取消'] //按钮
//						},function(){
//							console.log(pass)
//							//绑定邀请人
//							$.ajax({
//						 		type:"post",
//						 		url: http + "package/binding",
//						 		async:true,
//						 		contentType: "application/json;charset=utf-8",
//								dataType: 'json',
//								data: JSON.stringify({
//									'gameid': pass,
//									'userid':userid,
//								}),
//								success: function(data){
//									console.log(data);
//									layer.closeAll();
//									if(data.code==200){
//										$('#userId1').val('')
//					                    $('#btn2').hide();
//										location.reload();
//									}else{
//										$('.worn').html(data.msg)
//									}
//								}
//						 	});
//						})
//			
//					});
//					
//				})
//			}else{
//				$('.totalRecharge2').text(data.obj.vo.parentGameId);//上级游戏标识
//			}
//			//userid = data.obj.userId;
//			//console.log(userid)
//		}
//	});
//}


$('#btnName').off().on('click',function(){
	$.ajax({
 		type:"post",
 		url: http + "package/synchro",
 		async:true,
 		contentType: "application/json;charset=utf-8",
		dataType: 'json',
		data: JSON.stringify({
			'userid': userid,
			'openid':openid,
		}),
		success: function(data){
			if(data.code==200){
				$('.nickName').text(data.obj);
			}
		}
 	});
})



$('.cancel').click(function(){
	$('.model').hide();
})


//时间戳转换为时间格式 格式为 yyyy-MM-dd hh:mm:ss
function add0(m){return m<10?'0'+m:m }
function timeEdit(time){
	var date = new Date(time);
	var y = date.getFullYear();
	var m = date.getMonth()+1;
	var d = date.getDate();
	var h = date.getHours();
	var mm = date.getMinutes();
	var s = date.getSeconds();
	return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
}





