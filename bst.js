class BinarySearchTree {
    constructor(key = null, value = null, parent = null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }
    insert(key, value) {
        // If the tree is empty then this key being inserted is the root node of the tree
        if (this.key == null) {
            this.key = key;
            this.value = value;
        }

        /* If the tree already exists, then start at the root, 
           and compare it to the key you want to insert.
           If the new key is less than the node's key 
           then the new node needs to live in the left-hand branch */
        else if (key < this.key) {
            /* If the existing node does not have a left child, 
               meaning that if the `left` pointer is empty, 
               then we can just instantiate and insert the new node 
               as the left child of that node, passing `this` as the parent */
            if (this.left == null) {
                this.left = new BinarySearchTree(key, value, this);
            }
            /* If the node has an existing left child, 
               then we recursively call the `insert` method 
               so the node is added further down the tree */
            else {
                this.left.insert(key, value);
            }
        }
        /* Similarly, if the new key is greater than the node's key 
           then you do the same thing, but on the right-hand side */
        else {
            if (this.right == null) {
                this.right = new BinarySearchTree(key, value, this);
            }
            else {
                this.right.insert(key, value);
            }
        }
    }
    find(key) {
        // If the item is found at the root then return that value
        if (this.key == key) {
            return this.value;
        }
        /* If the item you are looking for is less than the root 
           then follow the left child.
           If there is an existing left child, 
           then recursively check its left and/or right child
           until you find the item */
        else if (key < this.key && this.left) {
            return this.left.find(key);
        }
        /* If the item you are looking for is greater than the root 
           then follow the right child.
           If there is an existing right child, 
           then recursively check its left and/or right child
           until you find the item */
        else if (key > this.key && this.right) {
            return this.right.find(key);
        }
        // You have searched the tree and the item is not in the tree
        else {
            throw new Error('Key Error');
        }
    }
    remove(key) {
        if (this.key == key) {
            if (this.left && this.right) {
                const successor = this.right._findMin();
                this.key = successor.key;
                this.value = successor.value;
                successor.remove(successor.key);
            }
            /* If the node only has a left child, 
               then you replace the node with its left child */
            else if (this.left) {
                this._replaceWith(this.left);
            }
            /* And similarly if the node only has a right child 
               then you replace it with its right child */
            else if (this.right) {
                this._replaceWith(this.right);
            }
            /* If the node has no children then
               simply remove it and any references to it 
               by calling "this._replaceWith(null)" */
            else {
                this._replaceWith(null);
            }
        }
        else if (key < this.key && this.left) {
            this.left.remove(key);
        }
        else if (key > this.key && this.right) {
            this.right.remove(key);
        }
        else {
            throw new Error('Key Error');
        }
    }
    _replaceWith(node) {
        if (this.parent) {
            if (this == this.parent.left) {
                this.parent.left = node;
            }
            else if (this == this.parent.right) {
                this.parent.right = node;
            }

            if (node) {
                node.parent = this.parent;
            }
        }
        else {
            if (node) {
                this.key = node.key;
                this.value = node.value;
                this.left = node.left;
                this.right = node.right;
            }
            else {
                this.key = null;
                this.value = null;
                this.left = null;
                this.right = null;
            }
        }
    }

    _findMin() {
        if (!this.left) {
            return this;
        }
        return this.left._findMin();
    }
}

function main() {
    const BST = new BinarySearchTree();
    const inserts = [3, 1, 4, 6, 9, 2, 5, 7];
    inserts.forEach(element => BST.insert(element));
    //const strings = ['E', 'A', 'S', 'Y', 'Q', 'U', 'E', 'S', 'T', 'I', 'O', 'N'];
    //strings.forEach(element => BST.insert(element));
    return BST;
  }

main();

//4. What does this program do?
//Without running this code in your code editor, explain what the following program does. Show with an example the result of executing this program. 
//What is the runtime of this algorithm?

function tree(t){
    if(!t){
        return 0;
    }
    return tree(t.left) + t.value + tree(t.right)
}
//This will check to see if there is a tree. If not it will return 0, but if there is, it will add the left value, parent value, and right value.
//This would be O(1), if there is no tree, or just a root.
//This one would be O(n) because it is not an even tree.

const sumTree = main();
//3, 1, 4, 6, 9, 2, 5, 7 => expect 37

function tree(t) {
    if (!t) {
        return 0;
    }
    return tree(t.left) + t.key + tree(t.right);
}
    console.log(sumTree);
    console.log(tree(sumTree));

//5. Height of a BST
//Write an algorithm to find the height of a binary search tree. What is the time complexity of your algorithm?

function treeHeight(tree) {
    if (!tree) {
        return 0;
    }
    if (!tree.left && !tree.right) {
        return 1;
    }
    let height = 0;
    if (tree.right) {
        let rightHeight = 1 + treeHeight(tree.right);
        if (rightHeight > height) height = rightHeight;
    }
    if (tree.left) {
        let leftHeight = 1 + treeHeight(tree.left);
        if (leftHeight > height) height = leftHeight;
    }
    return height;
}

console.log(treeHeight(main()));

//Time complexity of this algorithm is O(1) with an empty tree, or just a root. It is O(n) because it is not an even tree.

//6. Is it a BST?
//Write an algorithm to check whether an arbitrary binary tree is a binary search tree, assuming the tree does not contain duplicates.

function isItBSTree(tree) {
    if (!tree) {
        return false;
    }
    if (tree.right) {
      if (tree.right.key > tree.key) {
        isItBSTree(tree.right);
      } else {
        return false;
      }
    }
  
    if (tree.left) {
      if (tree.left.key < tree.key) {
        isItBSTree(tree.left);
      } else {
        return false;
      }
    }
    return true;
  }

  console.log(isItBSTree(main()));

//Time complexity of this algorithm is O(1) with an empty tree, or just a root. It is O(n) because it is not an even tree.

//7. 3rd largest node
//Write an algorithm to find the 3rd largest node in a binary search tree.

function thirdLargest(tree) {
    const height = treeHeight(tree);
    if (height < 2) {
        return null;
    } else if (height < 3) {
        if (tree.left && tree.right) {
            return tree.left.value;
    }   else {
            return null;
    }
    } else if (height > 3) {
        return thirdLargest(tree.right);
    } else {
        return tree.key;
    }
}

console.log(thirdLargest(main()));

//Time complexity of this algorithm is O(1) with an empty tree, or just a root. It is O(n) because it is not an even tree.

function isBalanced(tree) {
    if (!tree) return false;
    if (!tree.right && !tree.left) return true;
    if (Math.abs(treeHeight(tree.right) - treeHeight(tree.left)) > 1)
      return false;
    return true;
  }
  
    console.log(isBalanced(main()));

function checkBST(arr1, arr2) {
    if (arr1.length !== arr2.length || arr1[0] !== arr2[0]) return false;
    if (arr1.length === 0 || arr2.length === 0) return true;
      
    const higher1 = [];
    const higher2 = [];
    const lower1 = [];
    const lower2 = [];
      
    for (let i = 1; i < arr1.length; i++) {
        if (arr1[i] > arr1[0]) {
            higher1.push(arr1[i]);
        } else {
            lower1.push(arr1[i]);
        }
    }
      
    for (let i = 1; i < arr2.length; i++) {
        if (arr2[i] > arr2[0]) {
            higher2.push(arr2[i]);
        } else {
            lower2.push(arr2[i]);
        }
    }
      
    return (
        checkBST(higher1, higher2) && checkBST(lower1, lower2)
        );
    }
      
    const arr1 = [3, 5, 4, 6, 1, 0, 2];
    const arr2 = [3, 1, 5, 2, 4, 6, 0];
    console.log(checkBST(arr1, arr2));