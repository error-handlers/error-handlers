module.exports = {
  name: 'sentry',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/sentry',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
