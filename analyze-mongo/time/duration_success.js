use w18_cs601r_ks;

// The maximum duration of a kickstarter project.
var max_days = 92;
var day_boundaries = [];
for (var i = 0; i <= max_days; i++) {
    day_boundaries.push(i);
}
var states = ["successful", "failed"];
/*
 * After the aggregation below is executed, two new collections should have been created:
 * ```
 * $ mongo
 * > db.ks_duration_successful.count()
 * 92
 * > db.ks_duration_failed.count()
 * 92
 * ```
 */
for (var i = 0; i < states.length; i++) {
    var state = states[i];
    db.ks.aggregate([{
        $match: {
            state: state
        }
    }, {
        $project: {
            duration_days: {
                $divide: ["$duration", 24 * 60 * 60 * 1000]
            }
        }
    }, {
        $bucket: {
            groupBy: "$duration_days",
            boundaries: day_boundaries,
            output: {
                count: {
                    $sum: 1
                }
            }
        }
    }, {
        $out: "ks_duration_" + state
    }]);
}
