use w18_cs601r_ks;

db.ks.aggregate([{
    $group: {
        _id: {
            main_category: "$main_category",
            category: "$category"
        },
        funding: {
            $sum: "$usd_pledged_real"
        },
        count: {
            $sum: 1
        }
    }
}, {
    $project: {
        _id: 0,
        main_category: "$_id.main_category",
        category: "$_id.category",
        avg_funding: {
            $divide: [ "$funding", "$count" ]
        }
    }
}, {
    $sort: {
        avg_funding: -1
    }
}, {
    $group: {
        _id: "$main_category",
        categories: {
            $push: {
                category: "$category",
                avg_funding: "$avg_funding"
            }
        }
    }
}, {
    $project: {
        _id: 0,
        main_category: "$_id",
        max_avg_funding: {
            $arrayElemAt: [ "$categories", 0 ]
        }
    }
}, {
    $sort: {
        "max_avg_funding.avg_funding": -1
    }
}]);
