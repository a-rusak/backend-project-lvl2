const _ = require('lodash');

const { compareMapping } = require('./compareMapping');

const prepareObj = (obj) => Object
  .entries(obj)
  .reduce((acc, [key, value]) => ({
    ...acc,
    [key]: { value, state: null },
  }), {});

exports.getDiff = (obj1, obj2) => {
  const n1 = prepareObj(obj1);
  const n2 = prepareObj(obj2);
  Object.entries(n1).forEach(([key, va]) => {
    const v = va;
    if (n2[key] === undefined) {
      v.state = compareMapping.IN_FIRST_ONLY.name;
    } else if (n2[key].value === v.value) {
      v.state = compareMapping.EQUAL.name;
      n2[key].state = compareMapping.EQUAL.name;
    } else {
      v.state = compareMapping.DIFF_VALUE_FIRST.name;
      n2[key].state = compareMapping.DIFF_VALUE_SECOND.name;
    }
  });
  const diffArr = Object.entries(n1);
  Object.entries(n2).forEach(([key, v]) => {
    if (v.state === null) {
      diffArr.push([key, {
        value: v.value,
        state: compareMapping.IN_SECOND_ONLY.name,
      }]);
    }
    if (v.state === compareMapping.DIFF_VALUE_SECOND.name) {
      diffArr.push([key, {
        value: v.value,
        state: compareMapping.DIFF_VALUE_SECOND.name,
      }]);
    }
  });
  return _.sortBy(diffArr, [0]);
};
