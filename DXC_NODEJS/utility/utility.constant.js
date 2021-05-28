export default class Utility {
   //Get the Sorted Users by email
   static sortUsersByEmail(users) {
      return users.sort((a, b) => a.email.localeCompare(b.email))
   }
}