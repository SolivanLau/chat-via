import { onValue, push, ref, get } from 'firebase/database';
import { db } from './firebase';

// GENERATE TIMESTAMP
const getCurrentDateWithTimezone = () => {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // adjust 0 based months
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

// CREATE CHAT WITH USER
export const useCreateChat = async () => {};

export const useSendMsg = async (message: string, sentBy?: string) => {
  const chatRef = ref(db, '/chatTest');

  const chatObj = {
    message,
    sentBy,
    timeStamp: getCurrentDateWithTimezone(),
  };

  push(chatRef, chatObj);
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

export const watchUserDBInfo = () => {
  const usersRef = ref(db, '/users');

  onValue(usersRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      console.log(data);

      return data;
    } else {
      throw new Error('no data at current reference point');
    }
  });
};
