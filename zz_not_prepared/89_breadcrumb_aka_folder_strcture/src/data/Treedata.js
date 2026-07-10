// Tree node shape: { id, name, children: { key: node } | null }
export const TREE = {
  id: 'root',
  name: 'root',
  children: {
    src: {
      id: 'src',
      name: 'src',
      children: {
        components: {
          id: 'components',
          name: 'components',
          children: {
            'Button.jsx': {
              id: 'Button.jsx',
              name: 'Button.jsx',
              children: null,
            },
            'Modal.jsx': { id: 'Modal.jsx', name: 'Modal.jsx', children: null },
          },
        },
        hooks: {
          id: 'hooks',
          name: 'hooks',
          children: {
            'useFetch.js': {
              id: 'useFetch.js',
              name: 'useFetch.js',
              children: null,
            },
            'useDebounce.js': {
              id: 'useDebounce.js',
              name: 'useDebounce.js',
              children: null,
            },
          },
        },
        'index.js': { id: 'index.js', name: 'index.js', children: null },
      },
    },
    public: {
      id: 'public',
      name: 'public',
      children: {
        'index.html': { id: 'index.html', name: 'index.html', children: null },
        'favicon.ico': {
          id: 'favicon.ico',
          name: 'favicon.ico',
          children: null,
        },
      },
    },
    'package.json': {
      id: 'package.json',
      name: 'package.json',
      children: null,
    },
  },
};
