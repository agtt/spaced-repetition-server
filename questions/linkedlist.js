const { Question } = require("./models");
const { allQuestions } = require("./questions");

class _Node {
  constructor(value, next) {
    (this.value = value), (this.next = next);
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }
  insertFirst(item) {
    this.head = new _Node(item, this.head);
  }
  insertBefore(item, currentNode) {
    let found = this.find(currentNode);
    let temp = this.head;
    if (found == temp) {
      this.insertFirst(item);
    } else {
      while (temp.next !== found) {
        //keep moving until you find the node we want to insert before
        temp = temp.next;
      } //once currentnode is found, next now refers to new node
      temp.next = new _Node(item, found);
    }
  }

  insertAfter(item, currentNode) {
    let found = this.find(currentNode);
    let temp = this.head;
    if (found.next == null) {
      this.insertLast(item);
    } else {
      while (temp.next !== found.next) {
        //keep moving until you find the node we want
        temp = temp.next;
      } //once currentnode is found, next now refers to new node
      temp.next = new _Node(item, temp.next);
    }
  }

  insertAt(item, position) {
    let temp = this.head;
    let count = 1;
    while (temp.next !== null) {
      count++;
      if (count === position) {
        return (temp.next = new _Node(item, temp.next));
      }
      temp = temp.next;
    }
    if (temp.next == null) {
      //if added to end
      this.insertLast(item);
    }
    if (position === 0) {
      //if added at start
      this.insertFirst(item);
    }
  }

  insertLast(item) {
    if (this.head === null) {
      this.insertFirst(item);
    } else {
      let temp = this.head;
      while (temp.next !== null) {
        temp = temp.next;
      }
      temp.next = new _Node(item, null);
    }
  }
  remove(item) {
    if (!this.head) {
      return null;
    }
    if (this.head === item) {
      this.head = this.head.next;
      return;
    }
    let currentNode = this.head;

    let prevNode = this.head;

    while (currentNode !== null && currentNode.value !== item) {
      prevNode = currentNode;
      currentNode = currentNode.next;
    }
    if (currentNode === null) {
      console.log("item not found");
      return;
    }
    prevNode.next = currentNode.next;
  }
  find(item) {
    let currentNode = this.head;
    if (!this.head) {
      return null;
    }
    while (currentNode.value !== item) {
      if (currentNode.next === null) {
        return null;
      } else {
        currentNode = currentNode.next;
      }
    }
    return currentNode;
  }
}

function main() {
  let questions = new LinkedList();
  allQuestions.forEach(item => {
    questions.insertFirst(item);
  });
  return questions;
}

// main("k");

function getHead() {
  console.log(questions.head);
  return questions.head;
}

function answers(boolean, current) {
  let headValue = current.head.value;
  if (boolean === true) {
    let temp = current.head;
    current.head.value.score++;
    current.head.value.attempted++;
    while (temp.next !== null) {
      temp.value = temp.next.value;
      temp = temp.next;
    }
    temp.value = headValue;
    return current;
  } else if (boolean === false) {
    let temp = current.head;
    current.head.value.attempted++
    let count = 1;
    while (temp.next !== null) {
      count++;
      console.log('temp value:',temp.value);
      if (count === 6) {
         temp.value = headValue;
         return current;
      }
      temp.value = temp.next.value;
      temp = temp.next;
    }
    return current;
  } else {
    return "error. invalid input";
  }
}

function display(sll) {
  // console.log(sll.head)
  let currNode = sll.head;
  console.log(sll.head);
  while (currNode.next !== null) {
    console.log(currNode.next);
    currNode = currNode.next;
  }
}

module.exports = { main, getHead, answers };
