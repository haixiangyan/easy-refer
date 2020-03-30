// Enable mocking in vue.config.js with `"pluginOptions": { "enableMocks": true }`
// Customize mocking: https://www.apollographql.com/docs/graphql-tools/mocking.html#Customizing-mocks
import faker from 'faker'
import dayjs from 'dayjs'

const expiration = [3, 5, 7]
const companies = ['Facebook', 'Google', 'Linkedin', 'Amazon', 'Databricks', 'BrixLabs']

const status = ['processing', 'rejected', 'referred']

const randomRequiredFields = () => ([
    'name', 'email', 'experience', 'referLinks'
])

const mocks = {
    User: () => ({
        userId: faker.random.uuid(),
        jobId: faker.random.uuid(),
        email: faker.internet.email(),
        name: faker.name.findName(),
        experience: faker.random.number(7),
        intro: faker.lorem.paragraph(),
        phone: faker.phone.phoneNumberFormat(),
        leetCodeUrl: faker.internet.url(),
        thirdPersonIntro: faker.lorem.paragraph(),
        resumeUrl: faker.internet.url()
    }),
    Job: () => ({
        jobId: faker.random.uuid(),
        refererId: faker.random.uuid(),
        company: companies[faker.random.number(companies.length - 1)],
        requiredFields: randomRequiredFields(),
        deadline: dayjs(faker.date.between('2015-01-01', '2015-12-31')).format('YYYY-MM-DD'),
        expiration: expiration[faker.random.number(expiration.length - 1)],
        referredCount: faker.random.number({min: 10, max: 100}),
        referTotal: faker.random.number({min: 200, max: 300}),
        createdAt: dayjs(faker.date.between('2015-01-01', '2015-12-31')).format('YYYY-MM-DD'),
        imageUrl: faker.image.avatar(),
        source: faker.internet.url()
    }),
    JobsPage: () => ({
        jobs: [...Array(10)].map(() => mocks.Job()),
        totalPages: 100
    }),
    UserIntro: () => ({
        avatarUrl: faker.image.avatar(),
        name: faker.name.findName(),
        finishedRefers: faker.random.number({min: 10, max: 100}),
        totalRefers: faker.random.number({min: 200, max: 400}),
        finishedResumes: faker.random.number({min: 20, max: 100}),
        totalResumes: faker.random.number({min: 300, max: 500})
    }),
    Refer: () => ({
        referId: faker.random.uuid(),
        refererId: faker.random.uuid(),
        refereeId: faker.random.uuid(),
        jobId: faker.random.uuid(),
        resumeId: faker.random.uuid(),
        status: status[faker.random.number(status.length - 1)],
        updatedDate: dayjs(faker.date.between('2015-01-01', '2015-12-31')).format('YYYY-MM-DD'),
        // meta
        company: companies[faker.random.number(companies.length - 1)],
        refererName: faker.name.findName(),
        source: faker.internet.url()
    }),
    RefersPage: () => ({
        refers: [...Array(10)].map(() => mocks.Refer()),
        totalPages: 100
    }),
    Resume: () => ({
        resumeId: faker.random.uuid(),
        jobId: faker.random.uuid(),
        createdAt: dayjs(faker.date.between('2015-01-01', '2015-12-31')).format('YYYY-MM-DD'),
        referLinks: faker.internet.url(),
        ...mocks.User()
    }),
    ResumesPage: () => ({
        resumes: [...Array(20)].map(() => mocks.Resume()),
        totalPages: 100
    })
}

export default mocks
