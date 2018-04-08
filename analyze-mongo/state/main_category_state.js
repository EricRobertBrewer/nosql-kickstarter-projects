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
    $sort: {
        "states.count": -1
    }
}, {
    $group: {
        _id: "$_id",
        states: {
            $push: {
                state: "$states.state",
                count: "$states.count",
                percent: {
                    $substr: [{
                        $multiply: [{
                            $divide: ["$states.count", "$total"]
                        }, 100]
                    }, 0, 5]
                }
            }
        },
        total: {
            $avg: "$total"
        }
    }
}, {
    $sort: {
        total: -1
    }
}]);
