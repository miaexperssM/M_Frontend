# ⚛️ React with Ant Design <br>

Need to change the **`REACT_APP_BASE_URL`** in ".env" file when set environment.

**`REACT_APP_BASE_URL`** need to use the host ip address.

```sh
> ipconfig
```

host ip address is **WLAN IPv4 Address** XXX.XXX.XXX.XXX (192.168.xx.xx in general)

**`REACT_APP_BASE_URL`**= **WLAN IPv4 Address**:3002/api

## Getting Started

### Get file (Clone or Extract)

### Start

```sh
> npm install
> npm start
```

### Set Environments

```sh
> cp .env.example .env
> vi .env
```

### Building

```sh
> npm run build
```

### Tech Stack

| Category            | Name           |
| ------------------- | -------------- |
| Language            | **JavaScript** |
| UI Framework        | **React**      |
| State Manager       | **Redux**      |
| Side Effect Manager | **Redux Saga** |
| Selector            | **Reselect**   |
| UI Component        | **Ant Design** |
| Authentication      | **JWT**        |
| Linter              | **ESLint**     |
| Formatter           | **Prettier**   |

## Project Structure

### Main Directory

```makefile
src
├── components # Layout, Shared, Custom Components
|  ├── Header
|  ├── PrivateRoute
|  └── Sider
├── containers # Components with a Redux store
|  ├── Board
|  ├── SignUP
|  ├── SignIn
|  ├── NotFound
|  └── SignOut
├── routes # Routes directory
├── utils # Util directory
├── App.js
├── global.reducer.js
├── global.selectors.js
└── index.js
```
# M_frontend
# M_Frontend
