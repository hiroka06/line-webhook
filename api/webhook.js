import { Client } from '@line/bot-sdk';

// 環境変数から鍵を読み込む
const client = new Client({
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
});

export default async function handler(req) {
  // LINE Webhookの疎通確認のためのGETリクエスト応答
  if (req.method === 'GET') {
    return new Response("LINE webhook is running.");
  }

  // Webhookのボディ（メッセージ情報）をJSONとして受け取る
  const body = await req.json();
  const events = body.events;

  for (const event of events) {
    // 1. イベントがメッセージタイプであり、かつ画像（image）タイプであるかを確認
    if (event.type !== 'message' || event.message.type !== 'image') {
      // 画像でなければ、このイベントの処理をスキップ
      continue;
    }

    // 2. 返信する固定テキストを定義（テンプレートリテラルで改行と絵文字を保持）
    const replyText = `画像の受信が完了しました📸
「レシートプレゼントイベント」にご応募いただきありがとうございます。

応募期限は、2025年12月31日（水）23時59分まで。
レシートの枚数によって当選確率UPのチャンス🧾✨
※12月10日（水）〜31日（水）までにJoliyen.商品を対象店舗にて購入したレシートのみが対象です。

当選発表は、2026年1月9日（金）公式LINEより順次ご連絡させていただきます💌`;

    // 3. 応答メッセージを送信
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

  // LINE Webhookからの受信完了を通知（必須）
  return new Response("OK", { status: 200 });
}
