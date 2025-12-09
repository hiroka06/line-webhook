import { Client } from '@line/bot-sdk';

export const config = {
  runtime: 'edge',
};

const client = new Client({
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
});

export default async function handler(req) {
  // LINEの疎通確認 (GET) の場合
  if (req.method === 'GET') {
    return new Response("LINE webhook is running.");
  }

  const body = await req.json();
  const events = body.events;

  for (const event of events) {
    // 1. メッセージが画像（image）タイプであるかを確認
    if (event.type !== 'message' || event.message.type !== 'image') {
      // 画像でなければ、このイベントの処理をスキップし、次へ
      continue;
    }

    // 2. 返信する固定テキストを定義
    const replyText = "画像を送信いただきありがとうございます！自動応答メッセージです。";

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

  // LINE Webhookからの受信完了を通知
  return new Response("OK", { status: 200 });
}
