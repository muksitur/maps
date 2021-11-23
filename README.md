# maps

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### TS infos
1. vue add @vue/typescript
2. class-style component syntax: No
3. Babel: Yes,
4. Etc: Yes
5. keep NodeJS app.js file
6. Inside tsconfig.json in "compilerOptions" add
    "noImplicitAny": false,
    "strictNullChecks": false,
7. Inside tsconfig.json after "compilerOptions" add
    "parserOptions": {
        "parser": "@typescript-eslint/parser",
        "ecmaFeatures" : {
        "jsx" : false
        }
    }
8. Inside .vue file add <script lang="ts">, to make the .vue file ts
9. init temp 
    let temp: any = this;
    and use "temp" instead of "this"
10. first save all changes. then "npm run build" and check compiling error. Then "npm run serve"