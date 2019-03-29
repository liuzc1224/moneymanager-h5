import types from './ActionType';

export function doAction(name, param) {
  return { type: types[name], param };
}