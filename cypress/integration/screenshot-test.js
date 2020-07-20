var Eyes = require('eyes.images').Eyes;
const fs = require('fs');
const urls = require('../fixtures/example').componentsUrls;

var eyes = new Eyes();

eyes.setApiKey('Nls100t102uNgLhLpblVUdA3tP104MQQS9VUYgHQ5tYOUuIxU110');

eyes.setHostingApp("Chrome");

eyes.setHostOS('MacOS latest');


async function forEachAsync(array, callback) {
  let i = 0;
  for (; i < array.length; i++) {
    await callback(array[i], i, array);
  }
}

const testResults = eyes.open("NG2-charts", "Charts comparison", {width: 1366, height: 768}).then(async function () {
  return forEachAsync(urls, async (url) => {
    try {
      const image = fs.readFileSync(`./cypress/screenshots/main-test.js/Charts screenshot -- ${url.replace('/','')}.png`);
      await eyes.checkImage(image, url);
    } catch (e) {
      console.log(e);
    }
  });
}).then(function () {
  return eyes.close();
});

testResults.then(function (results) {
  console.log("Results: ", JSON.stringify(results));
});
