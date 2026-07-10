const getUsers = () => JSON.parse(localStorage.getItem('users') || '[]');

const saveUser = (user) => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
};

export { getUsers, saveUser };
