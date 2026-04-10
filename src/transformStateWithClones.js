'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = Object.assign({}, state);

  for (const action of actions) {
    if (action.type === 'addProperties') {
      const copy = Object.assign({}, currentState, action.extraData);

      currentState = copy;
      result.push(currentState);
    }

    if (action.type === 'removeProperties') {
      const copy = Object.assign({}, currentState);

      for (const key of action.keysToRemove) {
        delete copy[key];
      }
      currentState = copy;
      result.push(currentState);
    }

    if (action.type === 'clear') {
      currentState = {};
      result.push(currentState);
    }
  }

  return result;
}

module.exports = transformStateWithClones;
