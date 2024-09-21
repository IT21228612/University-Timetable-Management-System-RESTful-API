const crypto = require('crypto');

// Define the length of the secret key in bytes (256 bits)
const keyLengthBytes = 32;

// Generate random bytes using a CSPRNG
const randomBytes = crypto.randomBytes(keyLengthBytes);

// Encode the random bytes in Base64 format
const secretKey = randomBytes.toString('base64');

console.log('Generated Secret Key:', secretKey ,' key ends here' );
