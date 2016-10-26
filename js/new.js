
var latBox = document.querySelector('.latbox'),
	lngBox = document.querySelector('.lngbox'),
	cityBox = document.querySelector('.citybox');

/*************js实现*************/

(window.onload = function(){

	if(navigator.geolocation){
	
		navigator.geolocation.getCurrentPosition(getPositionSuccess, getPositionError);
	
	}else{
	
		alert("您的浏览器不支持自动定位!");
	
	}

});



/***用户定位成功**/

function getPositionSuccess(position){
	//维度
	var lat = position.coords.latitude;
	//经度
	var lng = position.coords.longitude;
	var address;
	
	//通过baiduMap API获取街道名称
	var map = new BMap.Map("allmap");
	var point = new BMap.Point(lng,lat);
	var gc = new BMap.Geocoder();
	gc.getLocation(point, function(rs){
		var addComp = rs.addressComponents;
		address = addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber;
		console.log("address="+address);
		cityBox.innerHTML = address;
	});
	console.log("longitude="+lng+"  latitude="+lat);
	latBox.innerHTML = lat;
	lngBox.innerHTML = lng;
}


/**用户定位失败**/
function getPositionError(error){
	switch(error.code){
		case error.TIMEOUT:
			alert("连接超时，请重试");
			break;
		case error.PERMISSION_DENIED:
			alert("您拒绝了使用位置共享服务，查询已取消");
			break;
		case error.POSITION_UNAVAILABLE:
			alert("亲爱的火星网友，非常抱歉，我们暂时无法为您所在的星球提供位置服务");
			break;
	}
}