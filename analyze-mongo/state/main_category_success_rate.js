use w18_cs601r_ks;

db.ks.aggregate([{
    $group: {
        _id: {
            main_category: "$main_category",
            state: "$state"
        },
        count: {
            $sum: 1
        }
    }
}, {
    $group: {
        _id: "$_id.main_category",
        states: {
            $push: {
                state: "$_id.state",
                count: "$count"
            }
        },
        total: {
            $sum: "$count"
        }
    }
}, {
    $unwind: "$states"
}, {
    $match: {
        "states.state": "successful"
    }
}, {
    $project: {
        _id: true,
        count: "$states.count",
        total: "$total",
        success_rate: {
            $substr: [{
                $multiply: [{
                    $divide: ["$states.count", "$total"]
                }, 100]
            }, 0, 5]
        }
    }
}, {
    $sort: {
        success_rate: -1
    }
}]);
