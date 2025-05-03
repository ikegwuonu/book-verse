export const config = {
  env: {
    apiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT!,
    prodApiEndpoint: process.env.NEXT_PUBLIC_PROD_API_ENDPOINT!,
    imagekit: {
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
      urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
    },
    firebaseServiceAcc: process.env.FIREBASE_SERVICE_ACCOUNT_KEY,
    emailJS: {
      publicKey: process.env.NEXT_PUBLIC_EMAILJS_KEY!,
      templateId: process.env.TEMPLATE_ID!,
      serviceId: process.env.SERVICE_ID!,
    },
    // databaseUrl: process.env.DATABASE_URL!,
    // upstash: {
    //   redisUrl: process.env.UPSTASH_REDIS_URL!,
    //   redisToken: process.env.UPSTASH_REDIS_TOKEN!,
    //   qstashUrl: process.env.QSTASH_URL!,
    //   qstashToken: process.env.QSTASH_TOKEN!,
    // },
    // resendToken: process.env.RESEND_TOKEN!,
  },
};
