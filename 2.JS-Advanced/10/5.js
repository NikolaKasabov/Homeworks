(function () {
  String.prototype.ensureStart = function (str) {
    if (this.startsWith(str)) {
      return this.slice(0);
    }

    return str + this;
  };

  String.prototype.ensureEnd = function (str) {
    if (this.endsWith(str)) {
      return this.slice(0);
    }

    return this + str;
  };

  String.prototype.isEmpty = function () {
    if (this.length === 0) {
      return true;
    }

    return false;
  };

  String.prototype.truncate = function (n) {
    if (this.length <= n) {
      return this.slice(0);
    }

    if (n < 4) {
      return '.'.repeat(n);
    }

    if (!this.includes(' ')) {
      return this.slice(0, n - 3) + '...';
    }

    if (this.length > n && this.includes(' ')) {
      let currentString = this;
      while (currentString.length + 3 > n) {
        currentString = currentString.split(' ').slice(0, -1).join(' ');
      }

      currentString += '...';
      return currentString;
    }
  };

  String.format = function (string, ...params) {
    let result = string;
    for (const index in params) {
      result = result.replace(`{${index}}`, params[index]);
    }

    return result;
  }
})();

var testString = 'the quick brown fox jumps over the lazy dog';
 
console.log(testString.ensureStart('the '));
