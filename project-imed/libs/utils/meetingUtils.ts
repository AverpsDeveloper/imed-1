import axios from "axios"
import moment from "moment";

// const encoded = Buffer.from(`${process.env.ZOOM_CLIENT_ID}:${process.env.ZOOM_CLIENT_SECRET}`, 'utf8').toString('base64')  

const { ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET } = process.env;

const ZOOM_CREDENTIALS = { ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET };

const getToken = async ({ ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET }: any) => {
    try {
        const response = await axios.post(
            "https://zoom.us/oauth/token",
            { grant_type: 'account_credentials', account_id: ZOOM_ACCOUNT_ID },
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Authorization': `Basic ${Buffer.from(`${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`).toString('base64')}`,
                }
            }
        );

        return response.data;

    } catch (e: any) {
        console.error(e?.message, e?.response?.data);
    }
}

export const genMeeting = async (meetDetail?: any) => {
    try {
        const token = await getToken(ZOOM_CREDENTIALS);
        const response = await axios.post(
            "https://api.zoom.us/v2/users/me/meetings",
            meetDetail ?? {
                "topic": "Doctor Appointment",
                "type": 2,
                // "start_time": "2024-02-30",
                "start_time": moment().format('yyyy-mm-dd'),
                "duration": 30,
                "timezone": "America/Mexico_City",
                "password": ""
            },
            {
                headers: {
                    'Authorization': `Bearer ${token.access_token}`,
                }
            }
        );
        return response.data;

    } catch (e: any) {
        console.error(e?.message, e?.response?.data);
    }
}



