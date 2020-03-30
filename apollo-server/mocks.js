// Enable mocking in vue.config.js with `"pluginOptions": { "enableMocks": true }`
// Customize mocking: https://www.apollographql.com/docs/graphql-tools/mocking.html#Customizing-mocks
import faker from 'faker'
import dayjs from 'dayjs'

const expiration = [3, 5, 7]
const companies = ['Facebook', 'Google', 'Linkedin', 'Amazon', 'Databricks', 'BrixLabs']

const randomRequiredFields = () => ([
    'name', 'email', 'experience', 'referLinks'
])

const mocks = {
    User: () => ({
        userId: faker.random.uuid(),
        jobId: faker.random.uuid(),
        email: faker.internet.email(),
        name: faker.name.findName(),
        experience: faker.random.number(),
        intro: faker.lorem.paragraph(),
        phone: faker.phone.phoneNumberFormat(),
        referLinks: [faker.internet.url(), faker.internet.url()].join(','),
        leetCodeUrl: faker.internet.url(),
        thirdPersonIntro: faker.lorem.paragraph(),
        resumeUrl: faker.internet.url()
    }),
    Job: () => ({
        jobId: faker.random.uuid(),
        company: companies[0],
        referer: faker.name.findName(),
        requiredFields: randomRequiredFields(),
        deadline: dayjs(faker.date.between('2015-01-01', '2015-12-31')).format('YYYY-MM-DD'),
        expiration: expiration[0],
        referredCount: faker.random.number({min: 10, max: 100}),
        referTotal: faker.random.number({min: 200, max: 300}),
        imageUrl: faker.image.avatar(),
        source: faker.internet.url()
    }),
    JobsPage: () => ({
        jobs: [...Array(10)].map(i => mocks.Job()),
        totalPages: 100
    }),
    UserIntro: () => ({
        avatarUrl: faker.image.avatar(),
        name: faker.name.findName(),
        finishedRefers: faker.random.number({min: 10, max: 100}),
        totalRefers: faker.random.number({min: 200, max: 400}),
        finishedResumes: faker.random.number({min: 20, max: 100}),
        totalResumes: faker.random.number({min: 300, max: 500})
    })
}

export default mocks
