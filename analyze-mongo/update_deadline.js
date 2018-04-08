use w18_cs601r_ks;

// Convert date strings into ISODate objects.
// It is only necessary to run this command once.
db.ks.find().forEach(function (elem) {
	elem.deadline = new ISODate(elem.deadline);
	elem.launched = new ISODate(elem.launched.replace(" ", "T"));
	db.ks.save(elem);
});
