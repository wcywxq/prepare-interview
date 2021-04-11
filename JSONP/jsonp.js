// script 标签不受同源策略约束
// 优点：兼容性好
// 缺点：只能用作 GET
const jsonp = ({ url, params, callback }) => {
  const generateUrl = () => {
    let dataSrc = "";
    for (let key in params) {
      if (params.hasOwnProperty(key)) {
        dataSrc += `${key}=${params[key]}&`;
      }
    }
    dataSrc += `callback=${callback}`;
    return `${url}?${dataSrc}`;
  };
  return new Promise((resolve, reject) => {
    const scriptEle = document.createElement("script");
    scriptEle.src = generateUrl();
    document.body.appendChild(scriptEle);
    window[callback] = data => {
      resolve(data);
      document.removeChild(scriptEle);
    };
  });
};
