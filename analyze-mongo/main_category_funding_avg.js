use w18_cs601r_ks;

db.ks.aggregate([{
    $group: {
        _id: "$main_category",
        count: {
            $sum: 1
        },
        funding: {
            $sum: "$usd_pledged_real"
        }
    }
}, {
    $project: {
        _id: 0,
        main_category: "$_id",
        avg_funding: {
            $divide: [
                "$funding",
                "$count"
            ]
        }
    }
}, {
    $sort: {
        avg_funding: -1
    }
}]);
