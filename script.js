const themeToggler = document.getElementById('theme-toggler');
const body = document.body;
const serverInfo = document.getElementById('server-info');
const refreshButton = document.getElementById('refresh-status');
const apiResponse = document.getElementById('response-content');

const fetchServerStatus = async () => {
    serverInfo.innerHTML = "<p><strong>Fetching server status...</strong></p>";
    
    try {
        const response = await fetch('http://infra-sg01.zygo.cloud:1034/status/java?ip=mc.hypixel.net&port=25565');
        const data = await response.json();
        
        if (data.online) {
            serverInfo.innerHTML = `
                <p><strong>Status:</strong> Online</p>
                <p><strong>Version:</strong> ${data.version}</p>
                <p><strong>Players Online:</strong> ${data.players_online}</p>
                <p><strong>Max Players:</strong> ${data.max_players}</p>
                <p><strong>Latency:</strong> ${data.latency} ms</p>
                ${data.icon ? `<img src="${data.icon}" alt="Server Icon">` : ''}
            `;
        } else {
            serverInfo.innerHTML = `
                <p><strong>Status:</strong> Offline</p>
                <p><strong>Error:</strong> ${data.error}</p>
            `;
        }
    } catch (error) {
        serverInfo.innerHTML = `<p><strong>Error:</strong> ${error.message}</p>`;
    }
};

// Fetch status on page load
fetchServerStatus();

// Refresh status when the button is clicked
refreshButton.addEventListener('click', fetchServerStatus);

// Fetch the demo API response for the example section
const fetchDemoAPI = async () => {
    apiResponse.innerHTML = "<p><strong>Fetching API response...</strong></p>";
    
    try {
        const response = await fetch('http://infra-sg01.zygo.cloud:1034/status/java?ip=mc.hypixel.net&port=25565');
        const data = await response.json();
        
        apiResponse.innerHTML = JSON.stringify(data, null, 2);
    } catch (error) {
        apiResponse.innerHTML = `<p><strong>Error:</strong> ${error.message}</p>`;
    }
};

// Theme toggler logic
themeToggler.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    themeToggler.textContent = body.classList.contains('dark-mode') ? '☀️ Light Mode' : '🌙 Dark Mode';
});
