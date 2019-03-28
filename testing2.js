async function f1() {
  let p = new Promise(resolve => {
    setTimeout(() => {
      resolve('f1');
    }, 2000);
  });

  let result;
  result = await p;
  console.log(result);
}

function f2() {
  console.log('sync func f2');
}


f1();

setTimeout(() => {
  console.log('set timeout');
}, 2000);

f2();

// 2:32:00