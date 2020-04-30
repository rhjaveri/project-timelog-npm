const parse = require('csv-parse');
const fs = require('fs');
const date = require('date-and-time');
const fileName = './status.json';
const statusFile = require("./status.json");

function format(totalSeconds) {
  totalSeconds = parseInt(totalSeconds);
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;
  return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
}



// list the history of the user, including the amount of time spent 
module.exports.history = () => {
  console.log("directory");
  console.log(__dirname + '/logs.csv');

  var parser = parse({delimiter: ','}, function(err, data) {
    data.forEach(function(line) {
      console.log(`start: ${line[0]}, end: ${line[1]}, duration: ${format(line[2])}`);
    })
  });

  fs.createReadStream(__dirname + '/logs.csv')
  .pipe(parser);
};

module.exports.login = () => {
    console.log("in login");
    console.log(statusFile);
    if (statusFile.loggedIn === true) {
        console.log("you are alredy logged in");
    }
        else {
            // log them in and log the login date
            let now = new Date();
            now = date.format(now, 'YYYY/MM/DD HH:mm:ss'); 
            statusFile.loggedIn = true;
            statusFile.login = now;
            fs.writeFile(__dirname + '/status.json', JSON.stringify(statusFile), function writeJSON(err) {
                if (err) return console.log(err);
                console.log(JSON.stringify(statusFile));
                console.log('writing to ' + fileName);
              });
            console.log(statusFile);
        };
}

module.exports.logout = () => {
    // check if the state is currently logged in 
    console.log("in logout");
    console.log(statusFile);
    if (statusFile.loggedIn === false) {
        console.log("you are not logged in");
    }
        else {
            // write to the logs.csv and log out
            let start = statusFile.login;
            start = date.parse(start, 'YYYY/MM/DD HH:mm:ss'); 
            console.log(start);
            let end = new Date();
            console.log(end);
            var seconds = (end.getTime() - start.getTime()) / 1000;
            fs.appendFile(__dirname + '/logs.csv', `${start}, ${end}, ${seconds} seconds \n`, function (err) {
                if (err) throw err;
                console.log('Saved!');
              });

            // log out status
            statusFile.loggedIn = false;
            statusFile.login = false;
            fs.writeFile(__dirname + '/status.json', JSON.stringify(statusFile), function writeJSON(err) {
            if (err) return console.log(err);
            console.log(JSON.stringify(statusFile));
                console.log('writing to ' + fileName);
            });

        };
}
