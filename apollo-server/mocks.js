// Enable mocking in vue.config.js with `"pluginOptions": { "enableMocks": true }`
// Customize mocking: https://www.apollographql.com/docs/graphql-tools/mocking.html#Customizing-mocks
import faker from 'faker'

export default {
    // Mock resolvers here
    String: () => faker.name.findName()
}
