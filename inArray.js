var newArray=[1,3,5,7,9];

function inArray(arr,value) {
    for(var i=0;i<arr.length;i++){
        if(arr[i]==value){
            return true;
        }else{
            return false;
        }
    }
}

