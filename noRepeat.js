	
var newArray=[2,4,6,8,2,4,6,8];

/*1.遍历数组法 缺点:IE8以下不支持indexOf*/
// 使用了 indexOf() push()方法
function noRepeat(array){
	var result=[];
	for(var i=0;i<array.length;i++){
		
		if(result.indexOf(array[i])==-1){
			result.push(array[i]);
		}
	}
	return result;
};
console.log(noRepeat(newArray));


/*2.数组下标法*/
function noRepeat(array){
	var result=[];
	for(var i=0;i<array.length;i++){
		if(array.indexOf(array[i])==i){
			result.push(array[i]);
		}
	}
	return result;
}

console.log(noRepeat(newArray));



/*优化遍历数组法*/

function noRepeat(array) {
	var result=[];
	for (var i=0;i<array.length;i++) {
		for(var j=i+1;j<array.length;j++){
			if(array[i]==array[j]){
				j=++i;
			}			
		}
		result.push(array[i]);
	}
	return result;
}
console.log(noRepeat(newArray));