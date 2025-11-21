// index.js
const http = require('http');

const server = http.createServer(async (req, res) => {
  // Разрешаем только POST-запросы
  if (req.method === 'POST' && req.url === '/') {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        console.log('Received webhook:', data);
        
        // Ваша логика обработки здесь
        console.log(`Invoice ID: ${data.invoice_id}, Status: ${data.status}`);
        
        // Отправляем успешный ответ CryptoBot
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true }));
      } catch (error) {
        console.error('Error processing webhook:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: 'Internal Server Error' }));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: false, error: 'Not Found' }));
  }
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Webhook server running on port ${PORT}`);
});
