// Context passed to all resolvers (third argument)
// req => Query
// connection => Subscription
export default ({req, connection}) => {
    return {
        // Put objects here
        req, connection
    }
}
