import { getUsers, saveUser } from './common';

// ============================================
// MOCK API (Given in question)
// ============================================
export const api = {
  signup: async (email, username, password) => {
    await new Promise((r) => setTimeout(r, 500));
    if (getUsers().find((u) => u.email === email)) {
      throw new Error('Email already exists');
    }
    saveUser({ email, username, password });
    return {
      data: {
        userDetails: { id: Date.now(), email, username },
        accessToken: 'token_' + Date.now(),
        refreshToken: 'refresh_' + Date.now(),
      },
    };
  },

  login: async (email, password) => {
    await new Promise((r) => setTimeout(r, 500));
    const user = getUsers().find(
      (u) => u.email === email && u.password === password
    );
    if (!user) throw new Error('Invalid credentials');
    return {
      data: {
        userDetails: { id: Date.now(), email, username: user.username },
        accessToken: 'token_' + Date.now(),
        refreshToken: 'refresh_' + Date.now(),
      },
    };
  },

  oauthLogin: async (provider) => {
    await new Promise((r) => setTimeout(r, 500));
    return {
      data: {
        userDetails: {
          id: Date.now(),
          email: `user@${provider}.com`,
          username: `${provider} User`,
        },
        accessToken: `oauth_token_${Date.now()}`,
        refreshToken: `oauth_refresh_${Date.now()}`,
      },
    };
  },
};
