import Mirage from 'ember-cli-mirage';

const animalNames = [
  'Frank', 'Dave', 'Chris', 'Leonard', 'Alex', 'George',
  'Harry', 'Jones', 'Killian', 'Ian', 'Ben', 'Edward'];

export default Mirage.Factory.extend({
  id(i) { return i; },
  name(i) {
    if (i < 12) { return animalNames[i]; }
    return `Animal${i}`;
  },
  type(i) {
    if (i % 2 === 0) { return 'cat'; }
    return 'dog';
  }
});
