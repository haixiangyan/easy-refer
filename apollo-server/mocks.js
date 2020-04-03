// Enable mocking in vue.config.js with `"pluginOptions": { "enableMocks": true }`
// Customize mocking: https://www.apollographql.com/docs/graphql-tools/mocking.html#Customizing-mocks
import faker from 'faker/locale/zh_CN'
import dayjs from 'dayjs'

const expiration = [3, 5, 7]
const companies = ['Facebook', 'Google', 'Linkedin', 'Amazon', 'Databricks', 'BrixLabs']
const status = ['processing', 'rejected', 'referred']
const requiredFields = ['name', 'email', 'phone', 'experience', 'referLinks', 'resumeUrl', 'intro', 'thirdPersonIntro', 'leetCodeUrl']

const mockArray = (array) => array[faker.random.number(array.length - 1)]
const mockItemList = (length, makeObjectCallback) => [...Array(length)].map(() => makeObjectCallback())
const dateRange = (from, to) => dayjs(faker.date.between(from, to)).toISOString()
const now = () => dayjs().toISOString()
const fakerImageUrl = () => 'https://picsum.photos/400/400/?image=' + faker.random.number(1084)

const mocks = {
    Mutation: () => ({
        uploadAvatar: () => faker.image.avatar(),
        uploadResume: () => faker.internet.url(),
        uploadReferResume: () => faker.internet.url(),
    }),
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
    JobItem: () => ({
        jobId: faker.random.uuid(),
        refererName: faker.name.findName(),
        company: mockArray(companies),
        referredCount: faker.random.number({min: 10, max: 100}),
        referTotal: faker.random.number({min: 200, max: 300}),
        deadline: dateRange('2020-12-1', '2021-1-1'),
        expiration: mockArray(expiration),
        requiredFields,
        createdAt: now(),
        source: faker.internet.url(),
        avatarUrl: faker.image.avatar()
    }),
    JobItemListPage: () => ({
        jobItemList: mockItemList(10, mocks.JobItem),
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
    ReferItem: () => ({
        referId: faker.random.uuid(),
        jobId: faker.random.uuid(),
        status: mockArray(status),
        updatedAt: dateRange('2020-4-1', '2020-5-1'),
        company: mockArray(companies),
        refererName: faker.name.findName(),
        source: faker.internet.url()
    }),
    ReferItemListPage: () => ({
        referItemList: mockItemList(10, mocks.ReferItem),
        totalPages: 100
    }),
    ReferRow: () => ({
        referId: faker.random.uuid(),
        jobId: faker.random.uuid(),
        resumeId: faker.random.uuid(),
        experience: faker.random.number(7),
        refereeName: faker.name.findName(),
        createdAt: dateRange('2020-4-1', '2020-5-1')
    }),
    ReferTable: () => ({
        referRowList: mockItemList(20, mocks.ReferRow),
        totalPages: 100
    }),
    ReferDetails: () => ({
        referId: faker.random.uuid(),
        resumeId: faker.random.uuid(),
        jobItem: mocks.JobItem()
    }),
    ResumeBody: () => ({
        refereeId: faker.random.uuid(),
        jobId: faker.random.uuid(),
        email: faker.internet.email(),
        name: faker.name.findName(),
        experience: faker.random.number(7),
        intro: faker.lorem.paragraph(),
        leetCodeUrl: faker.internet.url(),
        phone: faker.phone.phoneNumberFormat(),
        referLinks: faker.internet.url(),
        resumeUrl: faker.internet.url(),
        thirdPersonIntro: faker.lorem.paragraph()
    }),
}

export default mocks
