import { Client } from '@line/bot-sdk';

export const config = {
  runtime: 'edge',
};

const client = new Client({
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
});

export default async function handler(req) {
  // LINE の確認用（GET の場合）
  if (req.method === 'GET') {
    return new Response("LINE webhook is running.");
  }

  const body = await req.json();
  const events = body.events;

  for (const event of events) {
    // 画像メッセージだけ反応
    if (event.type === 'message' && event.message.type === 'image') {
      const messageText =
`画像の受信が完了しました📸
「レシートプレゼントイベント」にご応募いただきありがとうございます。

応募期限は、2025年12月31日（水）23時59分まで。
レシートの枚数によって当選確率UPのチャンス🧾✨
※12月10日（水）〜31日（水）までにJoliyen.商品を対象店舗にて購入したレシートのみが対象です。

当選発表は、2026年1月9日（金）公式LINEより順次ご連絡させていただきます💌`;

      await client.replyMessage(event.replyToken, {
        type: "text",
        text: messageText
      });
    }
  }

  return new Response("OK");
}
