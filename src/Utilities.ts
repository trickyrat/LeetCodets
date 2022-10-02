import { ListNode } from "./DataStructures/ListNode";
import { TreeNode } from "./DataStructures/TreeNode";

export class Utilities {
  createListNode(nums: number[]): ListNode | null {
    let head = new ListNode(0);
    let dummyHead = head;
    for (const num of nums) {
      dummyHead.next = new ListNode(num);
      dummyHead = dummyHead.next;
    }
    return head.next;
  }
  convertListNodeToArray(head: ListNode | null): number[] {
    let res: number[] = [];
    while (head) {
      res.push(head.val);
      head = head.next;
    }
    return res;
  }

  createTreeNode(nums: (number | null)[]): TreeNode | null {
    if (nums[0] === null || nums[0] === undefined) {
      return null;
    }
    let root = new TreeNode(nums[0]);
    let queue = [root];
    let cursor = 1;
    while (cursor < nums.length) {
      let node = queue.shift();
      let leftVal = nums[cursor];
      let rightVal = nums[cursor + 1];
      if (leftVal !== null && leftVal !== undefined) {
        let leftNode = new TreeNode(leftVal);
        if (node) {
          node.left = leftNode;
        }
        queue.push(leftNode);
      }
      if (rightVal !== null && rightVal !== undefined) {
        let rightNode = new TreeNode(rightVal);
        if (node) {
          node.right = rightNode;
        }
        queue.push(rightNode);
      }
      cursor += 2;
    }
    return root;
  }

  preorderTraversal(root: TreeNode | null): number[] | null {
    let res: number[] = [];
    if (!root) {
      return null;
    }
    let stack: TreeNode[] = [];
    let node: TreeNode | null = root;
    while (stack.length > 0 || !node) {
      while (node) {
        res.push(node.val);
        stack.push(node);
        node = node.left;
      }
      node = stack.pop()!;
      node = node?.right;
    }
    return res;
  }

  isDigit = (ch: string) => {
    return parseInt(ch).toString() === "NaN" ? false : true;
  }
}