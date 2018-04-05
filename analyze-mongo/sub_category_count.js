use w18_cs601r_ks;

db.ks.aggregate([{
    $group: {
        _id: {
            main_category: "$main_category",
            category: "$category"
        },
        count: {
            $sum: 1
        }
    }
}, {
    $sort: {
        count: -1
    }
}, {
    $group: {
        _id: {
            main_category: "$_id.main_category"
        },
        categories: {
            $push: {
                category: "$_id.category",
                count: "$count"
            }
        },
        count: {
            $sum: "$count"
        }
    }
}, {
    $sort: {
        count: -1
    }
}, {
    $project: {
        _id: 0,
        main_category: "$_id.main_category",
        categories: "$categories",
        count: "$count"
    }
}]);
