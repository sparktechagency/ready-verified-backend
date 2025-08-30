import axios from 'axios';
import { encodeBase64 } from 'bcryptjs';
import config from '../config';

export const generateZoomLink = async () => {
  try {
    const token = await getAccessToken();

    const meetingConfig = {
      topic: 'Client Meeting',
      type: 1, // Instant meeting
      settings: {
        host_video: true,
        participant_video: true,
        join_before_host: true, // Optional: allow joining before host
        password: '',           // No password
        enforce_login: false,   // Anyone can join
      },
    };

    const response = await axios.post(
      'https://api.zoom.us/v2/users/me/meetings',
      meetingConfig,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.join_url; // This is your Fiverr-style link
  } catch (error: any) {
    console.error(error.response?.data || error.message);
  }
};


export async function getAccessToken() {
  const accountId = config.zoom.account_id;
  const clientId = config.zoom.client_id!;
  const clientSecret = config.zoom.client_secret!;

  const tokenResponse = await axios.post(
    `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${accountId}`,
    {},
    {
      auth: {
        username: clientId,
        password: clientSecret,
      },
    }
  );

  return tokenResponse.data.access_token;
}
