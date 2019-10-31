const assert = require('assert');

const TaxiRide = require('../taxulator');

describe('taxulator-app', function () {

    taxiRide = TaxiRide()

    it('should return the place of departure and final destination', function () {
        taxiRide.tripSetUp()

        assert.equal("CPT to Strand", taxiRide.tripSetUp("CPT", "Strand"));

    });

    it('should return a taxi fare string', function () {
        taxiRide.clctFare()
        taxiRide.clctFare("CPT to Strand")

        assert.equal("CPT to Strand : R" + 25, taxiRide.getFare());

    });

    it('should return the total bill for the specified number of passengers in the taxi', function () {
        taxiRide.calcTotalBill(25, 4)

        assert.equal("R" + 100, taxiRide.getTaxiBill());

    });

    it('should calculate how much change the passegers are getting from the amount the paid if there is', function () {
        taxiRide.calcPassChange(100, 200)

        assert.equal("R" + 100, taxiRide.getChange());

    });

    it('should check if the taxi is overload or not', function () {
        taxiRide.overloadChecker("quantum", 17)

        assert.equal("Overload", taxiRide.getCapacityStatus())

    });







    // it('should calculate the right totals', function () {
    //     const taxulator = ();




    //     assert.equal(,);
    //     assert.equal(,);
    //     assert.equal(,);

    // });






});