// index.js
export async function main(request) {
  // Логируем всё тело запроса для отладки
  console.log('Received webhook:', request.body);

  // CryptoBot ожидает JSON-ответ с статусом 200
  // ВАЖНО: Вы должны проверить подпись запроса на своём сервере для безопасности!
  // (Здесь это опущено для простоты примера)

  try {
    const data = request.body;
    console.log(`New invoice: ${data.invoice_id}, Status: ${data.status}`);

    // Здесь ваша логика: обновление базы данных, отправка уведомления и т.д.

    return {
      status: 200,
      body: { ok: true } // CryptoBot ожидает { "ok": true }
    };
  } catch (error) {
    console.error('Error processing webhook:', error);
    return {
      status: 500,
      body: { ok: false, error: 'Internal Server Error' }
    };
  }
}
