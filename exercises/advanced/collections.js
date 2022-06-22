const fs = require('fs');
var Promise = require('bluebird');

/**
 * Using Promise.all, write a function, combineFirstLineOfManyFiles, that:
 *    1. Reads each file at the path in the `filePaths` array
 *    2. Plucks the first line of each file
 *    3. Joins each first line into a new file
 *      - The lines should be in the same order with respect to the input array
 *      - i.e. the second line in the new file should be the first line of `filePaths[1]`
 *    4. Writes the new file to the file located at `writePath`
 */


var combineFirstLineOfManyFiles = function(filePaths, writePath) {
  // TODO

  var promiseArray = [];

    for (let file of filePaths) {
      let temp = fs.promises.readFile(file, 'utf8')
      promiseArray.push(temp)
    }
  return Promise.all(promiseArray)
      .then(promise => {
        let firstLines = [];
        for (let line of promise) {
          let firstLine = line.split('\n')[0]
          firstLines.push(firstLine);
        }
        return firstLines
      })
      .then((newValues) => {
          let newData = newValues.join('\n');
          fs.writeFile(writePath, newData, (err) => {
            if (err) {
              console.log('error', err)
            } else {
              console.log('written file')
            }
          })
      })


};

// Export these functions so we can unit test them
module.exports = {
  combineFirstLineOfManyFiles: combineFirstLineOfManyFiles
};
