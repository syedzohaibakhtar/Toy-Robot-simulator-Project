/**
 * To show an information message to the console
 *
 * @param {string} message - Message to displayed in console
 */
const information = async message => {
    console.log(message);
};
  
/**
 * To show a success message to the console
 *
 * @param {string} message - Message to displayed in console
 */
const success = async message => {
    console.log(message);
};
  
/**
 * To show an error message to the console
 *
 * @param {string} message - Message to displayed in console
 */
const error = async message => {
    console.log(message);
};

module.exports = { information, success, error };
  