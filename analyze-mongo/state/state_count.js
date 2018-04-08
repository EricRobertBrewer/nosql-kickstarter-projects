use w18_cs601r_ks;

var total = db.ks.count();
db.ks.aggregate([{
    $group: {
        _id: "$state",
        count: {
            $sum: 1
        }
    }
}, {
    $project: {
        _id: 0,
        state: "$_id",
        count: "$count",
        percent: {
            $substr: [{
                $multiply: [{
                    $divide: ["$count", total]
                }, 100]
            }, 0, 5]
        }
    }
}, {
    $sort: {
        count: -1
    }
}]);
