# Web Task 

Running code just with an HTTP call. Serverless applications.  
[webtask.io](https://webtask.io)

### Prerequisites
node.js runningn in a unix like environment

### Installation
```
$ npm i -g wt-cli
$ wt init
```

### Usage

#### Create a buenas.js script file
```js
module.exports = function (done) {
  done(null, 'Buenas buenas!!!');
}
```

#### Push the tasks to the WT platform. The command will return an URL
```
$ wt create buenas.js
```

### Hit the URL using the curl command or your web browser
```
https://webtask.it.auth0.com/api/run/wt-info-enve_io-0/buenas?webtask_no_cache=1
```

### Debug
```
$ wt logs
```




