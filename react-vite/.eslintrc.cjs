module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  overrides: [
    {
      files: ["src/context/*.jsx"],
      rules: {
        "react-refresh/only-export-components": "off",
      },
    },
  ],
  ignorePatterns: ["dist", "node_modules"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "react/prop-types": "off",
    "react/no-unknown-property": [
      "error",
      {
        ignore: [
          // Three.js / React Three Fiber properties
          "args",
          "attach",
          "position",
          "rotation",
          "scale",
          "intensity",
          "color",
          "transparent",
          "opacity",
          "wireframe",
          "side",
          "visible",
          "castShadow",
          "receiveShadow",
          "geometry",
          "material",
          "object",
          "dispose",
          "uuid",
          "up",
          "userData",
          "frustumCulled",
          "renderOrder",
          "layers",
          "matrixAutoUpdate",
          "matrixWorldNeedsUpdate",
          "onUpdate",
          "onPointerOver",
          "onPointerOut",
          "onPointerDown",
          "onPointerUp",
          "onPointerMove",
          "onClick",
          "onDoubleClick",
          "onWheel",
          "onPointerMissed",
          "onBeforeRender",
          "onAfterRender"
        ]
      }
    ]
  },
};
