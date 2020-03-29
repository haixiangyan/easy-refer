import GraphQLJSON from 'graphql-type-json'
import Mock from "mockjs"

export default {
    JSON: GraphQLJSON,

    Query: {},

    Mutation: {
        login: (root, args, context) => {
            return Mock.mock({
                userId: '@ID',
                jobId: '@ID',
                email: '@EMAIL',
                name: '@CNAME',
                experience: '@INTEGER(0,4)',
                intro: '@CPARAGRAPH',
                phone: '9493467358',
                referLinks: ['@URL', '@URL'].join(','),
                leetCodeUrl: '@URL',
                thirdPersonIntro: '@CPARAGRAPH',
                resumeUrl: '@URL'
            })
        }
    },

    Subscription: {},
}
