// Função para obter os dispositivos do servidor
async function loadDevices() {
  const response = await fetch('http://localhost:3000/devices');
  const devices = await response.json();
  const tableBody = document.getElementById('devices-table-body');

  // Preenche a tabela com os dispositivos
  devices.forEach(device => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${device.hostname}</td>
        <td>${device.ip}</td>
        <td>${device.data_last_ping}</td>
        <td style="color: ${device.status === 'Online' ? 'green' : 'red'}">${device.status}</td>
    `;    
    
    tableBody.appendChild(row);
  });
}

// Carregar os dispositivos assim que a página for carregada
loadDevices();