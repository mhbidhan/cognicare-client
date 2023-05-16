import * as config from '../config';
import { SERVER_URL } from '../config';

export async function createMeeting() {
  try {
    const vonageTokenUrl = `${SERVER_URL}/vonage/token`;
    const tokenRes = await fetch(vonageTokenUrl);
    const vonageToken = await tokenRes.json();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${config.TOKEN}`,
        Authorization: `Bearer ${vonageToken.token}`,
      },
      body: JSON.stringify({
        display_name: 'Testing CogniCare',
      }),
    };
    console.log(vonageToken.token);

    const vonageMeetingUrl = 'https://api-eu.vonage.com/beta/meetings/rooms';

    const res = await fetch(vonageMeetingUrl, options);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}
