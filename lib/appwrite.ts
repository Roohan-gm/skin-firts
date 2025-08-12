import { Account, Client, ID } from 'react-native-appwrite';

export const config = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.roohan_ghuram.skinfirts',
  project: '6892c602002a2faab109',
  databaseId: '689accfa003d78a8ade5',
  userCollectionId: '689acd3a002fd1f31afe',
  storageId: '689ad1f8002b93259364',
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.project) // Your project ID
  .setPlatform(config.platform); // Your application ID or bundle ID.

 const account = new Account(client);

export const createUser = async (email: string, password: string, name: string | undefined) => {
  const response = await account.create(ID.unique(), email, password, name).then(
    function (response) {
      console.log(response);
    },
    function (error) {
      console.log(error);
    }
  );
  return response;
};
