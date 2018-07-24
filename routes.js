const routes = require('next-routes')

module.exports = routes()
.add('userblank', '/user/', 'user')
.add('user', '/user/:userID', 'user')
.add('workblank', '/work/', 'work')
.add('work', '/work/:workID', 'work')
