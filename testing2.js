function printAfter2Sec() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('after 2 seconds');
      resolve();
    }, 2000);
  });
}

async function solve() {
  console.log(1);

  await printAfter2Sec();

  console.log(2);
}

solve();
