export function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}


export function filteredObject(object, filterFunc) {
  const newObject = {};
  for(key of Object.keys(object)) {
    if(filterFunc(object[key]))
      newObject[key] = object[key];
  }
  return newObject;
}
