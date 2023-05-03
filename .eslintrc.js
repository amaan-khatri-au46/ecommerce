
// in this file we are going to setting eslint in js
module.exports = {
    env:{
        browser:true,
        node:true,
        es2020:true,
    },
    // this is for extention
    extends:['airbnb-base', 'prettier'],
    // its just a coding rule that make code consitent integrated
    parserOptions:{
        sourceType:'module',
        // this for import export in our backend project
        // now its time to implement es version
        ecmaVersion:11,
    },
    rules:{
        'no-console':0,
        'no-underscore-dangle':0,
        'no-neted-ternary':0,
        'import/prefer-default-export': 0,
        ' import/extensions':0,
    },
};