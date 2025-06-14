import { initializeApp, getApps, cert, type App } from "firebase-admin/app"
import { getFirestore, type Firestore } from "firebase-admin/firestore"

let app: App | null = null
let db: Firestore | null = null

// Use environment variables or fallback to embedded credentials
const getServiceAccount = () => {
  // Try to use environment variables first
  if (process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL) {
    return {
      type: "service_account",
      project_id: process.env.FIREBASE_PROJECT_ID || "smarthylle",
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID,
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
      universe_domain: "googleapis.com",
    }
  }

  // Fallback to embedded credentials with proper formatting
  const privateKey = `-----BEGIN PRIVATE KEY-----
MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQClQ+5G9UEB46fq
Yo95BbXokuSUGEYOnilD0QLaWZhbmB8SQvpZjhyjzSz6KTVDWU9ECfpH1z6bq+Vm
JIfFm5qzT8zEKeux/W2KFbWh/e1aCwtVzrxeKaB8sSgL/1aBUQlmkdGwMbonoV50
uG7vNKYS7hiXNqPWJB9qmx4Ei8p9yz3zdF8OSaC0crJFRSiVF4bwXilXXrgUVIcf
pD6Q2EfSNxf2RhFLPIax5pyI4eLO0ZmAM2ID4+9pyZGAhn9SfESaTlKgbQaVlDht
pyqa9hPxBC3E91BgbJeepvJNpJHTCOR924XBpVDPLhAsw7cPyTA4fDJ5F8obWgt/
HwEL6MZFAgMBAAECggEAIj2MD28OWDAc8OKZQ7ODcCuJCMbrsukhdw/Fpcwk1StU
GrI+UNIxDF386NqjUrAdDGV90acerV2kwnAkojQ+TdLlg6oEz4SIjrC3SFgGNl7t
6woRfHfm7Ja+y5eMSnAqALKLDZSL81yLZ6bzswNHOkpS1XeIY9xpluqLAlmdK0kc
OaHN1PZTbgEhJJ0ZAaK0LL52SjfCf9oRB9r6V7EIzWc0xpHtzIjclnTmi/mt9XNn
PuILUg9I4bFhW4pc0EJObly4q6ckk57hfSXMeiYX44IsShyHi9/qyIcCUoVY5YuL
E1csNQjdeiDT+sGoI7VVCEjt69Vw2qsXEzb4h2bd6QKBgQDkdhSbMkp9c8DmpmFy
E10WvImjgrBEbII7yhl1UEU/LvoSz9pFQ+Dh+KxAqzO50L/n2uYKrcFy7UYw+l4O
cFIisiuqxm3aK+1zmgnGMXJ4LAPuhrfMxwE1DRyEB2sRQKmYYb98zRgjKbhkr10W
l8nEP9vXeQUlO9L+HsiWEeCwrQKBgQC5L7vsLEXLPgG6Pg6iwgGFLtE1Zv1jVx32
BdCA2dViegO+dSx77MMHr2toGX+v4iULJLlV/vLW4+R1WqnAbfeSnZlkDSZ72jkN
cOfZCFh5qoA+aIHgRFaU7Ev+spoQG1wJvgjNpt5EjIi2+/orFC6i4pKxLO2nfxjD
V3J7UNhm+QKBgQCanE7VuPMwc2XYskDAMtqMyItdXNRtegGo9NzFx80VNXWHxaKx
vX4zb1cjbLlUxzEYd8u27mA8ptcZzlZY7yqm0G085YzyWUgZM+Xpew08xozin8lD
jGoEvRrPPzX2NwyPU5eDnkj3gwSHHyagY5jod08QQ5Z33ESuNacJ6I9nAQKBgQC2
BY5AMLAVeog2KMM4BVt7Li5iwC11lG6VoNd1nyeXmPjPHtsvn+N/TVRUSSPxnGXu
0xT8yxCkWfH3y7qosy4yRYg9CJP4DuIfLQgmkoZsaEOPlCd8aY905+I2ohS+mjXY
OZrrkQZN+Jh0y6304+yHHA816URba5jKgMy9GxTp+QKBgQCPnXz9wtsC69slKzSQ
N/fa4V+WyhtbBjqUGZZTlsqzCU7gnyLXlDwgp9IRjydLKt10XEY9Kd0Mcre7AyDJ
PnIVvVPsj39mUQQ4Z8MCG/IQw+XV6MQSg/iHwUF6SpLeI18Y9LnQMItrN9MT8O+I
VLT94VFfjxiKhmYg3ouvvV5kmw==
-----END PRIVATE KEY-----`

  return {
    type: "service_account",
    project_id: "smarthylle",
    private_key_id: "3d18505d523f7e3bfddc6a40136a1dc5ea4b426b",
    private_key: privateKey,
    client_email: "firebase-adminsdk-fbsvc@smarthylle.iam.gserviceaccount.com",
    client_id: "108815593221561140588",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40smarthylle.iam.gserviceaccount.com",
    universe_domain: "googleapis.com",
  }
}

export function initializeFirebaseAdmin() {
  try {
    if (!app && getApps().length === 0) {
      const serviceAccount = getServiceAccount()

      console.log("Initializing Firebase Admin with project:", serviceAccount.project_id)

      app = initializeApp({
        credential: cert(serviceAccount as any),
        projectId: serviceAccount.project_id,
      })

      console.log("Firebase Admin initialized successfully")
    } else if (getApps().length > 0) {
      app = getApps()[0]
      console.log("Using existing Firebase Admin app")
    }

    if (!db) {
      db = getFirestore(app!)
      console.log("Firestore initialized successfully")
    }

    return { app, db }
  } catch (error) {
    console.error("Firebase Admin initialization error:", error)

    // More specific error handling
    if (error instanceof Error) {
      if (error.message.includes("string did not match the expected pattern")) {
        console.error("Private key format error. This might be a credential issue.")
      } else if (error.message.includes("project")) {
        console.error("Project ID error. Check Firebase project configuration.")
      }
    }

    throw new Error(`Firebase initialization failed: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

export function getFirebaseAdmin() {
  if (!app || !db) {
    return initializeFirebaseAdmin()
  }
  return { app, db }
}
