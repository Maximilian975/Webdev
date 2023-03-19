const datasets = {
  temperature: {
    name: 'Temperature',
    data: [
      { date: '2023-01-01', value: 30 },
      { date: '2023-02-01', value: 28 },
      { date: '2023-03-01', value: 25 },
      { date: '2023-04-01', value: 20 },
      { date: '2023-05-01', value: 18 },
      { date: '2023-06-01', value: 22 },
      { date: '2023-07-01', value: 25 },
      { date: '2023-08-01', value: 27 },
      { date: '2023-09-01', value: 28 },
      { date: '2023-10-01', value: 26 }
    ]
  },
  moisture: {
    name: 'Moisture',
    data: [
      { date: '2023-01-01', value: 70 },
      { date: '2023-02-01', value: 65 },
      { date: '2023-03-01', value: 60 },
      { date: '2023-04-01', value: 55 },
      { date: '2023-05-01', value: 50 },
      { date: '2023-06-01', value: 45 },
      { date: '2023-07-01', value: 50 },
      { date: '2023-08-01', value: 55 },
      { date: '2023-09-01', value: 60 },
      { date: '2023-10-01', value: 65 }
    ]
  }
};

const chartContainer = document.querySelector('.chart-container');
const tabs = document.querySelectorAll('.tab');
const startDate = document.querySelector('#start-date');
const endDate = document.querySelector('#end-date');

let activeDataset = 'temperature';

// Update chart when dataset tab is clicked
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    alert("jek")
    // Remove active class from all tabs
    tabs.forEach(tab => tab.classList.remove('active'));
    // Add active class to clicked tab
    tab.classList.add('active');
    // Set active dataset to clicked tab's dataset
    activeDataset = tab.dataset.dataset;
    // Redraw chart with active dataset
    drawChart();
  });
});

// Update chart when date range changes
startDate.addEventListener('change', drawChart);
endDate.addEventListener('change', drawChart);

function drawChart() {
  // Get selected date range
  const start = new Date(startDate.value);
  const end = new Date(endDate.value);
  // Filter data for selected date range and active dataset
  const data = datasets[activeDataset].data.filter(d => {
    const date = new Date(d.date);
    return date >= start && date <= end;
  });
  // Sort data by date
  data.sort((a, b) => new Date(a.date) - new Date(b.date));
  // Map data to chart.js format
  const chartData = {
    labels: data.map(d => d.date),
    datasets: [{
      label: datasets[activeDataset].name,
      data: data.map(d => d.value),
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)'
    }]
  };
  // Destroy old chart if it exists
  if (window.chart) {
    window.chart.destroy();
    }
    // Create new chart
    window.chart = new Chart(chartContainer, {
    type: 'line',
    data: chartData,
    options: {
    responsive: true,
    plugins: {
    legend: {
    position: 'top',
    },
    title: {
    display: true,
    text: 'Temperature Chart'
    }
    },
    scales: {
    x: {
    type: 'time',
    time: {
    unit: 'month'
    },
    ticks: {
    source: 'labels'
    }
    },
    y: {
    suggestedMin: 0,
    suggestedMax: 100
    }
    }
    }
    });
    }
    
    // Draw initial chart
    drawChart();
