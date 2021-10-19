import admin from 'firebase-admin'

// eslint-disable-next-line @typescript-eslint/no-var-requires

function getDb() {
  const serviceAccountData: any = createServiceAccount()
  if (admin.apps.length == 0) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccountData),
    })
  }
  return admin.firestore()
}

function getAdmin() {
  const serviceAccountData: any = createServiceAccount()
  if (admin.apps.length == 0) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccountData),
    })
  }
  return admin
}

const createServiceAccount = () => {
  return {
    type: process.env.type,
    project_id: process.env.project_id,
    private_key_id: process.env.private_key_id,
    private_key: process.env.private_key?.replace(/\\n/g, '\n'),
    client_email: process.env.client_email,
    bucket_id: process.env.bucket_id,
    client_id: process.env.client_id,
    auth_uri: process.env.auth_uri,
    token_uri: process.env.token_uri,
    auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
    client_x509_cert_url: process.env.client_x509_cert_url,
  }
}

export const db = getDb()
export const firebase = getAdmin()
