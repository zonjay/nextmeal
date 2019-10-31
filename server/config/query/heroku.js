const sequelize = require('sequelize')

module.exports = {
  Comment: {
    RestaurantId: '(SELECT COUNT(*) FROM "Comments" WHERE "Comments"."RestaurantId" = "Restaurant"."id")'
  },
  Order: {
    UserId: '(SELECT COUNT(*) FROM "Orders" WHERE "Orders"."UserId" = "User"."id")'
  },
  char: {
    date: [sequelize.fn('to_char', sequelize.col('require_date'), 'YYMMDD'), 'date'],
    time: [sequelize.fn('to_char', sequelize.col('require_date'), 'HH24:MI'), 'time']
  }
}