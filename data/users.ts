import type { User } from "@/types"

export const users: User[] = [
  // Vanlige brukere
  { username: "bruker1", password: "pass1", role: "user", itemsSaved: 45 },
  { username: "bruker2", password: "pass2", role: "user", itemsSaved: 32 },
  { username: "bruker3", password: "pass3", role: "user", itemsSaved: 67 },
  { username: "bruker4", password: "pass4", role: "user", itemsSaved: 23 },
  { username: "bruker5", password: "pass5", role: "user", itemsSaved: 89 },
  { username: "bruker6", password: "pass6", role: "user", itemsSaved: 12 },
  { username: "bruker7", password: "pass7", role: "user", itemsSaved: 56 },
  { username: "bruker8", password: "pass8", role: "user", itemsSaved: 78 },
  { username: "bruker9", password: "pass9", role: "user", itemsSaved: 34 },
  { username: "bruker10", password: "pass10", role: "user", itemsSaved: 91 },

  // Admin brukere
  { username: "admin1", password: "adminpass1", role: "admin", itemsSaved: 0 },
  { username: "admin2", password: "adminpass2", role: "admin", itemsSaved: 0 },
  { username: "admin3", password: "adminpass3", role: "admin", itemsSaved: 0 },
  { username: "admin4", password: "adminpass4", role: "admin", itemsSaved: 0 },
  { username: "admin5", password: "adminpass5", role: "admin", itemsSaved: 0 },
]
