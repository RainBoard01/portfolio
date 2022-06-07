module.exports = {
  stories: ['../**/*.story.mdx', '../**/*.story.@(js|jsx|ts|tsx)'],
  addons: [
    'storybook-dark-mode',
    {
      name: 'storybook-addon-turbo-build',
      options: { optimizationLevel: 2 },
    },
    '@storybook/addon-controls',
    '@storybook/addon-actions',
    '@storybook/addon-viewport',
    '@storybook/addon-docs',
    '@storybook/addon-backgrounds',
    '@storybook/addon-toolbars',
    '@storybook/addon-measure',
    '@storybook/addon-outline',
  ],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
  typescript: {
    reactDocgen: false,
  },
};
