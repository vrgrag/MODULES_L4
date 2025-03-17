const bcrypt = require('bcrypt');

const passwords = [
  'L4_modules', 'L4_modules', 'L4_modules',
  'L4_modules', 'L4_modules', 'L4_modules',
  'L4_modules', 'L4_modules', 'L4_modules',
  'L4_modules', 'L4_modules', 'L4_modules',
  'L4_modules'
];
const saltRounds = 10;

async function hashPasswords(passwords) {
  const hashedPasswords = [];
for (let i = 0; i < passwords.length; i++) {
    const password = passwords[i];
    const label = `Password ${i + 1}`;
console.time(label);
const salt = await bcrypt.genSalt(saltRounds);
const hash = await bcrypt.hash(password, salt);
console.timeEnd(label);
hashedPasswords.push(hash);
  }

  return hashedPasswords;
}

async function logHashedPasswords(hashedPasswords) {
  hashedPasswords.forEach((hash, index) => {
    console.log(`Hashed Password ${index + 1}: ${hash}`);
  });
}
hashPasswords(passwords).then((hashedPasswords) => {
  logHashedPasswords(hashedPasswords);

});
