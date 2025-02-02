# Blog

This blog was created using the [SSR boilerplate for Lithent](https://github.com/superlucky84/lithent/tree/master/createLithent#welcome-to-lithent-ssr-boilerplate), a virtual DOM library I developed.


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

### Routing Rules

Routing is determined by the filenames under the `/src/pages/` directory. The routing behavior is as follows:

* `src/pages/index.tsx` maps to the root URL: `http://localhost:3000`.

* A file with a specific name like `one.tsx` will create a static route. For example:
    * `src/pages/one.tsx` maps to `http://localhost:3000/one`.

* Files with dynamic segments are defined by using an underscore (`_`) in the filename. For example:
    * `src/pages/index._type.tsx` maps to a dynamic route like `http://localhost:3000/:type`.

* You can chain dynamic segments for more complex routes. For example:
    * `src/pages/one._type._name.tsx` maps to `http://localhost:3000/one/:type/:name`.

These routing patterns allow you to create both static and dynamic URLs with flexibility in your project structure.

### State Management

This template includes [state-ref](https://github.com/superlucky84/state-ref), a lightweight state management library, already configured to simplify your development experience. It provides an intuitive API for managing and sharing state across components, making your application more predictable and maintainable.

### Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience.
