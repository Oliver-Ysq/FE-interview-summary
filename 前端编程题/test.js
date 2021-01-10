var swapPairs = function (head) {
    if (!head || !head.next) return head;
    let dummy = { next: head };
    const NUMBER = 2;
    let start = dummy,
        tail = dummy.next;
    let pre, cur, next;

    while (cur) {
        console.log(dummy)
        console.log("---")
        (pre = start), (cur = tail);
        for (let i = 0; i < NUMBER; i++) {
            next = cur.next;
            cur.next = pre;
            pre = cur;
            cur = next;
        }
        start.next = pre;
        tail.next = next;
        start = tail;
        tail = tail.next;
    }
    return dummy.next;
};

console.log(
    swapPairs({ val: 0, next: { val: 1, next: null } })
);
