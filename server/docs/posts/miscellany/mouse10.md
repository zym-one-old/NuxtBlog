> 一个朋友拿出的编程题，当时用javascript写的，写出来能用但感觉很low...太麻烦了，肯定有那种用啥高级玩意和算法几行代码就搞定的。唉~还是要不断学习啊

## 题目

猫让10只老鼠站成一圈，它决定每数到第n只老鼠就吃掉，请输出最后的老鼠的位置

```javascript
let mouse = [];
let start_index = 0;

const n = 3;
console.log("n="+n)
for (let i = 0; i < 10; i++) {
  mouse.push({
    index: i
  }); 
}

let next_remove_index = mouse => {
  let count = 0;
  let remove_index = null;
  let start = false;
  let get = () => {
    mouse.forEach(e => {
      if (!start) {
        start = start_index === e.index;
      }
      if (start) {
        if (count < n) {
          count++;
        }
        if (count === n && remove_index === null) {
          remove_index = e.index;
        }
      }
    });
    if (remove_index != null && count === n) {
      return remove_index;
    } else {
      return get();
    }
  };
  return get();
};

while (mouse.length != 1) {
  let remove_index = next_remove_index(mouse);
  mouse = mouse.filter(e => {
    return e.index != remove_index;
  });

  // 得到下次迭代开始的位置
  let temp = mouse.filter(e => {
    return e.index > remove_index;
  });
  if (temp.length === 0) {
    start_index = mouse[0].index;
  } else {
    start_index = temp[0].index;
  }
  // 输出当前的情况
  let str=""
  mouse.forEach(e=>{
    str += e.index +" "
  })
  console.log(str+"-"+remove_index)
}

const result = mouse[0].index

console.log(result)
```

