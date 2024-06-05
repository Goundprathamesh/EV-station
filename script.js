document.addEventListener("DOMContentLoaded", () => {
  // Load saved preferences
  const savedPreferences = JSON.parse(localStorage.getItem("evPreferences"));
  if (savedPreferences) {
    document.getElementById("vehicle-segment").value =
      savedPreferences.vehicleSegment;
    document.getElementById("cost-per-kwh").value = savedPreferences.costPerKwh;
    document.getElementById("battery-capacity").value =
      savedPreferences.batteryCapacity;
    document.getElementById("select-distance").value =
      savedPreferences.selectDistance;
    document.getElementById("range").value = savedPreferences.range;
    document.getElementById("public-charger").checked =
      savedPreferences.publicCharger;
  }
});

function calculateCost() {
  var vehicleSegment = document.getElementById("vehicle-segment").value;
  var costPerKwh = document.getElementById("cost-per-kwh").value;
  var batteryCapacity = document.getElementById("battery-capacity").value;
  var selectDistance = document.getElementById("select-distance").value;
  var range = document.getElementById("range").value;
  var publicCharger = document.getElementById("public-charger").checked;

  // Form validation
  if (!costPerKwh || !batteryCapacity || !selectDistance || !range) {
    alert("Please fill in all fields.");
    return;
  }

  // Save preferences
  const preferences = {
    vehicleSegment,
    costPerKwh,
    batteryCapacity,
    selectDistance,
    range,
    publicCharger,
  };
  localStorage.setItem("evPreferences", JSON.stringify(preferences));

  // Show loading spinner
  document.getElementById("loading-spinner").classList.remove("hidden");

  // Calculation logic
  setTimeout(() => {
    var cost = costPerKwh * (selectDistance / range) * batteryCapacity;
    if (publicCharger) {
      cost *= 1.1; // 10% surcharge for using public charger
    }

    var resultElement = document.getElementById("result");
    resultElement.innerHTML = `Estimated cost for ${selectDistance} km using ${vehicleSegment}: ₹${cost.toFixed(
      2
    )}`; // Changed currency to ₹

    // Hide loading spinner
    document.getElementById("loading-spinner").classList.add("hidden");
  }, 1000); // Simulate loading delay
}
