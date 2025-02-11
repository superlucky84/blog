# Blog

This blog was built using the [SSR boilerplate for Lithent](https://github.com/superlucky84/lithent/tree/master/createLithent#welcome-to-lithent-ssr-boilerplate), a virtual DOM library.

This code is the actual operational code of the blog at https://subtleflo.com.

## How to run

### Install

```bash
npm install
```


### Development

```bash
npm run dev
```

### Production

The build files will be generated in the `dist` directory.

```bash
npm run build
npm run start
```

## Architecture

### Fundamental Routing Rules

Routing is determined by the filenames under the `/src/pages/` directory. The routing behavior is as follows:

* `src/pages/index.tsx` maps to the root URL: `http://localhost:3000`.

* A file with a specific name like `one.tsx` will create a static route. For example:
    * `src/pages/one.tsx` maps to `http://localhost:3000/one`.

* Files with dynamic segments are defined by using an underscore (`_`) in the filename. For example:
    * `src/pages/index._type.tsx` maps to a dynamic route like `http://localhost:3000/:type`.

* You can chain dynamic segments for more complex routes. For example:
    * `src/pages/one._type._name.tsx` maps to `http://localhost:3000/one/:type/:name`.

These routing patterns allow you to create both static and dynamic URLs with flexibility in your project structure.

### Rules Specialized for the Blog

1. The list information displayed on the main screen is determined by the data in `src/posts.json`.
2. The `id` attribute refers to the filename of the `.mdx` file located under the `src/pages/` path, and only filenames corresponding to English content should be used.
3. Korean content files are created by adding the prefix `ko.` to the English content filename.


### HMR Usage Notice

To enable HMR (Hot Module Replacement), make sure to uncomment the relevant comments in /src/base/load.ts.

This will allow selective HMR application only to components under /pages/ in the component tree.

## Key Dependency Modules

### JSX-based Virtual DOM Library

This blog is built on the JSX-based virtual DOM library [Lithent](https://github.com/superlucky84/lithent).

### State Management

This template includes [state-ref](https://github.com/superlucky84/state-ref), a lightweight state management library, already configured to simplify your development experience. It provides an intuitive API for managing and sharing state across components, making your application more predictable and maintainable.

### Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience.


### Using Upstash Redis in This Project

This project utilizes the Redis service from [Upstash](https://upstash.com/) and is configured using an `.env` file located at the project root with the following settings:

```
UPSTASH_REDIS_REST_URL=https://your-upstash-endpoint.upstash.io  
UPSTASH_REDIS_REST_TOKEN=your-upstash-token
```

