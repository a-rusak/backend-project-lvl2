const _ = require('lodash');

const CompareEnum = {
  EQUAL: 'equal',
  IN_FIRST_ONLY: 'inFirstOnly',
  IN_SECOND_ONLY: 'inSecondOnly',
  DIFF_VALUE_FIRST: 'diffValueFirst',
  DIFF_VALUE_SECOND: 'diffValueSecond',
}

const prepareObj = (obj) => Object
  .entries(obj)
  .reduce((acc, [key, value]) => ({
    ...acc,
    [key]: { value, state: null },
  }), {});

exports.getDiff = (obj1, obj2) => {
  const n1 = prepareObj(obj1);
  const n2 = prepareObj(obj2);
  Object.entries(n1).forEach(([key, v]) => {
    if (n2[key] === undefined) {
      v.state = CompareEnum.IN_FIRST_ONLY;
    } else {
      if (n2[key].value === v.value) {
        v.state = CompareEnum.EQUAL;
        n2[key].state = CompareEnum.EQUAL;
      } else {
        v.state = CompareEnum.DIFF_VALUE_FIRST;
        n2[key].state = CompareEnum.DIFF_VALUE_SECOND;
      }
    }
  });
  const diffArr = Object.entries(n1);
  Object.entries(n2).forEach(([key, v]) => {
    if (v.state === null) {
      diffArr.push([key, {
        value: v.value,
        state: CompareEnum.IN_SECOND_ONLY,
      }]);
    }
    if (v.state === CompareEnum.DIFF_VALUE_SECOND) {
      diffArr.push([key, {
        value: v.value,
        state: CompareEnum.DIFF_VALUE_SECOND
      }]);
    }
  });
  return _.sortBy(diffArr, [0]);
}
