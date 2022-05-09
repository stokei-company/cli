import { messagePatternName } from '@stokei/shared';

const baseAccountPatternName = 'accounts';
const baseAccessPatternName = 'accesses';

export const servicePatternNames = {
  accounts: {
    findById: messagePatternName(baseAccountPatternName, 'findById')
  },
  accesses: {
    findById: messagePatternName(baseAccessPatternName, 'findById')
  }
};
