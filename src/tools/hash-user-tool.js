export default function (user1, user2) {
  return [+user1.id, +user2.id].sort((a, b) => a - b).join('-')
}
