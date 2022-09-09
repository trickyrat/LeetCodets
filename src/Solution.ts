import { ListNode } from "./DataStructures/ListNode";
import { TreeNode } from "./DataStructures/TreeNode";
import { Node } from "./DataStructures/Node";
import { Trie } from "./DataStructures/Trie";

export class Solution {
    /**
     * 1.两数之和
     * @param nums 输入数组
     * @param target 两数之和
     * @returns 包含索引的数组
     */
    twoSum(nums: number[], target: number): number[] {
        let res = [0, 0];
        let dic: Map<number, number> = new Map<number, number>();
        for (let i = 0; i < nums.length; i++) {
            if (dic.has(target - nums[i])) {
                res[0] = dic.get(target - nums[i]) as number;
                res[1] = i;
                return res;
            } else {
                dic.set(nums[i], i);
            }
        }
        return [];
    }

    /**
     * 2.两数相加
     * @param l1 链表头节点
     * @param l2 链表头节点
     * @returns 相加后链表
     */
    addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
        let dummyHead: ListNode | null = new ListNode();
        let carry: number = 0;
        let curr: ListNode | null = dummyHead;
        while (l1 || l2) {
            let sum: number = 0;
            if (l1) {
                sum += l1.val;
                l1 = l1.next;
            }
            if (l2) {
                sum += l2.val;
                l2 = l2.next;
            }
            sum += carry;
            curr.next = new ListNode(sum % 10);
            curr = curr.next
            carry = Math.floor(sum / 10);
        }
        if (carry != 0) {
            curr.next = new ListNode(carry);
        }
        return dummyHead.next;
    }

    /**
     * 3.无重复字符的最长子串
     * @param s 输入字符串
     * @returns 最长字串的长度
     */
    longestSubstringWithoutRepeating(s: string): number {
        let len: number = s.length, ans: number = 0;
        let index: Array<number> = new Array<number>(128).fill(0);
        for (let i = 0, j = 0; j < len; j++) {
            i = Math.max(index[s[j].charCodeAt(0)], i);
            ans = Math.max(ans, j - i + 1);
            index[s[j].charCodeAt(0)] = j + 1;
        }
        return ans;
    }

    /**
     * 6.Z字形转换
     * @param s 输入字符串
     * @param numRows 输入行数
     * @returns 转换后的字符
     */
    zconvert(s: string, numRows: number): string {
        let n = s.length, r = numRows;
        if (r == 1 || r > n) {
            return s;
        }
        let t = r * 2 - 2;
        let ans = [];
        for (let i = 0; i < r; i++) {
            for (let j = 0; j < n - i; j += t) {
                ans.push(s[i + j]);
                if (i > 0 && i < r - 1 && j + t - i < n) {
                    ans.push(s[j + t - i]);
                }
            }
        }
        return ans.join('');
    }

    /**
     * 7.整数反转
     * @param x 输入整数
     */
    reverseIntNumber(x: number): number {
        let res = 0;
        while (x != 0) {
            let digit = x % 10;
            x = ~~(x / 10);
            res = res * 10 + digit;
            if (res < Math.pow(-2, 31) || res > Math.pow(2, 31) - 1) {
                return 0;
            }
        }
        return res;
    }

    /**
     * 20. Valid Parentheses
     * @param s 
     */
    isValidParentheses(s: string): boolean {
        let n = s.length;
        if (n % 2 === 1) {
            return false;
        }
        let pairs: Map<string, string> = new Map([
            [")", "("],
            ["]", "["],
            ["}", "{"],
        ]);
        let stack: string[] = [];
        for (const c of s) {
            if (pairs.has(c)) {
                if (!stack.length || stack[stack.length - 1] != pairs.get(c)) {
                    return false;
                }
                stack.pop();
            } else {
                stack.push(c);
            }
        }
        return !stack.length;
    }

    /**
     * 21. Merge Two Sorted Lists
     * @param list1 
     * @param list2 
     * @returns 
     */
    mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
        let head = new ListNode(-1);
        let dummyHead = head;
        while (list1 != null && list2 != null) {
            if (list1.val <= list2.val) {
                dummyHead.next = list1;
                list1 = list1.next;
            } else {
                dummyHead.next = list2;
                list2 = list2.next;
            }
            dummyHead = dummyHead.next;
        }
        dummyHead.next = list1 === null ? list2 : list1;
        return head.next;
    }

    /**
     * 27.移除元素
     * @param nums 
     * @param val 
     */
    removeElement(nums: number[], val: number): number {
        let left = 0, n = nums.length;
        for (let right = 0; right < n; right++) {
            if (nums[right] != val) {
                nums[left] = nums[right];
                left++;
            }
        }
        return left;
    }

    /**
    * 46. Permutations
    * @param nums 
    */
    permute(nums: number[]): number[][] {
        let res: number[][] = [];
        let used: boolean[] = new Array<boolean>(nums.length).fill(false);
        const backtrack = (candidates: number[], track: number[]) => {
            if (track.length === candidates.length) {
                res.push(track.slice());
                return;
            }
            for (let i = 0; i < candidates.length; ++i) {
                if (used[i]) {
                    continue;
                }
                track.push(candidates[i]);
                used[i] = true;
                backtrack(candidates, track);
                track.pop();
                used[i] = false;
            }
        };
        let track: number[] = [];
        backtrack(nums, track);
        return res;
    }

    /**
     * 47. Permutations II
     * @param nums 
     */
    permuteUnique(nums: number[]): number[][] {
        let ans: number[][] = [];
        let visited: boolean[] = new Array<boolean>(nums.length).fill(false);
        const backtrack = (index: number, perm: number[]) => {
            if (index === nums.length) {
                ans.push(perm.slice());
                return;
            }
            for (let i = 0; i < nums.length; ++i) {
                if (visited[i] || (i > 0 && nums[i] === nums[i - 1] && !visited[i - 1])) {
                    continue;
                }
                perm.push(nums[i]);
                visited[i] = true;
                backtrack(index + 1, perm);
                visited[i] = false;
                perm.pop();
            }
        };
        nums.sort((x, y) => x - y);
        backtrack(0, []);
        return ans;
    }

    /**
     * 48. Rotate Image
     * @param matrix 
     */
    rotate(matrix: number[][]): void {
        let n = matrix.length;
        for (let i = 0; i < Math.floor(n / 2); ++i) {
            for (let j = 0; j < n; ++j) {
                [matrix[i][j], matrix[n - i - 1][j]] = [matrix[n - i - 1][j], matrix[i][j]];
            }
        }

        for (let i = 0; i < n; ++i) {
            for (let j = 0; j < i; ++j) {
                [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
            }
        }
    }

    /**
     * 53. Maximum Subarray
     * @param nums 
     */
    maxSubArray(nums: number[]): number {
        let pre = 0, maxAns = nums[0];
        for (const num of nums) {
            pre = Math.max(pre + num, num);
            maxAns = Math.max(maxAns, pre);
        }
        return maxAns;
    }

    /**
     * 73.矩阵置零
     * @param matrix 
     */
    setZeroes(matrix: number[][]): void {
        let col0 = 1, rows = matrix.length, cols = matrix[0].length;
        for (let i = 0; i < rows; i++) {
            if (matrix[i][0] === 0) {
                col0 = 0;
            }
            for (let j = 1; j < cols; j++) {
                if (matrix[i][j] === 0) {
                    matrix[i][0] = matrix[0][j] = 0;
                }
            }
        }
        for (let i = rows - 1; i >= 0; i--) {
            for (let j = cols - 1; j >= 1; j--) {
                if (matrix[i][0] === 0 || matrix[0][j] === 0) {
                    matrix[i][j] = 0;
                }
            }
            if (col0 === 0) {
                matrix[i][0] = 0;
            }
        }
    }

    /**
     * 83. Remove Duplicates from Sorted List
     * @param head 
     */
    deleteDuplicates(head: ListNode | null): ListNode | null {
        if (!head) {
            return head;
        }
        let curr = head;
        while (curr.next) {
            if (curr.val === curr.next.val) {
                curr.next = curr.next.next;
            } else {
                curr = curr.next;
            }
        }
        return head;
    }

    /**
     * 88. Merge Sorted Array
     * @param nums1 
     * @param m 
     * @param nums2 
     * @param n 
     */
    merge(nums1: number[], m: number, nums2: number[], n: number): void {
        let p1 = m - 1, p2 = n - 1;
        let tail = m + n - 1;
        let cur = 0;
        while (p1 >= 0 || p2 >= 0) {
            if (p1 === - 1) {
                cur = nums2[p2--];
            } else if (p2 === -1) {
                cur = nums1[p1--];
            } else if (nums1[p1] > nums2[p2]) {
                cur = nums1[p1--];
            } else {
                cur = nums2[p2--];
            }
            nums1[tail--] = cur;
        }
    }

    /**
     * 94. Binary Tree Inorder Traversal
     * @param root 
     * @returns 
     */
    inorderTraversal(root: TreeNode | null): number[] {
        let inorder = (node: TreeNode | null, res: number[]) => {
            if (!node) return;
            inorder(node.left, res);
            res.push(node.val);
            inorder(node.right, res);
        };
        let res: number[] = [];
        inorder(root, res);
        return res;
    }

    /**
     * 101. Symmetric Tree
     * @param root 
     */
    isSymmetric(root: TreeNode | null): boolean {
        let helper = (node1: TreeNode | null, node2: TreeNode | null): boolean => {
            if (!node1 && !node2) return true;
            if (!node1 || !node2) return false;
            return node1.val === node2.val && helper(node1.left, node2.right) && helper(node1.right, node2.left);
        }
        return helper(root, root);
    }

    /**
     * 102. Binary Tree Level Order Traversal
     * @param root 
     */
    levelOrder(root: TreeNode | null): number[][] {
        let res: number[][] = [];
        if (!root) return res;
        let queue: TreeNode[] = [];
        queue.push(root);
        while (queue.length !== 0) {
            let currentLevelSize = queue.length;
            res.push([]);
            for (let i = 1; i <= currentLevelSize; ++i) {
                let currentNode = queue.shift() as TreeNode;
                res[res.length - 1].push(currentNode.val);
                if (currentNode.left) queue.push(currentNode.left);
                if (currentNode.right) queue.push(currentNode.right);
            }
        }
        return res;
    }

    /**
     * 104. Maximum Depth of Binary Tree
     * @param root 
     */
    maxDepth(root: TreeNode | null): number {
        if (!root) return 0;
        return Math.max(this.maxDepth(root.left), this.maxDepth(root.right)) + 1;
    }

    /**
     * 113.路径总和II
     * @param root 输入根节点
     * @param targetSum 目标值
     * @returns 
     */
    pathSum(root: TreeNode | null, targetSum: number): number[][] {
        let res: number[][] = [];
        const dfs = (node: TreeNode | null, targetSum: number, path: number[]) => {
            if (!node) {
                return;
            }
            path.push(node.val);
            targetSum -= node.val;
            if (!node.left && !node.right && targetSum === 0) {
                res.push(path.slice());
            }
            dfs(node.left, targetSum, path);
            dfs(node.right, targetSum, path);
            path.pop();
        }
        dfs(root, targetSum, []);
        return res;
    }

    /**
     * 118. Pascal's Triangle
     * @param numRows 
     */
    generate(numRows: number): number[][] {
        let res: number[][] = [];
        for (let i = 0; i < numRows; ++i) {
            let row = new Array<number>(i + 1).fill(1);
            for (let j = 1; j < row.length - 1; ++j) {
                row[j] = res[i - 1][j - 1] + res[i - 1][j];
            }
            res.push(row);
        }
        return res;
    }

    /**
     * 121. Best Time to Buy and Sell Stock
     * @param prices 
     */
    maxProfit(prices: number[]): number {
        let minPrice = Number.MAX_VALUE, max = 0;
        for (const price of prices) {
            max = Math.max(max, price - minPrice);
            minPrice = Math.min(price, minPrice);
        }
        return max;
    }

    /**
     * 141. Linked List Cycle
     * @param head 
     */
    hasCycle(head: ListNode | null): boolean {
        if (!head || !head.next) {
            return false;
        }
        let slow = head;
        let fast = head?.next;
        while (slow != fast) {
            if (!slow || !fast) {
                return false;
            }
            slow = slow?.next!;
            fast = fast?.next?.next!;
        }
        return true;
    }

    /**
     * 144. Binary Tree Preorder Traversal
     * @param root 
     * @returns 
     */
    preorderTraversal(root: TreeNode | null) {
        let preorder = (node: TreeNode | null, res: number[]) => {
            if (!node) return;
            res.push(node.val);
            preorder(node.left, res);
            preorder(node.right, res);
        };
        let res: number[] = [];
        preorder(root, res);
        return res;
    }

    /**
     * 145. Binary Tree Postorder Traversal
     * @param root 
     * @returns 
     */
    postorderTraversal(root: TreeNode | null) {
        let postorder = (node: TreeNode | null, res: number[]) => {
            if (!node) return;
            postorder(node.left, res);
            postorder(node.right, res);
            res.push(node.val);
        };
        let res: number[] = [];
        postorder(root, res);
        return res;
    }

    /**
     * 168. Excel Sheet Column Title
     * @param columnNumber 
     */
    convertToTitle(columnNumber: number): string {
        let sb = [];
        while (columnNumber !== 0) {
            columnNumber--;
            sb.push(String.fromCharCode(columnNumber % 26 + "A".charCodeAt(0)));
            columnNumber = Math.floor(columnNumber / 26);
        }
        return sb.reverse().join("");
    }

    /**
     * 171. Excel Sheet Column Number
     * @param columnTitle 
     */
    titleToNumber(columnTitle: string): number {
        let n = 0;
        let multiple = 1;
        for (let i = columnTitle.length - 1; i >= 0; --i) {
            let k = columnTitle.charCodeAt(i) - "A".charCodeAt(0) + 1;
            n += k * multiple;
            multiple *= 26;
        }
        return n;
    }

    /**
     * 172.阶乘后的零
     * @param n 
     */
    trailingZeroes(n: number): number {
        let ans = 0;
        while (n != 0) {
            n = Math.floor(n / 5);
            ans += n;
        }
        return ans
    }

    /**
     * 191. Number of 1 Bits
     * @param n 
     */
    hammingWeight(n: number): number {
        let ret: number = 0;
        while (n) {
            n &= n - 1;
            ret++;
        }
        return ret;
    }

    /**
     * 202. Happy Number
     * @param n 
     */
    isHappy(n: number): boolean {
        let getNext = (num: number): number => {
            let totalSum = 0;
            while (num > 0) {
                let digit = num % 10;
                num = Math.floor(num / 10);
                totalSum += digit * digit;
            }
            return totalSum;
        };
        let slow = n;
        let fast = getNext(n);
        while (fast != 1 && slow != fast) {
            slow = getNext(slow);
            fast = getNext(getNext(fast));
        }
        return fast === 1;
    }

    /**
     * 203. Remove Linked List Elements
     * @param head 
     * @param val 
     */
    removeElements(head: ListNode | null, val: number): ListNode | null {
        let dummyHead = new ListNode(0);
        dummyHead.next = head;
        let tmp = dummyHead;
        while (tmp.next !== null) {
            if (tmp.next.val == val) {
                tmp.next = tmp.next.next;
            } else {
                tmp = tmp.next;
            }
        }
        return dummyHead.next;
    }

    /**
     * 206. Reverse Linked List
     * @param head 
     */
    reverseList(head: ListNode | null): ListNode | null {
        let prev = null;
        let curr = head;
        while (curr) {
            let next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }

    /**
     * 217. Contains Duplicate
     * @param nums 
     */
    containsDuplicate(nums: number[]): boolean {
        let set: Set<number> = new Set<number>();
        for (const num of nums) {
            if (set.has(num)) {
                return true;
            }
            set.add(num);
        }
        return false;
    }

    /**
     * 242. Valid Anagram
     * @param s 
     * @param t 
     */
    isAnagram(s: string, t: string): boolean {
        let m = s.length;
        let n = t.length;
        if (m != n) {
            return false;
        }
        let map: Map<string, number> = new Map<string, number>();
        for (let i = 0; i < m; ++i) {
            if (map.has(s[i])) {
                let val = map.get(s[i]) as number;
                val++;
                map.set(s[i], val);
            } else {
                map.set(s[i], 1);
            }
        }

        for (let i = 0; i < n; ++i) {
            if (map.has(t[i])) {
                let val = map.get(t[i]) as number;
                val--;
                map.set(t[i], val);
            } else {
                map.set(t[i], -1);
            }
            if (map.get(t[i]) as number < 0) {
                return false;
            }
        }
        return true;
    }

    /**
     * 258.各位相加
     * @param num 
     * @returns 
     */
    addDigits(num: number): number {
        return (num - 1) % 9 + 1;
    }

    /**
     * 350. Intersection of Two Arrays II
     * @param nums1 
     * @param nums2 
     */
    intersect(nums1: number[], nums2: number[]): number[] {
        if (nums1.length > nums2.length) {
            this.intersect(nums2, nums1);
        }
        let map: Map<number, number> = new Map();
        for (const num of nums1) {
            if (map.has(num)) {
                let val = map.get(num) as number;
                val++;
                map.set(num, val);
            } else {
                map.set(num, 1);
            }
        }
        let intersection: number[] = [];
        let index = 0;
        for (const num of nums2) {
            if (map.has(num)) {
                let val = map.get(num) as number;
                if (val > 0) {
                    intersection[index++] = num;
                    val--;
                    if (val > 0) {
                        map.set(num, val);
                    } else {
                        map.delete(num);
                    }
                }
            }
        }
        return intersection;
    }

    /**
     * 357. 统计各位数字都不同的数字个数
     * @param n 
     */
    countNumbersWithUniqueDigits(n: number): number {
        if (n == 0) {
            return 1;
        }
        if (n == 1) {
            return 10;
        }
        let res = 10, cur = 9;
        for (let i = 0; i < n - 1; i++) {
            cur *= 9 - i;
            res += cur;
        }
        return res;
    }

    /**
     * 383. Ransom Note
     * @param ransomNote 
     * @param magazine 
     */
    canConstruct(ransomNote: string, magazine: string): boolean {
        if (ransomNote.length > magazine.length) {
            return false;
        }
        let count = new Array<number>(26).fill(0);
        for (const c of magazine) {
            count[c.charCodeAt(0) - 'a'.charCodeAt(0)]++;
        }
        for (const c of ransomNote) {
            count[c.charCodeAt(0) - 'a'.charCodeAt(0)]--;
            if (count[c.charCodeAt(0) - 'a'.charCodeAt(0)] < 0) {
                return false;
            }
        }
        return true;
    }

    /**
     * 386. 字典序排数
     * @param n 
     */
    lexicalOrder(n: number): number[] {
        let ret = [];
        let num = 1;
        for (let i = 0; i < n; ++i) {
            ret.push(num);
            if (num * 10 <= n) {
                num *= 10;
            } else {
                while (num % 10 === 9 || num + 1 > n) {
                    num = Math.floor(num / 10);
                }
                num++;
            }
        }
        return ret;
    }

    /**
     * 387. First Unique Character in a String
     * @param s 
     */
    firstUniqChar(s: string): number {
        let position: Map<string, number> = new Map<string, number>();
        let n = s.length;
        for (let [i, ch] of Array.from(s).entries()) {
            if (position.has(ch)) {
                position.set(ch, -1);
            } else {
                position.set(ch, i);
            }
        }

        let first = n;
        for (let pos of position.values()) {
            if (pos !== -1 && pos < first) {
                first = pos;
            }
        }
        if (first === n) {
            first = -1;
        }
        return first;
    }

    /**
     * 389. Find the Difference
     * @param s 
     * @param t 
     */
    findTheDifference(s: string, t: string): string {
        let n = s.length;
        if (n === 0) {
            return t;
        }
        let sSum = 0;
        for (const ch of s) {
            sSum += ch.charCodeAt(0);
        }
        let tSum = 0
        for (const ch of t) {
            tSum += ch.charCodeAt(0);
        }
        return String.fromCharCode(tSum - sSum);
    }

    /**
     * 404. Sum of Left Leaves
     * @param root 
     */
    sumOfLeftLeaves(root: TreeNode | null): number {
        let isLeafNode = (node: TreeNode): boolean => {
            return !node.left && !node.right;
        };
        let dfs = (node: TreeNode | null): number => {
            let sum = 0;
            if (node?.left) {
                sum += isLeafNode(node.left) ? node.left.val : dfs(node.left);
            }
            if (node?.right && !isLeafNode(node.right)) {
                sum += dfs(node.right);
            }
            return sum;
        };
        return root ? dfs(root) : 0;
    }

    /**
     * 467. Unique Substrings in Wraparound String
     * @param p 
     */
    findSubstringInWraparoundString(p: string): number {
        let dp = new Array<number>(26).fill(0);
        let k = 0;
        for (let i = 0; i < p.length; ++i) {
            if (i > 0 && (p[i].charCodeAt(0) - p[i - 1].charCodeAt(0) + 26) % 26 === 1) {
                ++k;
            } else {
                k = 1;
            }
            dp[p[i].charCodeAt(0) - 'a'.charCodeAt(0)] = Math.max(dp[p[i].charCodeAt(0) - 'a'.charCodeAt(0)], k);
        }
        return dp.reduce((prev, curr) => prev + curr, 0);
    }

    /**
     * 473. Matchsticks to Square
     * @param matchsticks 
     */
    makeSquare(matchsticks: number[]): boolean {
        let dfs = (index: number, data: number[], edges: number[], len: number): boolean => {
            if (index === data.length) {
                return true;
            }
            for (let i = 0; i < edges.length; ++i) {
                edges[i] += data[index];
                if (edges[i] <= len && dfs(index + 1, data, edges, len)) {
                    return true;
                }
                edges[i] -= data[index];
            }
            return false;
        };
        let total = matchsticks.reduce((prev, curr) => prev + curr, 0);
        if (total % 4 !== 0) {
            return false;
        }
        matchsticks.sort((a, b) => a - b);
        for (let i = 0, j = matchsticks.length - 1; i < j; ++i, --j) {
            [matchsticks[i], matchsticks[j]] = [matchsticks[j], matchsticks[i]];
        }
        let edges = new Array<number>(4).fill(0);
        return dfs(0, matchsticks, edges, Math.floor(total / 4));
    }

    /**
     * 496. Next Greater Element I
     * @param nums1 
     * @param nums2 
     */
    nextGreaterElement(nums1: number[], nums2: number[]): number[] {
        let map: Map<number, number> = new Map();
        let stack: number[] = [];
        for (let i = nums2.length - 1; i >= 0; --i) {
            let num = nums2[i];
            while (stack.length && num >= stack[stack.length - 1]) {
                stack.pop();
            }
            map.set(num, stack.length ? stack[stack.length - 1] : -1);
            stack.push(num);
        }
        let ans = new Array<number>(nums1.length).fill(0).map((_, i) => map.get(nums1[i])) as number[];
        return ans;
    }

    /**
     * 498.对角线遍历
     * @param matrix 
     */
    findDiagonalOrder(matrix: number[][]): number[] {
        if (matrix === null || matrix.length === 0) {
            return [];
        }
        let N = matrix.length, M = matrix[0].length;
        let row = 0, col = 0;
        let direction = 1;
        let res = new Array<number>(N * M);
        let r = 0;
        while (row < N && col < M) {
            res[r++] = matrix[row][col];
            let newRow = row + (direction == 1 ? -1 : 1);
            let newCol = col + (direction == 1 ? 1 : -1);
            if (newRow < 0 || newRow == N || newCol < 0 || newCol == M) {
                if (direction == 1) {
                    row += (col == M - 1 ? 1 : 0);
                    col += (col < M - 1 ? 1 : 0);
                } else {
                    col += (row == N - 1 ? 1 : 0);
                    row += (row < N - 1 ? 1 : 0);
                }
                direction = 1 - direction;
            } else {
                row = newRow;
                col = newCol;
            }
        }
        return res;
    }

    /**
     * 504.七进制数
     * @param num 
     */
    convertToBase7(num: number): string {
        if (num === 0) {
            return "0";
        }
        let negative = num < 0;
        num = Math.abs(num);
        let digits = []
        while (num > 0) {
            digits.push(num % 7);
            num = Math.floor(num / 7);
        }
        if (negative) {
            digits.push("-");
        }
        return digits.reverse().join("");
    }

    /**
     * 521.最长特殊序列
     * @param a 
     * @param b 
     * @returns 
     */
    findLUSLength(a: string, b: string): number {
        return a === b ? -1 : Math.max(a.length, b.length);
    }

    /**
     * 540. Single Element in a Sorted Array
     * @param nums 
     * @returns 
     */
    singleNonDuplicate(nums: number[]): number {
        let low = 0, high = nums.length - 1;
        while (low < high) {
            let mid = Math.floor((high - low) / 2) + low;
            if (nums[mid] == nums[mid ^ 1]) {
                low = mid + 1;
            }
            else {
                high = mid;
            }
        }
        return nums[low];
    }

    /**
     * 553.最优除法
     * @param nums 输入数组
     * @returns 结果字符串
     */
    optimalDivision(nums: number[]): string {
        let n = nums.length;
        if (n == 1) {
            return "" + nums[0];
        }
        if (n == 2) {
            return "" + nums[0] + "/" + nums[1];
        }
        let res = new Array<string>();
        res.push(nums[0].toString());
        res.push("/(");
        res.push(nums[1].toString());
        for (let i = 2; i < n; i++) {
            res.push("/");
            res.push(nums[i].toString());
        }
        res.push(")");
        return res.join('');
    }

    /**
     * 566. Reshape the Matrix
     * @param mat 
     * @param r 
     * @param c 
     */
    matrixReshape(mat: number[][], r: number, c: number): number[][] {
        let m = mat.length, n = mat[0].length;
        if (m * n !== r * c) {
            return mat;
        }
        let ans = new Array<number>(r).fill(0).map(() => new Array<number>(c).fill(0));
        for (let x = 0; x < m * n; ++x) {
            ans[Math.floor(x / c)][x % c] = mat[Math.floor(x / n)][x % n];
        }
        return ans;
    }

    /**
     * 589. N-ary Tree Preorder Traversal
     * @param root 
     */
    preorder(root: Node | null): number[] {
        let ans: number[] = [];
        const dfs = (node: Node | null) => {
            if (node === null) {
                return;
            }
            ans.push(node.val);
            for (const ch of node.children) {
                dfs(ch);
            }
        };
        dfs(root);
        return ans;
    }

    /**
     * 590.N叉树的后序遍历
     * @param root 
     * @returns 
     */
    postorder(root: Node | null): number[] {
        let ans: number[] = [];
        const dfs = (node: Node | null) => {
            if (node === null) {
                return;
            }
            for (const ch of node.children) {
                dfs(ch);
            }
            ans.push(node.val);
        };
        dfs(root);
        return ans;
    }

    /**
     * 623. Add One Row to Tree
     * @param root 
     * @param val 
     * @param depth 
     * @returns 
     */
    addOneRow(root: TreeNode | null, val: number, depth: number): TreeNode | null {
        if (!root) {
            return null;
        }
        if (depth === 1) {
            return new TreeNode(val, root, null);
        }
        if (depth === 2) {
            root.left = new TreeNode(val, root.left, null);
            root.right = new TreeNode(val, null, root.right);
        } else {
            root.left = this.addOneRow(root.left, val, depth - 1);
            root.right = this.addOneRow(root.right, val, depth - 1);
        }
        return root;
    }

    /**
     * 636. Exclusive Time of Functions
     * @param n 
     * @param logs 
     */
    exclusiveTime(n: number, logs: string[]): number[] {
        let stack: number[][] = []; // [index, timestamp]
        let res: number[] = new Array(n).fill(0);
        const start = "start";
        for (const log of logs) {
            // 0:start:1 
            // 0:end:1
            let firstColonIndex = log.indexOf(":");
            let lastColonIndex = log.lastIndexOf(":");
            let index = parseInt(log.substring(0, firstColonIndex));
            let type = log.substring(log.indexOf(":") + 1, lastColonIndex);
            let timestamp = parseInt(log.substring(lastColonIndex + 1));
            if (type === start) {
                if (stack.length) {
                    res[stack[stack.length - 1][0]] += timestamp - stack[stack.length - 1][1];
                }
                stack.push([index, timestamp]);
            } else {
                let pair = stack.pop()!;
                res[pair[0]] += timestamp - pair[1] + 1;
                if (stack.length) {
                    stack[stack.length - 1][1] = timestamp + 1;
                }
            }
        }
        return res;
    }

    /**
     * 646. Maximum Length of Pair Chain
     * @param pairs 
     */
    findLongestChain(pairs: number[][]): number {
        pairs.sort((a, b) => a[1] - b[1]);
        let curr = -Infinity, res = 0;
        for (const pair of pairs) {
            if (curr < pair[0]) {
                curr = pair[1];
                res++;
            }
        }
        return res;
    }

    /**
     * 652. Find Duplicate Subtrees
     * @param root 
     */
    findDuplicateSubtrees(root: TreeNode | null): (TreeNode | null)[] {
        let seen = new Map<string, [TreeNode, number]>();
        let repeat = new Set<TreeNode>();
        let index = 0;
        const dfs = (node: TreeNode | null): number => {
            if (node === null) {
                return 0;
            }
            let triple: [number, number, number] = [node.val, dfs(node.left), dfs(node.right)];
            let key = triple.toString();
            if (seen.has(key)) {
                let pair: [TreeNode, number] | undefined = seen.get(key);
                repeat.add(pair![0]);
                return pair![1];
            } else {
                seen.set(key, [node, ++index]);
                return index;
            }
        };
        dfs(root);
        return [...repeat];
    }

    /**
     * 658. Find K Closest Elements
     * @param arr 
     * @param k 
     * @param x 
     */
    findClosestElements(arr: number[], k: number, x: number): number[] {
        const binary_search = (nums: number[], target: number): number => {
            let low = 0, high = nums.length - 1;
            while (low < high) {
                const mid = low + Math.floor((high - low) / 2);
                if (nums[mid] >= x) {
                    high = mid;
                } else {
                    low = mid + 1;
                }
            }
            return low;
        }
        let right = binary_search(arr, x);
        let left = right - 1;
        while (k-- > 0) {
            if (left < 0) {
                right++;
            } else if (right >= arr.length) {
                left--;
            } else if (x - arr[left] <= arr[right] - x) {
                left--;
            } else {
                right++;
            }
        }
        const res = [];
        for (let i = left + 1; i < right; i++) {
            res.push(arr[i]);
        }
        return res;
    }

    /**
     * 662. Maximum Width of Binary Tree
     * @param root 
     */
    widthOfBinaryTree(root: TreeNode | null): number {
        let levelMin = new Map<number, number>();
        const dfs = (node: TreeNode | null, depth: number, index: number): number => {
            if (!node) {
                return 0;
            }
            if (!levelMin.get(depth)) {
                levelMin.set(depth, index);
            }
            return Math.max(index - levelMin.get(depth)! + 1,
                Math.max(
                    dfs(node.left, depth + 1, index * 2),
                    dfs(node.right, depth + 1, index * 2 + 1)
                ));
        };
        return dfs(root, 1, 1);
    }

    /**
     * 667. Beautiful Arrangement II
     * @param n 
     * @param k 
     */
    constructArray(n: number, k: number): number[] {
        let res = Array<number>(n).fill(0);
        let index = 0;
        for (let i = 1; i < n - k; ++i) {
            res[index++] = i;
        }
        for (let i = n - k, j = n; i <= j; ++i, --j) {
            res[index++] = i;
            if (i != j) {
                res[index++] = j;
            }
        }
        return res;
    }

    /**
     * 669. Trim a Binary Search Tree
     * @param root 
     * @param low 
     * @param high 
     */
    trimBST(root: TreeNode | null, low: number, high: number): TreeNode | null {
        while (root && (root.val < low || root.val > high)) {
            if (root.val < low) {
                root = root.right;
            } else {
                root = root.left;
            }
        }
        if (!root) {
            return null;
        }
        for (let node = root; node.left;) {
            if (node.left.val < low) {
                node.left = node.left.right;
            } else {
                node = node.left;
            }
        }
        for (let node = root; node.right;) {
            if (node.right.val > high) {
                node.right = node.right.left;
            } else {
                node = node.right;
            }
        }
        return root;
    }

    /**
     * 682.棒球比赛
     * @param ops 
     */
    calPoints(ops: string[]): number {
        let ret = 0;
        let points: number[] = [];
        for (const op of ops) {
            let n = points.length;
            switch (op[0]) {
                case '+':
                    ret += points[n - 1] + points[n - 2];
                    points.push(points[n - 1] + points[n - 2]);
                    break;
                case 'D':
                    ret += 2 * points[n - 1];
                    points.push(2 * points[n - 1]);
                    break;
                case 'C':
                    ret -= points[n - 1];
                    points.pop();
                    break;
                default:
                    let val: number = parseInt(op);
                    ret += val;
                    points.push(val);
            }
        }
        return ret;
    }

    /**
     * 687. Longest Univalue Path
     * @param root 
     */
    longestUnivaluePath(root: TreeNode | null): number {
        let res = 0;
        const dfs = (node: TreeNode | null): number => {
            if (!node) {
                return 0;
            }
            let left = dfs(node.left);
            let right = dfs(node.right);
            let left1 = 0, right1 = 0;
            if (node.left && node.left.val === node.val) {
                left1 = left + 1;
            }
            if (node.right && node.right.val === node.val) {
                right1 = right + 1;
            }
            res = Math.max(res, left1 + right1);
            return Math.max(left1, right1);
        }
        dfs(root);
        return res;
    }

    /**
     * 709. To Lower Case
     * @param s 
     */
    toLowerCase(s: string): string {
        let sb: string[] = [];
        for (let ch of s) {
            let val = ch.charCodeAt(0);
            if (val >= 65 && val <= 90) {
                ch = String.fromCharCode(val | 32);
            }
            sb.push(ch);
        }
        return sb.join("");
    }

    /**
     * 720. 词典中最长的单词
     * @param words 
     * @returns 
     */
    longestWord(words: string[]): string {
        let trie: Trie = new Trie();
        words.forEach(word => {
            trie.insert(word);
        });
        let longest: string = "";
        words.forEach(word => {
            if (trie.search(word)) {
                if (word.length > longest.length || (word.length == longest.length && word.localeCompare(longest) < 0)) {
                    longest = word;
                }
            }

        });
        return longest;
    }

    /**
     * 724. Find Pivot Index
     * @param nums 
     */
    pivotIndex(nums: number[]): number {
        let total = nums.reduce((a, b) => a + b, 0);
        let sum = 0;
        for (let i = 0; i < nums.length; i++) {
            if (2 * sum + nums[i] == total) {
                return i;
            }
            sum += nums[i];
        }
        return -1;
    }

    /**
     * 728.自除数
     * @param left 
     * @param right 
     */
    selfDividingNumbers(left: number, right: number): number[] {
        let isSelfDividing = (num: number) => {
            let tmp = num;
            while (tmp > 0) {
                let digit = tmp % 10;
                if (digit == 0 || num % digit != 0) {
                    return false;
                }
                tmp = Math.floor(tmp / 10);
            }
            return true;
        }
        let ans = [];
        for (let i = left; i <= right; i++) {
            if (isSelfDividing(i)) {
                ans.push(i);
            }
        }
        return ans;
    }


    /**
     * 744.寻找比目标字母大的最小字母
     * @param letters 
     * @param target 
     */
    nextGreatestLetter(letters: string[], target: string): string {
        let len = letters.length;
        if (target >= letters[len - 1]) {
            return letters[0];
        }
        let low = 0, high = len - 1;
        while (low < high) {
            let mid = Math.floor((high - low) / 2) + low;
            if (letters[mid] > target) {
                high = mid;
            } else {
                low = mid + 1;
            }
        }
        return letters[low];
    }

    /**
     * 762.二进制表示中质数个计算置位
     * @param left 
     * @param right 
     */
    countPrimeSetBits(left: number, right: number): number {
        let bitCount = (x: number) => {
            return x.toString(2).split('0').join('').length;
        };
        let ans = 0;
        for (let x = left; x <= right; ++x) {
            if (((1 << bitCount(x)) & 665772) != 0) {
                ++ans;
            }
        }
        return ans;
    }

    /**
     * 793. Preimage Size of Factorial Zeroes Function
     * @param k 
     */
    preimageSizeFZF(k: number): number {
        const zeta = (x: number): number => {
            let res = 0;
            while (x != 0) {
                res += Math.floor(x / 5);
                x = Math.floor(x / 5);
            }
            return res;
        };

        const nx = (x: number): number => {
            let left = 0, right = 5 * x;
            while (left <= right) {
                const mid = Math.floor((left + right) / 2);
                if (zeta(mid) < x) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
            return right + 1;
        };

        return nx(k + 1) - nx(k);
    }

    /**
     * 804.唯一摩尔斯密码词
     * @param words 
     */
    uniqueMorseRepresentations(words: string[]): number {
        let morse = [".-", "-...", "-.-.", "-..", ".", "..-.", "--.", "....", "..", ".---", "-.-", ".-..", "--", "-.", "---", ".--.", "--.-", ".-.", "...", "-", "..-", "...-", ".--", "-..-", "-.--", "--.."];
        let seen = new Set<string>();
        for (const word of words) {
            let code = "";
            for (const ch of word) {
                code += (morse[ch.charCodeAt(0) - 'a'.charCodeAt(0)]);
            }
            seen.add(code);
        }
        return seen.size;
    }

    /**
     * 806. 写字符串需要的行数
     * @param widths 
     * @param s 
     */
    numberOfLines(widths: number[], s: string): number[] {
        const MAX_WIDTH = 100;
        let lines = 1;
        let width = 0;
        for (let i = 0; i < s.length; i++) {
            let need = widths[s[i].charCodeAt(0) - 'a'.charCodeAt(0)];
            width += need;
            if (width > MAX_WIDTH) {
                lines++;
                width = need;
            }
        }
        return [lines, width];
    }

    /**
     * 819. 最常见的单词
     * @param paragraph 
     * @param banned 
     */
    mostCommonWord(paragraph: string, banned: string[]): string {
        let isLetter = (ch: string) => {
            return (ch >= "a" && ch <= "z") || (ch >= "A" && ch <= "Z");
        };
        let bannedSet = new Set<string>();
        for (const word of banned) {
            bannedSet.add(word);
        }
        let maxFrequency = 0;
        let frequencies = new Map<string, number>();
        let sb = "";
        let len = paragraph.length;
        for (let i = 0; i <= len; i++) {
            if (i < len && isLetter(paragraph[i])) {
                sb = sb + paragraph[i].toLowerCase();
            } else if (sb.length > 0) {
                if (!bannedSet.has(sb)) {
                    let frequency = (frequencies.get(sb) || 0) + 1;
                    frequencies.set(sb, frequency);
                    maxFrequency = Math.max(maxFrequency, frequency);
                }
                sb = "";
            }
        }
        let mostCommon = "";
        for (const [word, frequency] of frequencies.entries()) {
            if (frequency === maxFrequency) {
                mostCommon = word;
                break;
            }
        }
        return mostCommon;
    }

    /**
     * 821. 字符的最短距离
     * @param s 
     * @param c 
     */
    shortestToChar(s: string, c: string): number[] {
        let n = s.length;
        let ans = new Array<number>(n).fill(0);
        for (let i = 0, index = -n; i < n; ++i) {
            if (s[i] === c) {
                index = i;
            }
            ans[i] = i - index;
        }

        for (let i = n - 1, index = 2 * n; i >= 0; --i) {
            if (s[i] === c) {
                index = i;
            }
            ans[i] = Math.min(ans[i], index - i);
        }
        return ans;
    }

    /**
     * 828. Count Unique Characters of All Substrings of a Given String
     * @param s 
     */
    uniqueLetterString(s: string): number {
        let index = new Map<string, Array<number>>();
        for (let i = 0; i < s.length; i++) {
            const c = s[i];
            if (!index.has(c)) {
                index.set(c, []);
                index.get(c)?.push(-1);
            }
            index.get(c)?.push(i);
        }

        let res = 0;
        for (const [_, arr] of index.entries()) {
            arr.push(s.length);
            for (let i = 1; i < arr.length - 1; i++) {
                res += (arr[i] - arr[i - 1]) * (arr[i + 1] - arr[i]);
            }
        }
        return res;
    }

    /**
     * 876. Middle of the Linked List
     * @param head 
     */
    middleNode(head: ListNode | null): ListNode | null {
        let slow = head;
        let fast = head;
        while (fast && fast.next) {
            slow = slow?.next!;
            fast = fast.next.next;
        }
        return slow;
    }

    /**
     * 883.三维形体投影面积
     * @param grid 
     */
    projectionArea(grid: number[][]): number {
        let n = grid.length;
        let xyArea = 0, yzArea = 0, zxArea = 0;
        for (let i = 0; i < n; i++) {
            let yzHeight = 0, zxHeight = 0;
            for (let j = 0; j < n; j++) {
                xyArea += grid[i][j] > 0 ? 1 : 0;
                yzHeight = Math.max(yzHeight, grid[j][i]);
                zxHeight = Math.max(zxHeight, grid[i][j]);
            }
            yzArea += yzHeight;
            zxArea += zxHeight;
        }
        return xyArea + yzArea + zxArea;
    }

    /**
     * 905. 按奇偶排序数组
     * @param nums 
     */
    sortArrayByParity(nums: number[]): number[] {
        let left = 0, right = nums.length - 1;
        while (left < right) {
            while (left < right && nums[left] % 2 == 0) {
                left++;
            }
            while (left < right && nums[right] % 2 == 1) {
                right--;
            }
            if (left < right) {
                [nums[left], nums[right]] = [nums[right], nums[left]];
                left++;
                right--;
            }
        }
        return nums;
    }

    /**
     * 942. DI String Match
     * @param s 
     */
    diStringMatch(s: string): number[] {
        let n = s.length, lo = 0, hi = n;
        let perm = [];
        for (let i = 0; i < n; ++i) {
            perm[i] = s[i] === 'I' ? lo++ : hi--;
        }
        perm.push(lo);
        return perm;
    }

    /**
     * 944. Delete Columns to Make Sorted
     * @param strs 
     */
    minDeletionSize(strs: string[]): number {
        let row = strs.length;
        let col = strs[0].length;
        let ans = 0;
        for (let j = 0; j < col; ++j) {
            for (let i = 1; i < row; ++i) {
                if (strs[i - 1][j] > strs[i][j]) {
                    ans++;
                    break;
                }
            }
        }
        return ans;
    }

    /**
     * 946. Validate Stack Sequences
     * @param pushed 
     * @param popped 
     */
    validateStackSequences(pushed: number[], popped: number[]): boolean {
        const stack = [];
        const n = pushed.length;
        for (let i = 0, j = 0; i < n; ++i) {
            stack.push(pushed[i]);
            while (stack.length && stack[stack.length - 1] === popped[j]) {
                stack.pop();
                j++;
            }
        }
        return stack.length === 0;
    }

    /**
     * 953. Verifying an Alien Dictionary
     * @param words 
     * @param order 
     */
    isAlienSorted(words: string[], order: string): boolean {
        let index = new Array<number>(26).fill(0);
        for (let i = 0; i < order.length; ++i) {
            index[order[i].charCodeAt(0) - 'a'.charCodeAt(0)] = i;
        }
        for (let i = 1; i < words.length; ++i) {
            let valid = false;
            for (let j = 0; j < words[i - 1].length && j < words[i].length; ++j) {
                let prev = index[words[i - 1][j].charCodeAt(0) - 'a'.charCodeAt(0)];
                let curr = index[words[i][j].charCodeAt(0) - 'a'.charCodeAt(0)];
                if (prev < curr) {
                    valid = true;
                    break;
                } else if (prev > curr) {
                    return false;
                }
            }
            if (!valid) {
                if (words[i - 1].length > words[i].length) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * 961. N-Repeated Element in Size 2N Array
     * @param nums 
     */
    repeatedNTimes(nums: number[]): number {
        let found = new Set<number>();
        for (const num of nums) {
            if (found.has(num)) {
                return num;
            }
            found.add(num);
        }
        return -1;
    }

    /**
     * 976. Largest Perimeter Triangle
     * @param nums 
     */
    largestPerimeter(nums: number[]): number {
        nums = nums.sort((a, b) => a - b);
        for (let i = nums.length - 1; i >= 2; --i) {
            if (nums[i - 2] + nums[i - 1] > nums[i]) {
                return nums[i - 2] + nums[i - 1] + nums[i];
            }
        }
        return 0;
    }

    /**
     * 998. Maximum Binary Tree II
     * @param root 
     * @param val 
     */
    insertIntoMaxTree(root: TreeNode | null, val: number): TreeNode | null {
        let parent = null;
        let curr = root;
        while (curr) {
            if (val > curr.val) {
                if (!parent) {
                    return new TreeNode(val, root, null);
                }
                parent.right = new TreeNode(val, curr, null);
                return root;
            } else {
                parent = curr;
                curr = curr.right!;
            }
        }
        parent!.right = new TreeNode(val);
        return root;
    }

    /**
     * 1021. Remove Outermost Parentheses
     * @param s 
     */
    removeOuterParentheses(s: string): string {
        let level = 0;
        let res = "";
        for (let i = 0; i < s.length; ++i) {
            let ch = s[i];
            if (ch === ")") {
                level--;
            }
            if (level > 0) {
                res += ch;
            }
            if (ch === "(") {
                level++;
            }
        }
        return res;
    }

    /**
     * 1022. Sum of Root To Leaf Binary Numbers
     * @param root 
     */
    sumRootToLeaf(root: TreeNode | null): number {
        let dfs = (node: TreeNode | null, val: number): number => {
            if (!node) {
                return 0;
            }
            val = (val << 1) | node?.val;
            if (!node.left && !node.right) {
                return val;
            }
            return dfs(node.left, val) + dfs(node.right, val);
        };
        return dfs(root, 0);
    }

    /**
     * 1175. Prime Arrangements
     * @param n 
     */
    numPrimeArrangements(n: number): number {
        const countPrime = (n: number) => {
            let primes = [];
            let isPrime = new Array<number>(n).fill(1);
            for (let i = 2; i < n; ++i) {
                if (isPrime[i]) {
                    primes.push(i);
                }
                for (let j = 0; j < primes.length && i * primes[j] < n; ++j) {
                    isPrime[i * primes[j]] = 0;
                    if (i % primes[j] === 0) {
                        break;
                    }
                }
            }
            return primes.length;
        };
        const MOD = 1000000007;

        let numberOfPrimes = countPrime(n + 1);
        let res = 1;
        let m = n - numberOfPrimes;
        while (numberOfPrimes > 0) {
            res = res % MOD;
            res *= numberOfPrimes;
            numberOfPrimes--;
        }
        while (m > 0) {
            res = res % MOD;
            res *= m;
            m--;
        }
        return res;
    }

    /**
     * 1232. Check If It Is a Straight Line
     * @param coordinates 
     */
    checkStraightLine(coordinates: number[][]): boolean {
        let dx = coordinates[0][0], dy = coordinates[0][1];
        let n = coordinates.length;
        for (let i = 0; i < n; ++i) {
            coordinates[i][0] -= dx;
            coordinates[i][1] -= dy;
        }
        let A = coordinates[1][1], B = -coordinates[1][0];
        for (let i = 2; i < n; ++i) {
            let x = coordinates[i][0], y = coordinates[i][1];
            if (A * x + B * y !== 0) {
                return false;
            }
        }
        return true;
    };

    /**
     * 1281. Subtract the Product and Sum of Digits of an Integer
     * @param n 
     */
    subtractProductAndSum(n: number): number {
        let sum: number = 0;
        let product: number = 1;
        while (n > 0) {
            let digit: number = n % 10;
            n = Math.floor(n / 10);
            sum += digit;
            product *= digit;
        }
        return product - sum;
    }

    /**
     * 1290. Convert Binary Number in a Linked List to Integer
     * @param head 
     */
    getDecimalValue(head: ListNode | null): number {
        let curr = head;
        let ans = 0;
        while (curr) {
            ans = ans * 2 + curr.val;
            curr = curr.next;
        }
        return ans;
    }

    /**
     * 1309. Decrypt String from Alphabet to Integer Mapping
     * @param s 
     */
    freqAlphabets(s: string): string {
        let ans = "";
        let n = s.length;
        for (let i = 0; i < n; ++i) {
            if (i + 2 < n && s[i + 2] === "#") {
                ans += String.fromCharCode((s[i].charCodeAt(0) - '0'.charCodeAt(0)) * 10
                    + s[i + 1].charCodeAt(0) - '1'.charCodeAt(0) + 'a'.charCodeAt(0));
                i += 2;
            } else {
                ans += String.fromCharCode(s[i].charCodeAt(0) - '1'.charCodeAt(0) + 'a'.charCodeAt(0));
            }
        }
        return ans;
    }

    /**
     * 1356. Sort Integers by The Number of 1 Bits
     * @param arr 
     */
    sortByBits(arr: number[]): number[] {
        let bits: number[] = new Array<number>(10001).fill(0);
        for (let i = 0; i <= 10000; ++i) {
            bits[i] = bits[i >> 1] + (i & 1);
        }
        arr.sort((a, b) => {
            if (bits[a] !== bits[b]) {
                return bits[a] - bits[b];
            }
            return a - b;
        });
        return arr;
    }

    /**
     * 1403. Minimum Subsequence in Non-Increasing Order
     * @param nums 
     */
    minSubsequence(nums: number[]): number[] {
        let total = nums.reduce((prev, curr) => prev + curr, 0);
        nums.sort((a, b) => a - b);
        let ans = [];
        let curr = 0;
        for (let i = nums.length - 1; i >= 0; --i) {
            curr += nums[i];
            ans.push(nums[i]);
            if (total - curr < curr) {
                break;
            }
        }
        return ans;
    }

    /**
     * 1408. String Matching in an Array
     * @param words 
     */
    stringMatching(words: string[]): string[] {
        let res: string[] = []
        for (let i = 0; i < words.length; ++i) {
            for (let j = 0; j < words.length; ++j) {
                if (i != j && words[j].search(words[i]) !== -1) {
                    res.push(words[i]);
                    break;
                }
            }
        }
        return res;
    }

    /**
     * 1417. Reformat The String
     * @param s 
     */
    reformat(s: string): string {
        const isDigit = (ch: string) => {
            return parseInt(ch).toString() === "NaN" ? false : true;
        }
        let sumDigit = 0;
        for (let i = 0; i < s.length; ++i) {
            if (isDigit(s[i])) {
                sumDigit++;
            }
        }
        let sumAlpha = s.length - sumDigit;
        if (Math.abs(sumDigit - sumAlpha) > 1) {
            return "";
        }
        let flag = sumDigit > sumAlpha;
        const arr = [...s];
        for (let i = 0, j = 1; i < s.length; i += 2) {
            if (isDigit(arr[i]) !== flag) {
                while (isDigit(arr[j]) !== flag) {
                    j += 2;
                }
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
        }
        return arr.join('');
    }

    /**
     * 1450. Number of Students Doing Homework at a Given Time
     * @param startTime 
     * @param endTime 
     * @param queryTime 
     */
    busyStudent(startTime: number[], endTime: number[], queryTime: number): number {
        let res = 0;
        for (let i = 0; i < startTime.length; ++i) {
            if (startTime[i] <= queryTime && queryTime <= endTime[i]) {
                res++;
            }
        }
        return res;
    }

    /**
     * 1455. Check If a Word Occurs As a Prefix of Any Word in a Sentence
     * @param sentence 
     * @param searchWord 
     */
    isPrefixOfWord(sentence: string, searchWord: string): number {
        const isPrefix = (input: string, start: number, end: number, target: string): boolean => {
            for (let i = 0; i < target.length; ++i) {
                if (start + i >= end || input[start + i] != target[i]) {
                    return false;
                }
            }
            return true;
        };
        let n = sentence.length, index = 1, start = 0, end = 0;
        while (start < n) {
            while (end < n && sentence[end] != ' ') {
                end++;
            }
            if (isPrefix(sentence, start, end, searchWord)) {
                return index;
            }
            index++;
            end++;
            start = end;
        }
        return -1;
    }

    /**
     * 1460. Make Two Arrays Equal by Reversing Sub-arrays
     * @param target 
     * @param arr 
     */
    canBeEqual(target: number[], arr: number[]): boolean {
        if (target.length != arr.length) {
            return false;
        }
        target.sort();
        arr.sort();
        return target.toString() === arr.toString();
    }

    /**
     * 1464. Maximum Product of Two Elements in an Array
     * @param nums 
     */
    maxProduct(nums: number[]): number {
        let a = nums[0], b = nums[1];
        if (a < b) {
            const temp = a;
            a = b;
            b = temp;
        }
        for (let i = 2; i < nums.length; ++i) {
            if (nums[i] > a) {
                b = a;
                a = nums[i];
            } else if (nums[i] > b) {
                b = nums[i];
            }
        }
        return (a - 1) * (b - 1);
    }

    /**
     * 1470. Shuffle the Array
     * @param nums 
     * @param n 
     */
    shuffle(nums: number[], n: number): number[] {
        let res = [];
        for (let i = 0; i < n; ++i) {
            res[2 * i] = nums[i];
            res[2 * i + 1] = nums[i + n];
        }
        return res;
    }

    /**
     * 1475. Final Prices With a Special Discount in a Shop
     * @param prices 
     */
    finalPrices(prices: number[]): number[] {
        const n = prices.length;
        let res = new Array<number>(n).fill(0);
        let stack: number[] = [];
        for (let i = n - 1; i >= 0; --i) {
            while (stack.length && stack[stack.length - 1] > prices[i]) {
                stack.pop();
            }
            res[i] = stack.length === 0 ? prices[i] : prices[i] - stack[stack.length - 1];
            stack.push(prices[i]);
        }
        return res;
    }

    /**
     * 1491. Average Salary Excluding the Minimum and Maximum Salary
     * @param salary 
     * @returns 
     */
    average(salary: number[]): number {
        let min: number = Number.MAX_VALUE;
        let max: number = Number.MIN_VALUE;
        let sum: number = 0;
        for (let item of salary) {
            sum += item;
            max = Math.max(max, item);
            min = Math.min(min, item);
        }
        return (sum - min - max) / (salary.length - 2);
    }

    /**
     * 1502. Can Make Arithmetic Progression From Sequence
     * @param arr 
     * @returns 
     */
    canMakeArithmeticProgression(arr: number[]): boolean {
        arr = arr.sort((a, b) => a - b);
        for (let i = 1; i < arr.length - 1; ++i) {
            if (arr[i] * 2 != arr[i - 1] + arr[i + 1]) {
                return false;
            }
        }
        return true;
    }

    /**
     * 1523. Count Odd Numbers in an Interval Range
     * @param low 
     * @param high 
     * @returns 
     */
    countOdds(low: number, high: number): number {
        const pre = (num: number) => {
            return (num + 1) >> 1;
        };

        return pre(high) - pre(low - 1);
    }

    /**
     * 1572. Matrix Diagonal Sum
     * @param mat 
     */
    diagonalSum(mat: number[][]): number {
        let n = mat.length, mid = Math.floor(n / 2);
        let sum = 0;
        for (let i = 0; i < n; ++i) {
            sum += mat[i][i] + mat[i][n - i - 1];
        }
        return sum - mat[mid][mid] * (n & 1);
    }

    /**
     * 1582. Special Positions in a Binary Matrix
     * @param mat 
     */
    numSpecial(mat: number[][]): number {
        let m = mat.length, n = mat[1].length;
        for (let i = 0; i < m; ++i) {
            let count = 0;
            for (let j = 0; j < n; ++j) {
                if (mat[i][j] === 1) {
                    count++;
                }
            }

            if (i === 0) {
                count--;
            }
            if (count > 0) {
                for (let j = 0; j < n; ++j) {
                    if (mat[i][j] === 1) {
                        mat[0][j] += count;
                    }
                }
            }
        }
        let sum = 0;
        for (const num of mat[0]) {
            if (num === 1) {
                sum++;
            }
        }
        return sum;
    }

    /**
     * 1588. Sum of All Odd Length Subarrays
     * @param arr 
     * @returns 
     */
    sumOddLengthSubarrays(arr: number[]): number {
        let sum = 0;
        let n = arr.length;
        for (let i = 0; i < n; ++i) {
            let leftCount = i, rightCount = n - i - 1;
            let leftOdd = Math.floor((leftCount + 1) / 2);
            let rightOdd = Math.floor((rightCount + 1) / 2);
            let leftEven = Math.floor(leftCount / 2) + 1;
            let rightEven = Math.floor(rightCount / 2) + 1;
            sum += arr[i] * (leftOdd * rightOdd + leftEven * rightEven);
        }
        return sum;
    }

    /**
     * 1592. Rearrange Spaces Between Words
     * @param text 
     */
    reorderSpaces(text: string): string {
        let n = text.length;
        let words: string[] = [];
        text.split(' ').forEach(e => {
            if (e.length > 0) {
                words.push(e);
            }
        });

        let spaceCount = n;
        for (const word of words) {
            if (word.length) {
                spaceCount -= word.length;
            }
        }

        let sb = "";
        if (words.length === 1) {
            sb += words[0];
            for (let i = 0; i < spaceCount; i++) {
                sb += " ";
            }
            return sb;
        }

        let perSpace = Math.floor(spaceCount / (words.length - 1));
        let restSpace = spaceCount % (words.length - 1);
        for (let i = 0; i < words.length; i++) {
            if (i > 0) {
                for (let j = 0; j < perSpace; j++) {
                    sb += " ";
                }
            }
            sb += words[i];
        }
        for (let i = 0; i < restSpace; i++) {
            sb += " ";
        }
        return sb;
    }

    /**
     * 1598. Crawler Log Folder
     * @param logs 
     */
    minOperations(logs: string[]): number {
        let depth = 0;
        logs.forEach(log => {
            if (log === "../") {
                if (depth > 0) {
                    depth--;
                }
            } else if (log === "./") {
                return;
            } else {
                depth++;
            }
        });
        return depth;
    }

    /**
     * 1672. 最富有客户的资产总量
     * @param accounts 
     */
    maximumWealth(accounts: number[][]): number {
        let maxWealth = 0;
        for (const account of accounts) {
            maxWealth = Math.max(maxWealth, account.reduce((a, b) => a + b));
        }
        return maxWealth
    }

    /**
     * 1678. Goal Parser Interpretation
     * @param command 
     */
    interpret(command: string): string {
        let n = command.length;
        let ans = "";
        for (let i = 0; i < n; ++i) {
            if (command[i] === "G") {
                ans += "G";
            } else if (command[i] === ")") {
                if (command[i - 1] === "(") {
                    ans += "o";
                } else if (command[i - 1] === "l") {
                    ans += "al"
                }
            }
        }
        return ans;
    }

    /**
     * 1768. Merge Strings Alternately
     * @param word1 
     * @param words 
     */
    mergeAlternately(word1: string, word2: string): string {
        let m = word1.length, n = word2.length, index = 0;
        let res: string[] = new Array<string>(m + n).fill(" ");
        for (let i = 0; i < m || i < n; ++i) {
            if (i < m) {
                res[index++] = word1[i];
            }
            if (i < n) {
                res[index++] = word2[i];
            }
        }
        return res.join("");
    }

    /**
     * 1779. Find Nearest Point That Has the Same X or Y Coordinate
     * @param x 
     * @param y 
     * @param points 
     * @returns 
     */
    nearestValidPoint(x: number, y: number, points: number[][]): number {
        let min = Number.MAX_VALUE;
        let ans = -1;
        for (let i = 0; i < points.length; ++i) {
            if (points[i][0] == x || points[i][1] == y) {
                let distance = Math.abs(points[i][0] - x) + Math.abs(points[i][1] - y);
                if (distance < min) {
                    min = distance;
                    ans = i;
                }
            }
        }
        return ans;
    }

    /**
     * 1790. Check if One String Swap Can Make Strings Equal
     * @param s1 
     * @param s2 
     * @returns 
     */
    areAlmostEqual(s1: string, s2: string): boolean {
        if (s1 === s2) {
            return true;
        }
        let s1Diff = "";
        let s2Diff = "";
        for (let i = 0; i < s1.length; ++i) {
            if (s1[i] !== s2[i]) {
                s1Diff += s1[i];
                s2Diff = s2[i] + s2Diff;
                if (s1Diff.length > 2) {
                    return false;
                }
            }
        }
        return s1Diff.length === 2 && s1Diff === s2Diff;
    }

    /**
     * 1822. Sign of the Product of an Array
     * @param nums 
     */
    arraySign(nums: number[]): number {
        let sign = 1;
        for (const num of nums) {
            if (num === 0) {
                return 0;
            } else if (num < 0) {
                sign *= -1;
            }
        }
        return sign > 0 ? 1 : -1;
    }

    /**
     * 1823. Find the Winner of the Circular Game
     * @param n 
     * @param k 
     */
    findTheWinner(n: number, k: number): number {
        let winner = 1;
        for (let i = 2; i <= n; ++i) {
            winner = (k + winner - 1) % i + 1;
        }
        return winner;
    }

    /**
     * 1991. Find the Middle Index in Array
     * @param nums 
     */
    findMiddleIndex(nums: number[]): number {
        let total = nums.reduce((a, b) => a + b, 0);
        let sum = 0;
        for (let i = 0; i < nums.length; i++) {
            if (2 * sum + nums[i] === total) {
                return i;
            }
            sum += nums[i];
        }
        return -1;
    }

    /**
     * 2006.差值的绝对值为k数对数目
     * @param nums 输入数组
     * @param k 差值
     * @returns 数对数目
     */
    countKDifference(nums: number[], k: number): number {
        let ans = 0, n = nums.length;
        let cnt = new Map();
        for (let i = 0; i < n; i++) {
            ans += (cnt.get(nums[i] - k) || 0) + (cnt.get(nums[i] + k) || 0);
            cnt.set(nums[i], (cnt.get(nums[i]) || 0) + 1);
        }
        return ans;
    }

    /**
     * 2016.增量元素之间的最大值
     * @param nums 输入元素
     * @returns 最大值
     */
    maximumDifference(nums: number[]): number {
        let n = nums.length;
        let ans = -1, premin = nums[0];
        for (let i = 0; i < n; i++) {
            if (nums[i] > premin) {
                ans = Math.max(ans, nums[i] - premin);
            } else {
                premin = nums[i];
            }
        }
        return ans;
    }

    /**
     * 2044.统计按位或能得到最大值的子集数目
     * @param nums 
     */
    countMaxOrSubsets(nums: number[]): number {
        let maxOr = 0, cnt = 0
        const dfs = (pos: number, orVal: number) => {
            if (pos === nums.length) {
                if (orVal > maxOr) {
                    maxOr = orVal;
                    cnt = 1;
                } else if (orVal === maxOr) {
                    cnt++;
                }
                return;
            }
            dfs(pos + 1, orVal | nums[pos]);
            dfs(pos + 1, orVal);
        };
        dfs(0, 0);
        return cnt;
    }

    /**
     * 2055.蜡烛之间的盘子
     * @param s 
     * @param queries 
     * @returns 
     */
    platesBetweenCandles(s: string, queries: number[][]): number[] {
        let n = s.length;
        let preSum = new Array(n).fill(0);
        for (let i = 0, sum = 0; i < n; i++) {
            if (s[i] === "*") {
                sum++;
            }
            preSum[i] = sum;
        }
        let left = new Array(n).fill(0);
        for (let i = 0, l = -1; i < n; i++) {
            if (s[i] === "|") {
                l = i;
            }
            left[i] = l;
        }
        let right = new Array(n).fill(0);
        for (let i = n - 1, r = -1; i >= 0; i--) {
            if (s[i] === "|") {
                r = i;
            }
            right[i] = r;
        }
        let ans = new Array(queries.length).fill(0);
        for (let i = 0; i < queries.length; i++) {
            let query = queries[i];
            let x = right[query[0]], y = left[query[1]];
            ans[i] = x === -1 || y === -1 || x >= y ? 0 : preSum[y] - preSum[x];

        }
        return ans;
    }

    /**
     * 6078. Rearrange Characters to Make Target String
     * @param s 
     * @param target 
     */
    rearrangeCharacters(s: string, target: string): number {
        let sMap = new Map<string, number>();
        let targetMap = new Map<string, number>();

        for (const item of s) {
            if (sMap.has(item)) {
                let value = sMap.get(item);
                if (value) {
                    sMap.set(item, value + 1);
                }
            } else {
                sMap.set(item, 1);
            }
        }

        for (const item of target) {
            if (targetMap.has(item)) {
                let value = targetMap.get(item);
                if (value) {
                    targetMap.set(item, value + 1);
                }
            } else {
                targetMap.set(item, 1);
            }
        }
        let ans = Number.MAX_VALUE;
        for (const item of target) {
            let sValue = sMap.get(item);
            if (!sValue) {
                sValue = 0;
            }
            let targetValue = targetMap.get(item);
            if (targetValue) {
                ans = Math.min(ans, Math.floor(sValue / targetValue));
            }
        }
        return ans;
    }
}
