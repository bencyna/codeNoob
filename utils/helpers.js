module.exports = {
  format_date: (date) => {
    return `${new Date(date).getMonth() + 1}/${new Date(
      date
    ).getDate()}/${new Date(date).getFullYear()}`;
  },
  format_plural: (word, amount) => {
    if (amount !== 1) {
      return `${word}s`;
    }
    return word;
  },
  ifeq: function (a, b, options) {
    if (a == b) {
      return options.fn(this);
    }
    return options.inverse(this);
  },
  unlesseq: function (a, b, options) {
    if (a !== b) {
      return options.fn(this);
    }
    return options.inverse(this);
  },

  limit: function (arr, limit) {
    if (!Array.isArray(arr)) {
      return [];
    }
    return arr.slice(0, limit);
  },
  log: function (something) {
    console.log(something);
  },
};
