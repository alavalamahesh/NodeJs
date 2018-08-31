const momentJs = require('moment');
const semverjs = require('semver');
const day =momentJs().format('dddd');
console.log(day);

 //return package version bcz of correct syntax
console.log(semverjs.valid('1.0.0'));
console.log(semverjs.valid('1.0.0-beta.10'));
console.log(semverjs.valid('1.0.0-beta1'));

//return null bcz invalid
console.log(semverjs.valid('1.0.0beta1'));
console.log(semverjs.valid('15.0'));  


console.log(semverjs.gt('1.2.3','4.3.2'));
console.log(semverjs.gt('1.2.3','1.2.2'));

console.log(semverjs.coerce("V3"));
console.log(semverjs.coerce("V3").raw);

const range = semverjs.Range('^2.22.2')
console.log(range);

console.log(semverjs.satisfies('2.23.2',range));
console.log(semverjs.satisfies('3.23.2',range));
console.log(semverjs.inc("1.4.3","patch"));
console.log(semverjs.inc("1.4.3","minor"));
console.log(semverjs.inc("1.4.3","major"));
console.log(semverjs.parse("1.4.3-alpha.10"));