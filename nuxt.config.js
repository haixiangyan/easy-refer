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
    /*
    ** Customize the progress-bar color
    */
    loading: {color: '#fff'},
    /**
     * 设置服务端的中间件
     */
    // serverMiddleware: [
    //     '@/api/index.js'
    // ],
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
        '@/plugins/axios'
    ],
    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [
        '@nuxt/typescript-build'
    ],
    /*
    ** Nuxt.js modules
    */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        '@nuxtjs/auth',
        '@nuxtjs/pwa',
        '@nuxtjs/style-resources'
    ],
    /*
    ** Axios module configuration
    ** See https://axios.nuxtjs.org/options
    */
    axios: {
        baseUrl: 'http:localhost:5000/api'
    },
    /**
     * Auth 模块
     * 参考: https://auth.nuxtjs.org/
     */
    auth: {
        strategies: {
            local: {
                endpoints: {
                    login: { url: '/login', method: 'post', propertyName: 'token' },
                    logout: { url: '/logout', method: 'post' },
                    user: { url: '/user', method: 'get', propertyName: 'user' }
                },
                // tokenRequired: true,
                // tokenType: 'bearer',
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
    }
}
