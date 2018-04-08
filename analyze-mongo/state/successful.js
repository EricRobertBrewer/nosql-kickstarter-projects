use w18_cs601r_ks;

db.ks.aggregate([{
    $match: {
        $and: [{
            state: "successful"
        }, {
            usd_pledged_real: {
                $lt: "$usd_goal_real"
            }
        }]
    }
}]);
