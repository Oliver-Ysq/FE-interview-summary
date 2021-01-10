# 剑指offer刷题记录



## 总结

- 数组：map、滑动窗口（双指针法）、二分
- 链表：翻转链表（隔k个翻转；m-n翻转；）、快慢指针（链表成环，倒数第n个）
- 二叉树：bfs，层次遍历（记录下队列长度）



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



## 24. 反转链表

思路：3个指针分别指向：新的尾结点p、当前节点cur、下一节点q。注意更新顺序（优先保留后续节点的指向q）

```js
var reverseList = function (head) {
    let p = null, q, cur = head;
    while (cur) {
        q = cur.next
        cur.next = p
        p = cur
        cur = q
    }
    return p
};
```



## 28. 对称的二叉树

思路：递归

```js
var isSymmetric = function (root) {
    return isMirror(root,root)
};

function isMirror(l, r) {
    if (!l && !r) return true
    else if (!r || !l || l.val !== r.val) return false
    return isMirror(l.left, r.right) && isMirror(l.right, r.left)
}
```



## 32. 从上到下打印二叉树

思路：记录每一层个数

```js
var levelOrder = function (root) {
    if(!root) return []
    let q = [root]
    let res = []
    while (q.length) {
        let levelLen = q.length;	// 重点是记录每一层的个数
        let tmp = []
        while (levelLen--) {
            let r = q.shift()
            tmp.push(r.val)
            if (r.left) q.push(r.left)
            if (r.right) q.push(r.right)
        }
        res.push(tmp)
    }
    return res
};
```





## 38. 二叉树的深度

思路：递归

```js
let getMax= (a,b)=>{
    return a>b ? a : b
}

function TreeDepth(pRoot){
    if(pRoot==null) return 0
    return getMax(TreeDepth(pRoot.left),TreeDepth(pRoot.right)) + 1
}
```



## 42. 连续子数组的最大和

思路：dp，状态转移方程

```js
var maxSubArray = function (nums) {
    let dp = new Array(nums.length);
    dp[0] = nums[0]
    for (let i = 1; i < nums.length; i++) {
        if (dp[i - 1] < 0) dp[i] = nums[i]
        else dp[i] = dp[i - 1] + nums[i]
    }
    return Math.max(...dp)
};
```





## 52. 两个链表的第一个公共节点

思路：

1. 方法① 双指针
2. 方法② 先计算长度，让长的先走

```js
//方法②
function getLen(p) {
    let len = 0
    while (p) {
        len++
        p = p.next
    }
    return len
}

var getIntersectionNode = function (headA, headB) {
    let aLen = getLen(headA), bLen = getLen(headB), 
        l = aLen > bLen ? aLen - bLen : bLen - aLen
    if (aLen > bLen) {
        while (l--) headA = headA.next
        while (1) {
            if (headB === headA) return headA
            headA = headA.next
            headB = headB.next
        }
    }else{
        while (l--) headB = headB.next
        while (1) {
            if (headB === headA) return headA
            headA = headA.next
            headB = headB.next
        }
    }
};
```



## 53. 0~n-1中缺失的数字

思路：二分法

```js
var missingNumber = function(nums) {
    let left = 0;
    let right = nums.length - 1;
    while(left <= right) {
        let mid = (right + left) / 2
        if (nums[mid] === mid) left = mid + 1 
        else right = mid - 1
    }
    return left
};
```



## 57-I. 和为s的两个数字

思路：双指针法

```js
var twoSum = function (nums, target) {
    let left = 0, right = nums.length - 1, sum = nums[left] + nums[right]
    while (1) {
        if (sum < target) {
            left++
            sum = nums[left] + nums[right]
        } else if (sum > target) {
            right--
            sum = nums[left] + nums[right]
        } else {
            return [nums[left], nums[right]]
        }
    }
};
```





## 57-II. 和为s的连续正整数序列

思路：**滑动窗口（蠕虫法）**

```js
var findContinuousSequence = function (target) {
    let sum = 0, left = 1, right = 1,res = []
    while (left < target / 2) {
        if (sum < target) {
            sum += right
            right++
        } else if (sum > target) {
            sum -= left
            left++
        }else{
            let arr = []
            for(let i=left; i<right; i++) arr.push(i)
            res.push(arr)
            sum -= left
            left ++
        }
    }
    return res
};
```



## 59. 双端队列

![双端队列](C:\Users\25319\Desktop\实习\FE-interview-summary\剑指offer算法\双端队列.gif)



## 68-II. 二叉搜索树的最近公共祖先

思路：非递归，节点判断

```js
var lowestCommonAncestor = function (root, p, q) {
    if (!root) return null
    while (root) {
        if (p.val < root.val && q.val < root.val) root = root.left
        else if (p.val > root.val && q.val > root.val) root = root.right
        else return root
    }
};
```



## 68-II. 二叉树的最近公共祖先

思路：递归

```js
var lowestCommonAncestor = function (root, p, q) {
    if (!root || root === p || root === q) return root;
    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);
    if (!left) return right; // 左子树找不到，返回右子树
    else if (!right) return left; // 右子树找不到，返回左子树
    else return root;
};
```



# Leetcode

#### [25. K 个一组翻转链表](https://leetcode-cn.com/problems/reverse-nodes-in-k-group/)

```js
function left(node,k){	//判断剩余的节点是否够k个
    let p = node
    for(let i=0; i<k; i++){
        if(!p) return false
        else p = p.next
    }
    return true
}

var reverseKGroup = function(head, k) {
        if (!head || !head.next) return head
    let dummy = { next: head }
    let start = dummy, tail = dummy.next
    let pre, cur = tail, next

    while (left(cur,k)) {
        pre = start, cur = tail		//记录下要翻转区间两端点的前驱。
        for (let i = 0; i < k; i++) {
            next = cur.next
            cur.next = pre
            pre = cur
            cur = next
        }
        start.next = pre
        tail.next = next
        start = tail
        tail = tail.next
    }
    return dummy.next
};
```

