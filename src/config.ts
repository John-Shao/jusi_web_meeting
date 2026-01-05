export const DemoVersion = '2.0.0';

export const RESOLUTIOIN_LIST = [
  {
    text: '160 * 160',
    val: {
      width: 160,
      height: 160,
    },
    bitrateRange: {
      min: 40,
      max: 150,
    },
  },
  {
    text: '320 * 180',
    val: {
      width: 320,
      height: 180,
    },
    bitrateRange: {
      min: 80,
      max: 350,
    },
  },
  {
    text: '320 * 240',
    val: {
      width: 320,
      height: 240,
    },
    bitrateRange: {
      min: 100,
      max: 400,
    },
  },
  {
    text: '640 * 360',
    val: {
      width: 640,
      height: 360,
    },
    bitrateRange: {
      min: 200,
      max: 1000,
    },
  },
  {
    text: '480 * 480',
    val: {
      width: 480,
      height: 480,
    },
    bitrateRange: {
      min: 200,
      max: 1000,
    },
  },
  {
    text: '640 * 480',
    val: {
      width: 640,
      height: 480,
    },
    bitrateRange: {
      min: 250,
      max: 1000,
    },
  },
  {
    text: '960 * 540',
    val: {
      width: 960,
      height: 540,
    },
    bitrateRange: {
      min: 400,
      max: 1600,
    },
  },
  {
    text: '1280 * 720',
    val: {
      width: 1280,
      height: 720,
    },
    bitrateRange: {
      min: 500,
      max: 2000,
    },
  },
  {
    text: '1920 * 1080',
    val: {
      width: 1920,
      height: 1080,
    },
    bitrateRange: {
      min: 800,
      max: 3000,
    },
  },
];

export const BITRATEMAP: { [key: string]: number[] } = {
  '160 * 160': [40, 150],
  '320 * 180': [80, 350],
  '320 * 240': [100, 400],
  '640 * 360': [200, 1000],
  '480 * 480': [200, 1000],
  '640 * 480': [250, 1000],
  '960 * 540': [400, 1600],
  '1280 * 720': [500, 2000],
  '1920 * 1080': [800, 3000],
};

export const FRAMERATE = [15, 20, 24];

export const isDev = window.location.hostname.includes('localhost');
export const Disclaimer = 'https://www.volcengine.com/docs/6348/68916';
export const ReversoContex = 'https://www.volcengine.com/docs/6348/68918';
export const UserAgreement = 'https://www.volcengine.com/docs/6348/128955';
export const BASENAME = '/rtc/solution/vertcroom';
export const HOST = 'https://rtc-test.bytedance.com';

export const userConfig = {
  appId: process.env.RTC_APP_ID || '',
  appKey: process.env.RTC_APP_KEY || '',
  accessKeyId: process.env.RTC_ACCESS_KEY_ID || '',
  accessKeySecret: process.env.RTC_ACCESS_KEY_SECRET || '',
  accountId: process.env.RTC_ACCOUNT_ID || '',
};

export const tosConfig = {
  accessKeyId: process.env.TOS_ACCESS_KEY_ID || '',
  accessKeySecret: process.env.TOS_ACCESS_KEY_SECRET || '',
  accountId: process.env.TOS_ACCOUNT_ID || '',
  region: process.env.TOS_REGION || '',
  endpoint: process.env.TOS_ENDPOINT || '',
  bucket: process.env.TOS_BUCKET || '',
};
