/* eslint-env node */
module.exports = {
  scenarios: [
    {
      name: 'default',
      dependencies: { }
    },
    {
      name: 'ember-1.13.X',
      bower: {
        dependencies: { 'ember': 'components/ember#~1.13.0' },
        resolutions: { 'ember': '~1.13.0' }
      },
      npm: { devDependencies: { 'ember-source': null } }
    },
    {
      name: 'ember-lts-2.4',
      bower: {
        dependencies: { 'ember': 'components/ember#lts-2-4' },
        resolutions: { 'ember': 'lts-2-4' }
      },
      npm: { devDependencies: { 'ember-source': null } }
    },
    {
      name: 'ember-lts-2.8',
      bower: {
        dependencies: { 'ember': 'components/ember#lts-2-8' },
        resolutions: { 'ember': 'lts-2-8' }
      },
      npm: { devDependencies: { 'ember-source': null } }
    },
    {
      name: 'ember-2.12.X',
      dependencies: { 'ember-source': 'ember#~2.12.0' },
      resolutions:  { 'ember-source': '~2.12.0' }
    },
    {
      name: 'ember-release',
      dependencies: { 'ember-source': 'ember#release' },
      resolutions:  { 'ember-source': 'release' }
    },
    {
      name: 'ember-beta',
      dependencies: { 'ember-source': 'ember#beta' },
      resolutions:  { 'ember-source': 'beta' }
    },
    {
      name: 'ember-canary',
      dependencies: { 'ember-source': 'ember#canary' },
      resolutions:  { 'ember-source': 'canary' }
    }
  ]
};