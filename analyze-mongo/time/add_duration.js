use w18_cs601r_ks;

// Add the `duration` field so it no longer has to be computed for each duration query.
// This aggregation should only be executed once.
db.ks.aggregate([{
    $addFields: {
        duration: {
            $subtract: ["$deadline", "$launched"]
        }
    }
}, {
    $out: "ks"
}]);
