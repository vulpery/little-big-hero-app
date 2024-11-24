import { User } from "../model/user";

export class UserService {
  static readonly INSTANCE = new UserService();

  private constructor() {}

  private serverUrl = "https://little-big-hero-backend.vulpery.com";

  public async login(walletAddress: string): Promise<User> {
    return fetch(`${this.serverUrl}/users/${walletAddress}`).then((res) => {
      // store userinformation in localstorage
      localStorage.setItem("walletAddress", walletAddress);
      return res.json();
    });
  }

  public async logout(): Promise<void> {
    // remove userinformation from localstorage
    localStorage.removeItem("walletAddress");
    return;
  }

  public async getCurrentUser(): Promise<User | null> {
    const walletAddress = localStorage.getItem("walletAddress");
    if (!walletAddress) {
      return Promise.resolve(null);
    }
    return this.getUser(walletAddress);
  }

  public async getUsers(): Promise<User[]> {
    return fetch(`${this.serverUrl}/users/`).then((res) => res.json());
  }

  public async getUser(userId: string): Promise<User> {
    return fetch(`${this.serverUrl}/users/${userId}`)
      .then((res) => res.status != 404 && res.json())
      .catch(() => null);
  }

  public async createUser(user: User): Promise<User> {
    return fetch(`${this.serverUrl}/users/`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  }

  public async updateUser(user: User): Promise<User> {
    return fetch(`${this.serverUrl}/users/${user.wallet_address}`, {
      method: "PUT",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  }

  public async deleteUser(userId: string): Promise<void> {
    return fetch(`${this.serverUrl}/users/${userId}`, {
      method: "DELETE",
    }).then(() => undefined);
  }
}
