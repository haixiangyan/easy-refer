// Enable mocking in vue.config.js with `"pluginOptions": { "enableMocks": true }`
// Customize mocking: https://www.apollographql.com/docs/graphql-tools/mocking.html#Customizing-mocks

import Mock from "mockjs"
import casual from 'casual'

const expiration = [3, 5, 7]
const companies = ['Facebook', 'Google', 'Linkedin', 'Amazon', 'Databricks', 'BrixLabs']

const randomRequiredFields = () => ([
    'name', 'email', 'experience', 'referLinks'
])

const mocks = {
    User: () => Mock.mock({
        userId: casual.uuid,
        jobId: casual.uuid,
        email: casual.email,
        name: casual.name,
        experience: casual.integer(0, 4),
        intro: casual.text,
        phone: casual.phone,
        referLinks: [casual.url, casual.url].join(','),
        leetCodeUrl: casual.url,
        thirdPersonIntro: casual.text,
        resumeUrl: casual.text
    }),
    Job: () => ({
        jobId: casual.uuid,
        title: casual.sentence,
        content: casual.text,
        company: companies[0],
        requiredFields: randomRequiredFields(),
        deadline: new Date(),
        expiration: expiration[0],
        referredCount: casual.integer(10, 100),
        referTotal: casual.integer(100, 300),
        referer: casual.name,
        imageUrl: casual.url,
        source: casual.url
    }),
    JobsPage: () => ({
        jobs: [...Array(10)].map(i => mocks.Job()),
        totalPages: 10
    })
}

export default mocks
