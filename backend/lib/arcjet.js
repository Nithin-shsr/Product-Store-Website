import arcjet, { detectBot, shield, tokenBucket } from "@arcjet/node";
import "dotenv/config";

export const aj = arcjet({
    key: process.env.ARCJET_KEY,
    characteristics: ["ip.src"],
    rules: [
        shield({ mode: "LIVE" }),
        detectBot
            ({
                mode: "DRYRUN", // Blocks requests.
                // Block all bots except the following
                allow: ["CATEGORY:SEARCH_ENGINE"] // Allow search engine bots
            }),
        tokenBucket
            ({
                mode: "LIVE",// Tracked by IP address by default, but this can be customized
                refillRate: 5, // Refill 5 tokens per interval
                interval: 10, // Refill every 10 seconds
                capacity: 10, // Bucket capacity of 10 tokens
            }),
    ]
})
