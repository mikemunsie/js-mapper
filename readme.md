<h1>js-mapper</h1>

Compares two objects (or arrays) and creates a new object (or array) based on the matching keys and types. If a property does not match up, the property will not be included in the new object. This helps to keep models consistent and remove extra data that isn't being used.

<h2>Usage</h2>
The mapper routine consists of two parameters, where ```data``` is your custom object and ```objToCheck``` is what the data will be compared against. The ```objToCheck``` is an array or object that is defined using types. These types can be any javascript primitive type (see: https://developer.mozilla.org/en-US/docs/Glossary/Primitive), and can nest as deep as you would like.

<h3>Example</h3>

```javascript
var Mapper = require("mapper");

var Oreo = {
  doubleStuff: Boolean,
  hasCreamFilling: Boolean,
  cookiesLeft: Number
};

var Food = {
  name: String,
  calories: Number,
  oreo: Oreo
};

var User = {
  name: String,
  age: Number,
  food: [Food]
};

var data = {
  name: "Mike",
  age: 28,
  // "extraData" will be ignored since it doesn't exist we are comparing to
  extraData: "You will never see me",
  food: [
    {
      name: "Cheesecake",
      calories: 1000
    },
    {
      name: "Oreo",
      calories: 100,
      oreo: {
        // "doubleStuff" will be ignored since this is a string and not a boolean
        doubleStuff: "true", 
        hasCreamFilling: true
      }
    }
  ]
};

console.log(Mapper(data, User));
```
Will return:

```json
{
  "name": "Mike",
  "age": 28,
  "food": [
    {
      "name": "Cheesecake",
      "calories": 1000
    },
    {
      "name": "Oreo",
      "calories": 100,
      "oreo": {
        "hasCreamFilling": true
      }
    }
  ]
}
```

<h2>Why?</h2>
Because we care about making sure the right data gets passed around. This becomes especially useful when you are writing models that can be used on both the front and back end of a NodeJS application.

And honestly it's just fun to write something like this! Why not?!