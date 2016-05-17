module.exports = {
  scenarios: [
    {
      name: 'default',
      dependencies: { }
    },
    {
      name: 'ember-1.13.X',
      dependencies: {
        'ember': '~1.13.0'
      }
    },
    {
      name: 'ember-2.0.X',
      dependencies: {
        'ember': '~2.0.0'
      }
    },
    {
      name: 'ember-2.1.X',
      dependencies: {
        'ember': '~2.1.0'
      }
    },
    {
      name: 'ember-2.2.X',
      dependencies: {
        'ember': '~2.2.0'
      }
    },
    {
      name: 'ember-2.3.X',
      dependencies: {
        'ember': '~2.3.0'
      }
    },
    {
      name: 'ember-2.4.X',
      dependencies: {
        'ember': '~2.4.0'
      }
    },
    {
      name: 'ember-2.5.X',
      dependencies: {
        'ember': '~2.5.0'
      }
    },
    {
      name: 'ember-release',
      dependencies: {
        'ember': 'components/ember#release'
      },
      resolutions: {
        'ember': 'release'
      }
    },
    {
      name: 'ember-beta',
      dependencies: {
        'ember': 'components/ember#beta'
      },
      resolutions: {
        'ember': 'beta'
      }
    },
    {
      name: 'ember-canary',
      dependencies: {
        'ember': 'components/ember#canary'
      },
      resolutions: {
        'ember': 'canary'
      }
    }
  ]
};
