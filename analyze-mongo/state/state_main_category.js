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
        _id: "$_id.state",
        main_categories: {
            $push: {
                state: "$_id.main_category",
                count: "$count"
            }
        },
        total: {
            $sum: "$count"
        }
    }
}, {
    $unwind: "$main_categories"
}, {
    $sort: {
        "main_categories.count": -1
    }
}, {
    $group: {
        _id: "$_id",
        main_categories: {
            $push: {
                state: "$main_categories.state",
                count: "$main_categories.count",
                percent: {
                    $substr: [{
                        $multiply: [{
                            $divide: ["$main_categories.count", "$total"]
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
