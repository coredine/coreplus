/** @type {import('jest').Config} */
const config = {
    verbose: true,
    preset: "jest-expo",
    transformIgnorePatterns: [
        "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg)"
    ],
    collectCoverageFrom: [
        "**/*.{ts,tsx,js,jsx}",
        "!**/coverage/**",
        "!**/node_modules/**",
        "!**/babel.config.js",
        "!**/metro.config.js",
        "!**/jest.config.js",
        "!**/env.d.ts",
        "!**/contexts/*",
        "!**/nativewind-env.d.ts",
        "!**/tailwind.config.js",
        "!**/expo-env.d.ts",
        "!**/.expo/**"
    ]
};

export default config;
