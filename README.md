### Prerequisites

- `npm` and `pnpm` should be installed.
- `git` should be installed (recommended v2.4.11 or higher)

#### Install Modules

#### `npm install `

### Available scripts

#### `pnpm dev` || `npm run dev`

Runs the app in development mode.
Open https://localhost:3000  || http://localhost:3000 to view it in the browser.

The page will automatically reload if you make changes to the code.
You will see the build errors and lint warnings in the console.

#### `pnpm build` || `npm run build`

Builds the app for production to the `dist` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

Your app is ready to be deployed.

#### Projects structure

```
.root
├── index.html
├── src
│   ├── api    //请求接口定义
│   ├── App.tsx    
│   ├── components    
│   ├── main.tsx    //项目入口
│   ├── styles    //样式
│   ├── typings    //通用类型
│   └── utils    //第三方库或自定义工具封装
├── tsconfig.json    
└── vite.config.ts
```
