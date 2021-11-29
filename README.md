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


### Mongoose infos
1. Run "npm install mongoose" in the directory /maps_api 
2. Run "npm install dotenv" in the directory /maps_api for initializing environment variables
3. add /models/Place.js for the DB model Place in the directory /maps_api
4. Mongoose functions work perfectly: find(), updateOne(), save(), remove()
5. Mongoose functions do not work, and need to check later: findById()
6. MongoDB account url: cloud.mongodb.com
    user name: muksitur9191@gmail.com
    password: regna9191
7. Follow example_MongoDB_cluster.png as reference for better understanding
8. Database access: follow /maps_api/.env as reference
9. Network access: any IP address
10. Databases tab:
    Browse collections
    connect: connect using MongoDB compass
