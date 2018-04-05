use w18_cs601r_ks;

db.ks.aggregate([{
    $group: {
        _id: null,
        avg_funding: {
            $avg: "$usd_pledged_real"
        }
    }
}, {
    $project: {
        _id: false,
        avg_funding: true
    }
}]);
