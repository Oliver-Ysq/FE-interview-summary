let arr = [1, 2, 3];
//增
arr.push(4);
arr.unshift(0);
arr.splice(5, 0, 5); //在下标为5的位置，删除0个元素，新增5
//删
arr.pop();
arr.shift();
arr.splice(-1, 1);

arr.map((val, idx, arr) => {
  //三个参数：值、索引、原数组
  console.log(val, idx, arr);
});
