function getParams(url) {
  const str = /.+\?(.+)$/.exec(url)[1];
  const arr = str.split("&");
  let obj = {};
  arr.forEach(item => {
    if (/=/.test(item)) {
      let [key, val] = item.split("=");
      val = decodeURIComponent(val);
      val = /^\d+$/.test(val) ? parseFloat(val) : val;

      if (obj.hasOwnProperty(key)) {
        obj[key] = [].concat(obj[key], val);
      } else if (typeof val === "string" && val.split(",").length > 1) {
        obj[key] = val.split(",");
      } else {
        obj[key] = val;
      }
    } else {
      obj[item] = true;
    }
  });
  return obj;
}

console.log(getParams("https://www.baidu.com?name=1&age=20&hobby=1,2,3&name=2&name=3"));
