// factory function
module.exports = function TaxiRide() {

    var tripString = '';
    var fare = 0;
    var totalTaxiBill = 0;
    var change = 0;
    var typeOfTaxi = "";
    var numberOfPass = 0;
    var capacityStatus = "";
    var rating = 0;



    function chooseTaxi(type) {
        typeOfTaxi;
        typeOfTaxi = type;
        return typeOfTaxi
    }



    function overloadChecker(typeOfTaxi, numberOfPass) {
        capacityStatus;

        if (typeOfTaxi === "quantum" && numberOfPass > 15) {
            capacityStatus = "Overload";
        }
        if (typeOfTaxi === "siyaya" && numberOfPass > 16) {
            capacityStatus = "Overload";
        }


    }

    function getCapacityStatus() {
        return capacityStatus;
    }


    function tripSetUp(from, to) {

        tripString;

        tripString = from + " to " + to;
        clctFare(tripString);

        return tripString;

    }

    function clctFare(tripString) {

        if (tripString === "CPT to Nyanga" || tripString === "Nyanga to CPT") {
            fare = +17;
        }
        if (tripString === "CPT to Wynberg" || tripString === "Wynberg to CPT") {
            fare = +14;
        }
        if (tripString === "CPT to Mfuleni" || tripString === "Wynberg to CPT") {
            fare = +20;
        }
        if (tripString === "CPT to Strand" || tripString === "Strand to CPT") {
            fare = +25;
        }

    }

    function getFare() {
        return fare;
    }


    function calcTotalBill(fare, nmbrOfPass) {
        totalTaxiBill;
        numberOfPass;
        numberOfPass = nmbrOfPass;

        totalTaxiBill = getFare() * Number(nmbrOfPass)
    }


    function getTaxiBill() {
        return totalTaxiBill;
    }


    function calcPassChange(totalTaxiBill, amountPaid) {
        totalTaxiBill;
        change;
        change = amountPaid - getTaxiBill();

    }

    function getChange() {
        return change
    }

    function rateDriver(results) {
        rating;
        rating = results;

    }

    function showResults(rating) {
        if (rating < 5) {
            return "Not "
        }

    }


    return {
        tripSetUp,
        clctFare,
        getFare,
        calcTotalBill,
        getTaxiBill,
        calcPassChange,
        getChange,
        chooseTaxi,
        overloadChecker,
        getCapacityStatus,
        showResults,
        rateDriver
    }
}