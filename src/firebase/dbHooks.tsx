import { onValue, push, ref, get } from 'firebase/database';
import { db } from './firebase';

const getCurrentDateWithTimezone = () => {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Months are zero-based, so we add 1
  const day = currentDate.getDate();
  const hour = currentDate.getHours();
  const minute = currentDate.getMinutes();

  // Get the timezone offset in minutes and convert it to hours
  const timezoneOffsetInMinutes = currentDate.getTimezoneOffset();
  const timezoneOffsetHours = -Math.floor(timezoneOffsetInMinutes / 60);
  const timezoneOffsetMinutes = Math.abs(timezoneOffsetInMinutes) % 60;

  // Determine the sign of the timezone offset (+ or -)
  const timezoneSign = timezoneOffsetInMinutes > 0 ? '-' : '+';

  // Create the timezone string in the format ±HH:MM
  const timezone = `${timezoneSign}${String(timezoneOffsetHours).padStart(
    2,
    '0'
  )}:${String(timezoneOffsetMinutes).padStart(2, '0')}`;

  const currentDateWithTimezone = {
    year,
    month,
    day,
    hour,
    minute,
    timezone,
  };

  return currentDateWithTimezone;
};

export const useCreateChat = async () => {};

export const useSendMsg = async (message: string, sentBy?: string) => {
  const chatRef = ref(db, '/chatTest');

  const chatObj = {
    message,
    // sentBy,
    timeStamp: getCurrentDateWithTimezone(),
  };

  push(chatRef, chatObj);
};

export const getChatLog = (setState: (data: []) => void) => {
  const chatRef = ref(db, '/chatTest');
};

export const getUserDBInfo = async (uid: string) => {
  const userRef = ref(db, `/users/${uid}`);
  try {
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      const uid = snapshot.key;

      const userData = { ...data, uid };
      return userData;
    } else {
      console.log('data does not exist');
      return null;
    }
  } catch (error) {
    console.log('Data not found in the database.');
  }
};
