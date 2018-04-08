use w18_cs601r_ks;

db.ks.aggregate([{
    $group: {
        _id: "$main_category",
        backers_min: {
            $min: "$backers"
        },
        backers_max: {
            $max: "$backers"
        },
        backers_mean: {
            $avg: "$backers"
        }
    }
}, {
    $project: {
        _id: false,
        main_category: "$_id",
        backers: {
            min: "$backers_min",
            max: "$backers_max",
            mean: "$backers_mean"
        }
    }
}, {
    $sort: {
        "backers.mean": -1
    }
}]);
