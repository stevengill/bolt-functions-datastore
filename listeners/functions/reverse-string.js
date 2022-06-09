const crypto = require('crypto');

const reverseString = async ({ event, success, error, client }) => {
  const { stringToReverse } = event.inputs;
  const reversed = stringToReverse.split('').reverse().join('');
  try {
    const primarykey = crypto.randomUUID();
    await client.apiCall("apps.datastore.put", { 
      datastore: "reversals",
      item: {
        id: primarykey,
        original_string: stringToReverse,
        reversed_string: reversed,
      },
    });
    console.log(`wrote to the db`);
    await success({ reverseString: reversed });
  } catch (err) {
    console.log(err);
    // call error callback with function outputs
    await error('There was an issue', err);
  }
};

module.exports = { reverseString };
