module.exports = {
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
        '^~/(.*)$': '<rootDir>/$1',
        '^vue$': 'vue/dist/vue.common.js'
    },
    moduleFileExtensions: [
        'ts',
        'js',
        'vue',
        'json'
    ],
    transform: {
        "^.+\\.ts$": "ts-jest",
        '^.+\\.js$': 'babel-jest',
        '.*\\.(vue)$': 'vue-jest'
    },
    collectCoverage: true,
    collectCoverageFrom: [
        // 暂时不测试 components 和 pages 里的组件
        '<rootDir>/components/**/*.vue',
        '<rootDir>/utils/**/*.ts',
        "!**/node_modules/**"
    ],
    coverageReporters: ["html", "text-summary", "lcov"],
}
