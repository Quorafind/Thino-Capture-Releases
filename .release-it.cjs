module.exports = {
  hooks: {
    'before:init': ['cd .. && pnpm run release:chrome'],
    'after:bump': [
      'node ./scripts/zip.mjs',
      'git add .',
    ],
    'after:release':
      'echo Successfully released plugin ${name} v${version} to ${repo.repository}.',
  },
  git: {
    pushArgs: '--follow-tags -o ci.skip',
    commitMessage: 'chore: release plugin v${version}',
    tagName: '${version}',
    tagAnnotation: 'Release Plugin v${version}',
    addUntrackedFiles: true,
  },
  plugins: {
    // "@release-it/conventional-changelog": {
    //   preset: "angular",
    //   infile: "CHANGELOG.md",
    // },
    './scripts/ob-bumper.mjs': {
      indent: 2,
      copyTo: './dist',
    },
  },
  npm: {
    publish: false,
  },
  github: {
    release: true,
    assets: [
      'dist/thino-capture-${version}.zip',
    ],
    proxy: process.env.HTTPS_PROXY,
    releaseName: '${version}',
  },
};
