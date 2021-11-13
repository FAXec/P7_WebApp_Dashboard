const alertBanner = document.getElementById("alert");
const trafficCanvas = document.getElementById("traffic-chart");
const dailyCanvas = document.getElementById("daily-chart");


let markup = `<div class ="alert-banner"> <p><strong>Alert:</strong>You have <strong>6</strong> overdue tasks to complete.</p>
<p class="alert-banner-close">x</p>
</div>`;

alertBanner.innerHTML = markup;

alertBanner.addEventListener("click", function(e) {
  if (e.target.classList.contains("alert-banner-close")) {
    alertBanner.style.display = "none";
  }
});

let trafficData = {
    labels: ["16-22", "23-29", "30-5", "6-12", "13-19", "20-26", "27-3", "4-10", "11-17", "18-24", "25-31"],
    datasets: [{ data: [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500, 2500], 
        backgroundColor: "rgba(116, 119, 191, 0.3)", 
        borderwidth: 1,
    }]
};

let trafficOptions = {
    backgroundColor: "rgba(112, 104,201, 0.5)",
    fill: true,
    aspectRatio: 2.5,
    animation: {
        duration: 0
    },
    scales: { 
        y: {
            beginAtZero: true
        }
    },
    plugins: {
        legend: {
            display: false
        }
    }
},

let trafficChart = new Chart(trafficCanvas,{
    type: 'line', 
    data: trafficData, 
    options: trafficOptions
});


const dailyData = {
    labels: ["S", "M", "T", "W", "T", "F", "S"],
    datasets: [{
        label: "# of Hits", 
        data: [75, 115, 175, 125, 225, 200, 100],
        backgroundColor: "rgba(116, 119, 191, 0.3)",
        borderWidth: 1  }]
};

const dailyOptions = {
    scales: {
        y: {
            beginAtZero: true
        }
    }

    plugins: {
        legend: {
            display: false
        }
    }
};

let dailyChart = new Chart(dailyCanvas, {
    type: 'bar',
    data: dailyData,
    options: dailyOptions
});

        



