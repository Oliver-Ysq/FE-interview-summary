# 剑指offer刷题记录

## 1. 二位数组查找

## 5. 用两个栈模拟队列

```js
let stack1 = [];
let stack2 = [];
function push(node) {
  stack1.push(node);
}
function pop() {
  while (stack1.length) {
    let tmp = stack1.pop();
    stack2.push(tmp);
  }
  let el = stack2.pop();
  while(stack2.length) {
    let tmp = stack2.pop();
    stack1.push(tmp);
  }
  return el;
}
```



## 38. 二叉树的深度

思路：递归

```js
let getMax= (a,b)=>{
    return a>b?a:b
}

function TreeDepth(pRoot){
    if(pRoot==null) return 0
    return getMax(TreeDepth(pRoot.left),TreeDepth(pRoot.right))+1
}
```

