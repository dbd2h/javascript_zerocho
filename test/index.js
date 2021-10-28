function delay(n) {
  return new Promise(function (resolve) {
    setTimeout(resolve, n * 1000);
  });
}

async function myAsyncFunction() {
  //Do what you want here
  console.log("Before the delay");

  await delay(5);

  console.log("After the delay");
  //Do what you want here too
}

myAsyncFunction();
