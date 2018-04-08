use w18_cs601r_ks;

// Find the maximum duration in the data set.
db.ks.aggregate([{
    $sort: {
        duration: -1
    }
}, {
    $limit: 10
}]);
