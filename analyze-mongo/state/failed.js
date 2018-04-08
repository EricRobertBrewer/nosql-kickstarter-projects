use w18_cs601r_ks;

db.ks.aggregate([{
    $match: {
        $and: [{
            state: "failed"
        }, {
            usd_pledged_real: {
                $gte: "$usd_goal_real"
            }
        }]
    }
}]);
