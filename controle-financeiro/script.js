const ctx = document.getElementById('financeChart').getContext('2d');

// Salário total
let totalSalary = 2100;

// Recupera dados salvos ou inicializa
let items = JSON.parse(localStorage.getItem('financeItems')) || [];
let remainingSalary = totalSalary - items.reduce((sum, item) => sum + item.value, 0,);

// Gráfico inicial
const financeChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Salário Total', ...items.map(item => item.name)],
        datasets: [{
            label: 'Gastos e Salário',
            data: [remainingSalary, ...items.map(item => item.value)],
            backgroundColor: ['#4CAF50', ...items.map(item => item.color)],
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
        }
    }
});

// Carrega lista inicial e salário
updateItemList();
updateSalaryDisplay();

// Adiciona ou atualiza itens
document.getElementById('add-item').addEventListener('click', () => {
    const name = document.getElementById('item-name').value.trim();
    const value = parseFloat(document.getElementById('item-value').value);
    const color = document.getElementById('item-color').value;

    if (name && value > 0) {
        // Verifica se o item já existe
        const existingItem = items.find(item => item.name === name);

        if (existingItem) {
            existingItem.value += value; // Atualiza valor
        } else {
            items.push({ name, value, color }); // Adiciona novo item
        }

        // Atualiza salário restante e Local Storage
        updateRemainingSalary();
        localStorage.setItem('financeItems', JSON.stringify(items));

        // Atualiza gráfico e lista
        updateChart();
        updateItemList();
        updateSalaryDisplay();

        // Limpa os campos
        document.getElementById('item-name').value = '';
        document.getElementById('item-value').value = '';
    }
});

// Remove um item
function deleteItem(name) {
    items = items.filter(item => item.name !== name);

    // Atualiza salário restante e Local Storage
    updateRemainingSalary();
    localStorage.setItem('financeItems', JSON.stringify(items));

    // Atualiza gráfico e lista
    updateChart();
    updateItemList();
    updateSalaryDisplay();
}

// Atualiza o gráfico
function updateChart() {
    remainingSalary = totalSalary - items.reduce((sum, item) => sum + item.value, 0);

    financeChart.data.labels = ['Salário Total', ...items.map(item => item.name)];
    financeChart.data.datasets[0].data = [remainingSalary, ...items.map(item => item.value)];
    financeChart.data.datasets[0].backgroundColor = ['#4CAF50', ...items.map(item => item.color)];
    financeChart.update();
}

// Atualiza a lista de itens
function updateItemList() {
    const itemList = document.getElementById('item-list');
    itemList.innerHTML = '';

    items.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.name} - R$ ${item.value.toFixed(2)}
            <span style="background-color: ${item.color}; padding: 5px; border-radius: 50%; display: inline-block;"></span>
            <button onclick="deleteItem('${item.name}')">Apagar</button>
        `;
        itemList.appendChild(li);
    });
}

// Atualiza salário restante
function updateRemainingSalary() {
    remainingSalary = totalSalary - items.reduce((sum, item) => sum + item.value, 0);
}

// Atualiza exibição do salário
function updateSalaryDisplay() {
    document.getElementById('salary-display').innerText = `Salário Restante: R$ ${remainingSalary.toFixed(2)}`;
}

// Salva os dados ao sair da página
window.addEventListener('beforeunload', () => {
    localStorage.setItem('financeItems', JSON.stringify(items));
});

