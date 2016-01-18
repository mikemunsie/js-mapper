function Mapper(data, objToMapTo) {

  return iterateKeys(data, objToMapTo);

  /**
   * Checks the data against the object were checking and will return
   * @param  {obj} data       
   * @param  {obj} objToCheck
   * @return {obj}
   */
  function checkAndMatchType(data, objToCheck) {
    var value = undefined;
    if (typeof(objToCheck) == "function") {
      value = typeof(objToCheck()) === typeof(data) ? data : value;
    }
    else {
      value = typeof(objToCheck) === typeof(data) ? data : value;
    }
    return value;
  }

  /**
   * Iterate through the keys of an object
   * @param  {obj} data
   * @param  {obj} objToMapTo
   * @param  {obj} newObj
   * @return {obj}
   */
  function iterateKeys(data, objToMapTo, newObj) {
    var checkAndMatchTypeResult;
    for (var key in objToMapTo) {

      // Define the new object or array that we are building
      if (newObj === undefined) {
        if (Array.isArray(objToMapTo)) { 
          newObj = [];
          for (var itemIndex in data) {
            newObj.push(iterateKeys(data[itemIndex], objToMapTo[0]))
          }
        }
        else newObj = {};
      }

      // If we can't find the property, let's get out and continue
      if (data[key] === undefined) continue;

      // If we are checking against an array, let's iterate through and check the items
      if (Array.isArray(objToMapTo[key])) {

        // If the array doesn't exist, let's also continue
        if (!Array.isArray(data[key])) continue;

        newObj[key] = [];
        for (var itemIndex in data[key]) {
          newObj[key].push(iterateKeys(data[key][itemIndex], objToMapTo[key][0]))
        }
      }

      // We have an object, let's get the matching keys and their values
      else {
        if (typeof(objToMapTo[key]) === "object") {
          newObj[key] = {};
          iterateKeys(data[key], objToMapTo[key], newObj[key]);
        } else {
          checkAndMatchTypeResult = checkAndMatchType(data[key], objToMapTo[key]);
          if (checkAndMatchTypeResult !== undefined) {
            newObj[key] = checkAndMatchTypeResult;
          }
        }
      }
    }
    return newObj;
  }
  
}