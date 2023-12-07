String.prototype.replaceMultiple = function(searchValues, replaceValues){

  if(searchValues.length !== replaceValues.length){
    throw new Error("Error: The number of searchValues must be equal to the number of replaceValues");
  }

  return searchValues.reduce((acc, searchValue, index) =>
    acc.replaceAll(searchValue, replaceValues[index]), this.valueOf())
}