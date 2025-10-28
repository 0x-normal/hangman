//import { withValidManifest } from "@coinbase/onchainkit/minikit";
//import { minikitConfig } from "../../../minikit.config";

export async function GET() {
  return Response.json({
  "accountAssociation": {  // these will be added in step 5
    "header": "",
    "payload": "",
    "signature": ""
  },
  "baseBuilder": {
    "ownerAddress": "0xE01CFDD6e6cB41C2b33605138BB2E53E492A5CB3" // add your Base Account address here
  },
  "miniapp": {
    "version": "1",
    "name": "Hangman Game",
    "homeUrl": "https://hangman-nine-tau.vercel.app/",
    "iconUrl": "https://ex.co/i.png",
    "splashImageUrl": "https://ex.co/l.png",
    "splashBackgroundColor": "#ffffff",
    "webhookUrl": "https://ex.co/api/webhook",
    "subtitle": "Fast, fun, social",
    "description": "A fast, fun way to challenge friends in real time.",
    "screenshotUrls": [
      "https://ex.co/s1.png",
      "https://ex.co/s2.png",
      "https://ex.co/s3.png"
    ],
    "primaryCategory": "games",
    "tags": ["game", "fun", "miniapp", "baseapp", "hangman", "based"],
    "heroImageUrl": "https://ex.co/og.png",
    "tagline": "Play instantly",
    "ogTitle": "Example Mini App",
    "ogDescription": "Challenge friends in real time.",
    "ogImageUrl": "https://ex.co/og.png",
    "noindex": false
  }
});
}
