var rob = function(nums) {
    let arr = []
    let arr2 = []

    for(let i=0; i<nums.length; i++){
        if(i % 2 == 0){
            arr.push(nums[i])
        }else{
            arr2.push(nums[i])
        }
    }
    let max = Math.max(arr.reduce((a,b) => a+b), arr2.reduce((a,b) => a+b))
    return max
};
console.log(rob([1,2,3,1]))