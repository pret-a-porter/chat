const autoprefixer = require('autoprefixer');
const customProperties = require('postcss-custom-properties');

module.exports = {
    plugins: [
        customProperties,
        autoprefixer({
            browsers: [
                'last 3 versions'
            ]
        })
    ]
};
