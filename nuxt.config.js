require('dotenv').config()

module.exports = {
    mode: 'spa',
    /*
    ** Headers of the page
    */
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ]
    },
    /**
     * 配置 Router
     */
    router: {
        middleware: ['auth']
    },
    /*
    ** Customize the progress-bar color
    */
    loading: {color: '#fff'},
    /*
    ** Global styles
    */
    css: [
        '@/assets/styles/global.css',
        'element-ui/lib/theme-chalk/index.css',
    ],
    styleResources: {
        scss: [
            '@/assets/styles/variables.scss',
        ]
    },
    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
        '@/plugins/element-ui',
        '@/plugins/v-charts',
        '@/plugins/axios',
        '@/plugins/v-clipboard'
    ],
    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [
        '@nuxt/typescript-build',
        '@nuxtjs/dotenv'
    ],
    /*
    ** Nuxt.js modules
    */
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/auth',
        '@nuxtjs/pwa',
        '@nuxtjs/style-resources',
        '@nuxtjs/proxy',
    ],
    /**
     * 配置代理
     */
    proxy: [`${process.env.PROXY_BASE_URL}/api`],
    /*
    ** Axios module configuration
    ** See https://axios.nuxtjs.org/options
    */
    axios: {
        baseURL: '/api',
        credential: true
    },
    /**
     * Auth 模块
     * 参考: https://auth.nuxtjs.org/
     */
    auth: {
        strategies: {
            local: {
                endpoints: {
                    login: {url: '/auth/login', method: 'post', propertyName: 'accessToken'},
                    logout: false,
                    user: {url: '/users', method: 'get', propertyName: false}
                },
                tokenRequired: true,
                tokenType: '',
                // autoFetchUser: true
            }
        }
    },
    /*
    ** Build configuration
    */
    build: {
        transpile: [/^element-ui/],
        /*
        ** You can extend webpack config here
        */
        extend(config, ctx) {
        }
    },
    generate: {
      dir: process.env.GENERATE_DIR || 'fe'
    },
}
