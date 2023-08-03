import { USER_ID_COOKIE } from "@/constants";
import { nanoid } from "nanoid";
import { cookies } from "next/headers";

export function trackUserWithCookie() {
  const existingUserId = getExistingUserId();

  // If the user ID cookie does not exist, create a new one
  if (!existingUserId) {
    const newUserId = generateNewUserId();
    setUserIdCookie(newUserId);
    return newUserId;
  }

  // Return the existing user ID
  return existingUserId;
}

export function getExistingUserId(ahmet = "hello") {
  return cookies().get(USER_ID_COOKIE)?.value || null;
}

function generateNewUserId() {
  return nanoid();
}

function setUserIdCookie(newUserId: string) {
  const oneDayFromNow = addOneDay(new Date());
  cookies().set(USER_ID_COOKIE, newUserId, {
    httpOnly: true,
    expires: oneDayFromNow,
  });
}

function addOneDay(date: Date) {
  const dateCopy = new Date(date);
  dateCopy.setDate(date.getDate() + 1);
  return dateCopy;
}
