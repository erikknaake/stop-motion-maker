const sassResourcesLoader = require('craco-sass-resources-loader');

module.exports = {
    style: {
        postcss: {
            plugins: [
                require('tailwindcss'),
                require('autoprefixer'),
            ]
        },
    },
    plugins: [
        {
            plugin: sassResourcesLoader,
            options: {
                resources: 'src/**/*.scss',
            },
        },
    ],
}