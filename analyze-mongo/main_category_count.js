use w18_cs601r_ks;

db.ks.aggregate([{
    $group: {
        _id: "$main_category",
        count: {
            $sum: 1
        }
    }
}, {
    $sort: {
        count: -1
    }
}, {
    $project: {
        _id: 0,
        main_category: "$_id",
        count: "$count"
    }
}]);
