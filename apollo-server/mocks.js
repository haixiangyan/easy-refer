// Enable mocking in vue.config.js with `"pluginOptions": { "enableMocks": true }`
// Customize mocking: https://www.apollographql.com/docs/graphql-tools/mocking.html#Customizing-mocks
import faker from 'faker/locale/zh_CN'
import dayjs from 'dayjs'

const expiration = [3, 5, 7]
const companies = ['Facebook', 'Google', 'Linkedin', 'Amazon', 'Databricks', 'BrixLabs']

const status = ['processing', 'rejected', 'referred']

const randomRequiredFields = () => ([
    'name', 'email', 'experience', 'referLinks'
])

const dateRange = (from, to) =>
    dayjs(faker.date.between(from, to)).toISOString()
const now = () =>
    dayjs().format('YYYY-MM-DD')
const fakerImageUrl = () =>
    'https://picsum.photos/400/400/?image='+faker.random.number(1084)

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
        resumeUrl: faker.internet.url(),
        avatarUrl: faker.image.avatar()
    }),
    Job: () => ({
        jobId: faker.random.uuid(),
        refererId: faker.random.uuid(),
        company: companies[faker.random.number(companies.length - 1)],
        requiredFields: randomRequiredFields(),
        deadline: dateRange('2020-12-1', '2021-1-1'),
        expiration: expiration[faker.random.number(expiration.length - 1)],
        referredCount: faker.random.number({min: 10, max: 100}),
        referTotal: faker.random.number({min: 200, max: 300}),
        createdAt: now(),
        imageUrl: fakerImageUrl(),
        source: faker.internet.url(),
        // meta
        refererName: faker.name.findName()
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
        updatedAt: dateRange('2020-4-1', '2020-5-1'),
        createdAt: dateRange('2019-4-1', '2019-5-1'),
        // meta
        company: companies[faker.random.number(companies.length - 1)],
        refererName: faker.name.findName(),
        refereeName: faker.name.findName(),
        experience: faker.random.number(7),
        source: faker.internet.url()
    }),
    RefersPage: () => ({
        refers: [...Array(20)].map(() => mocks.Refer()),
        totalPages: 100
    }),
    Resume: () => ({
        resumeId: faker.random.uuid(),
        refereeId: faker.random.uuid(),
        jobId: faker.random.uuid(),
        name: faker.name.findName(),
        email: faker.internet.email(),
        experience: faker.random.number(7),
        intro: faker.lorem.paragraph(),
        phone: faker.phone.phoneNumberFormat(),
        leetCodeUrl: faker.internet.url(),
        thirdPersonIntro: faker.lorem.paragraph(),
        resumeUrl: faker.internet.url(),
        referLinks: faker.internet.url(),
        // meta
        createdAt: dateRange('2019-7-1', '2019-8-1')
    }),
    ResumesPage: () => ({
        resumes: [...Array(10)].map(() => mocks.Resume()),
        totalPages: 100
    })
}

export default mocks
