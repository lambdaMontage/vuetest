/**
 *
 * Created By shihao 2017-09-12
 */
export function saveToLocal(id, key, value) {
  let seller = window.localStorage.__seller__;
  if (!seller) {
    seller = {};
    seller[id] = {};
  } else {
    seller = JSON.parse(seller);
    if (!seller[id]) {
      seller[id] = {};
    }
  }
  seller[id][key] = value;
  window.localStorage.__seller__ = JSON.stringify(seller);
}

export function loadFromLocal(id,key,value) {
  let seller = window.localStorage.__seller__;
  if (!seller){
    return value;
  }
  seller = JSON.parse(seller)[id];
  if(!seller) {
    return value;
  }
  let ret = seller[key];
  return ret || value;
}
