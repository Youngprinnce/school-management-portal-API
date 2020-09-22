const uniqueToken = () => {
  length = 5;
  var str = '';
  for (var i = 1; i < length + 1; i = i + 5) {
    str += Math.random().toString().substr(2, 10);
  }
  return str.substr(0, length);
};

module.exports = uniqueToken;
