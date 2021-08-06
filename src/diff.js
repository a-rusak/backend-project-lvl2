/* eslint-disable no-param-reassign */
import compareMapping from './compareMapping.js';

const {
  IN_SECOND_ONLY, EQUAL, IN_FIRST_ONLY, DIFF_VALUE, DIFF_VALUE_SECOND,
} = compareMapping;

const isPrimitive = (v) => typeof v === 'string'
  || typeof v === 'number'
  || typeof v === 'boolean'
  || v === null;

const prepareObj = (obj) => Object
  .entries(obj)
  .reduce((acc, [key, value]) => ({
    ...acc,
    [key]: {
      $body: isPrimitive(value) ? value : prepareObj(value),
      $type: null,
    },
  }), {});

const toEntriesDeep = (arr) => arr.map(([key, value]) => {
  if (!isPrimitive(value.$body)) {
    return [key, {
      ...value,
      $body: toEntriesDeep(Object.entries(value.$body)),
    }];
  }
  if (value.$bodySecond !== undefined && !isPrimitive(value.$bodySecond)) {
    return [key, {
      ...value,
      $bodySecond: toEntriesDeep(Object.entries(value.$bodySecond)),
    }];
  }
  return [key, value];
});

const flatDeep = (arr) => arr.reduce((acc, [key, value]) => {
/*
  [
    "setting3",
    {
      "$type": "diffValue",
      "$depth": 2,
      "$path": [
        "common",
        "setting3"
      ]
    }
  ],
  [
    "key",
    {
      "$type": null,
      "$depth": 3,
      "$path": [
        "common",
        "setting3",
        "key"
      ],
      "$body": "value"
    }
  ],
  [
    "setting3",
    {
      "$type": "diffValue",
      "$depth": 2,
      "$path": [
        "common",
        "setting3"
      ],
      "$body": true
    }
  ],
*/

  const records = [];
  const recordsToFlat = [];
  if (isPrimitive(value.$body)) {
    records.push([key, {
      $type: value.$type,
      $depth: value.$depth,
      $path: value.$path,
      $body: value.$body,
    }]);
  } else {
    recordsToFlat.push([key, {
      $type: value.$type,
      $depth: value.$depth,
      $path: value.$path,
    }],
    ...flatDeep(value.$body));
  }
  if (value.$bodySecond !== undefined) {
    if (isPrimitive(value.$bodySecond)) {
      records.push([key, {
        $type: DIFF_VALUE_SECOND,
        $depth: value.$depth,
        $path: value.$path,
        $body: value.$bodySecond,
      }]);
    } else {
      recordsToFlat.push([key, {
        $type: value.$type,
        $depth: value.$depth,
        $path: value.$path,
      }],
      ...flatDeep(value.$bodySecond));
    }
  }
  return [
    ...acc,
    ...recordsToFlat,
    ...records,
  ];
}, []);

const getEntries = (o1, o2) => {
  const n1 = prepareObj(o1);
  const n2 = prepareObj(o2);

  const iter1 = (obj1, obj2) => {
    Object.entries(obj1).forEach(([key, v]) => {
      const body1 = v.$body;
      Object.entries(obj2).forEach(([key2, v2]) => {
        if (!Object.keys(obj1).includes(key2)) {
          v2.$type = IN_SECOND_ONLY;
          obj1[key2] = v2;
        }
      });
      if (isPrimitive(body1)) {
        if (obj2[key] === undefined) {
          v.$type = IN_FIRST_ONLY;
        } else if (obj2[key].$body === body1) {
          v.$type = EQUAL;
        } else {
          v.$type = DIFF_VALUE;
          v.$bodySecond = obj2[key].$body;
        }
      } else if (obj2[key] === undefined) {
        v.$type = IN_FIRST_ONLY;
      } else {
        const body2 = obj2[key].$body;
        if (isPrimitive(body2)) {
          v.$type = DIFF_VALUE;
          v.$bodySecond = obj2[key].$body;
        } else {
          iter1(body1, body2);
        }
      }
    });
  };
  iter1(n1, n2);

  // console.log(JSON.stringify(n1, null, 2));

  const addDepth = (arr, depth = 1) => {
    arr.forEach((value) => {
      value.$depth = depth;
      if (!isPrimitive(value.$body)) {
        addDepth(Object.values(value.$body), depth + 1);
      }
      if (value.$bodySecond !== undefined && !isPrimitive(value.$bodySecond)) {
        addDepth(Object.values(value.$bodySecond), depth + 1);
      }
    });
  };
  addDepth(Object.values(n1));

  // console.log(JSON.stringify(n1, null, 2));

  const addPath = (arr, path = []) => {
    arr.forEach(([key, value]) => {
      value.$path = [...path, key];
      if (!isPrimitive(value.$body)) {
        addPath(Object.entries(value.$body), value.$path);
      }
      if (value.$bodySecond !== undefined && !isPrimitive(value.$bodySecond)) {
        addPath(Object.entries(value.$bodySecond), value.$path);
      }
    });
  };
  addPath(Object.entries(n1));

  // console.log(JSON.stringify(n1, null, 2));

  const entries = toEntriesDeep(Object.entries(n1));

  const sortDeep = (arr) => {
    arr.sort((a, b) => {
      const nameA = a[0].toUpperCase(); // ignore upper and lowercase
      const nameB = b[0].toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    arr.forEach(([, value]) => {
      if (!isPrimitive(value.$body)) {
        sortDeep(value.$body);
      }
    });
  };

  sortDeep(entries);

  return entries;
};

function getDiff(o1, o2) {
  const entries = getEntries(o1, o2);
  const flatEntries = flatDeep(entries);

  console.log(JSON.stringify(flatEntries, null, 2));

  return {
    entries,
    flatEntries,
  };
}

export default getDiff;
