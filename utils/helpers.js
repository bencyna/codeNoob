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
  ifeq: (a, b, options) => {
    if (a == b) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  },

  ifnoteq: (a, b, options) => {
    if (a != b) {
      return options.fn(this);
    }
    return options.inverse(this);
  },
  ifEquals: (arg1, arg2, options) => {
    return arg1 == arg2 ? options.fn(this) : options.inverse(this);
  },
};
