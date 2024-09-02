const THEME_VALUES = {
  LIGHT: 'light',
  DARK: 'dark'
}

function generateTestUsers(count) {
  const users = []
  const baseName = 'Test'

  for (let i = 1; i <= count; i++) {
    users.push({
      id: i,
      name: `${baseName} ${i}`,
      status: false
    })
  }

  return users
}

const USER_LIST = [{ id: 0, name: 'Iskander', status: false }, ...generateTestUsers(50)]

export { THEME_VALUES, USER_LIST }
