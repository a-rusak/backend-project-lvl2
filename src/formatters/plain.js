import compareMapping from '../compareMapping.js';

const {
  IN_SECOND_ONLY, EQUAL, IN_FIRST_ONLY, DIFF_VALUE, DIFF_VALUE_SECOND,
} = compareMapping;

const plain = ({ flatEntries }) => {
  const textMapping = {
    [IN_SECOND_ONLY]: (v) => `was added with value: ${v}`,
    [IN_FIRST_ONLY]: () => 'was removed',
    [DIFF_VALUE]: (a, b) => `was updated. From ${a} to ${b}`,
  };

  const getTextValue = (v) => {
    switch (true) {
      case v === undefined:
        return '[complex value]';
      case typeof v === 'string':
        return `'${v}'`;
      default:
        return v;
    }
  };

  const strings = flatEntries.map(([, { $body, $type, $path }], idx) => {
    if ($type === EQUAL || $type === DIFF_VALUE_SECOND || $type === null) return '';
    const offset = $body === undefined ? 2 : 1;
    const nextValue = $type === DIFF_VALUE ? flatEntries[idx + offset][1] : null;

    return `Property '${$path.join('.')}' ${textMapping[$type](getTextValue($body), getTextValue(nextValue && nextValue.$body))}\n`;
  }, []);
  return `${strings.join('')}`;
};

export default plain;
