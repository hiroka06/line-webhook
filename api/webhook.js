// ... (コードの上部はそのまま)

for (const event of events) {
    // 1. メッセージが画像（image）タイプであるかを確認
    if (event.type !== 'message' || event.message.type !== 'image') {
        // 画像でなければ、このイベントの処理をスキップし、次へ
        continue;
    }

    // 2. 返信する固定テキストを定義
    const replyText = "画像を送信いただきありがとうございます！自動応答メッセージです。";

    // 3. 応答メッセージを送信（追加必須の処理）
    try {
        await client.replyMessage({
            replyToken: event.replyToken,
            messages: [{
                type: 'text',
                text: replyText,
            }],
for (const event of events) {
    // 1. メッセージが画像（image）タイプであるかを確認
    if (event.type !== 'message' || event.message.type !== 'image') {
        // 画像でなければ、このイベントの処理をスキップし、次へ
        continue;
    }

    // 2. 返信する固定テキストを定義
    const replyText = "画像を送信いただきありがとうございます！自動応答メッセージです。";

    // 3. 応答メッセージを送信（必須）
    try {
        await client.replyMessage({
            replyToken: event.replyToken,
            messages: [{
                type: 'text',
                text: replyText,
            }],
        });
    } catch (error) {
        console.error('Reply Message Error:', error);
    }
}
