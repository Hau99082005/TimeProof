import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getAuth, Auth } from "firebase-admin/auth";

let auth: Auth | null = null;

export const getFirebaseAuth = (): Auth => {
  if (auth) {
    return auth;
  }

  const serviceAccount = {
    projectId: "timeproof-a543d",
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  };

  const currentApps = getApps();
  if (!currentApps.length) {
    const app = initializeApp({
      credential: cert(serviceAccount),
    });
    auth = getAuth(app);
  } else {
    const app = currentApps[0];
    auth = getAuth(app);
  }

  return auth;
};

