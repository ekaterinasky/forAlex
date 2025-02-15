const API_URL = 'https://api.tbank.ru/brokerage/trades'; // Замените на реальный URL API
const API_TOKEN = 'your_api_token_here'; // Замените на реальный токен

async function fetchTrades() {
    try {
        const response = await fetch(API_URL, {
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        throw error;
    }
}

function displayTrades(trades) {
    const tbody = document.getElementById('trades-body');
    tbody.innerHTML = '';

    trades.forEach(trade => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${new Date(trade.date).toLocaleString()}</td>
            <td class="${trade.type === 'buy' ? 'buy' : 'sell'}">${
                trade.type === 'buy' ? 'Покупка' : 'Продажа'
            }</td>
            <td>${trade.ticker}</td>
            <td>${trade.quantity}</td>
            <td>${trade.price.toFixed(2)} ₽</td>
            <td>${(trade.quantity * trade.price).toFixed(2)} ₽</td>
        `;
        tbody.appendChild(row);
    });
}

async function loadTrades() {
    const loading = document.getElementById('loading');
    const errorElement = document.getElementById('error');
    
    try {
        loading.classList.remove('hidden');
        errorElement.classList.add('hidden');
        
        const data = await fetchTrades();
        displayTrades(data.trades);
    } catch (error) {
        errorElement.textContent = `Ошибка: ${error.message}`;
        errorElement.classList.remove('hidden');
    } finally {
        loading.classList.add('hidden');
    }
}

// Загружаем сделки при загрузке страницы
document.addEventListener('DOMContentLoaded', loadTrades);