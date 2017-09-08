/**
 * url 解析函数
 * @example ?id=234&a=b
 * @returns object {{id:234,a:b}}
 */
export function urlParse () {
  let url = window.location.search;
  let reg = /[?&][^?&]+=[^?&]+/g;
  let obj = {};
  let add = url.match(reg);

  if (add){
      add.forEach((item) =>{
      let tempAdd = item.substring(1).split('=');
      let key = decodeURIComponent(tempAdd[0]);
      let value = decodeURIComponent(tempAdd[1]);
      obj[key] = value;
      });
  }
  return obj;
};
