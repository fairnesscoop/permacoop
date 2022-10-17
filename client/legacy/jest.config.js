module.exports = {
  transform: {
    '^.+\\.svelte$': 'svelte-jester',
    '^.+\\.js$': 'babel-jest'
  },
  moduleFileExtensions: ['js', 'svelte'],
  setupFilesAfterEnv: [
    '<rootDir>/src/i18n.js'
  ]
};
