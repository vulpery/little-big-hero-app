import { Quest } from "../model/quest";

export class QuestService {
  static readonly INSTANCE = new QuestService();

  private constructor() {}

  private serverUrl = "https://little-big-hero-backend.vulpery.com";

  public async getQuests(): Promise<Quest[]> {
    return fetch(`${this.serverUrl}/quests/`).then((res) => res.json());
  }

  public async getQuest(questId: string): Promise<Quest> {
    return fetch(`${this.serverUrl}/quests/${questId}`).then((res) =>
      res.json(),
    );
  }

  public async createQuest(quest: Quest): Promise<Quest> {
    return fetch(`${this.serverUrl}/quests/`, {
      method: "POST",
      body: JSON.stringify(quest),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  }

  public async updateQuest(id: string, quest: Quest): Promise<Quest> {
    return fetch(`${this.serverUrl}/quests/${id}`, {
      method: "PUT",
      body: JSON.stringify(quest),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  }

  public async deleteQuest(questId: string): Promise<void> {
    return fetch(`${this.serverUrl}/quests/${questId}`, {
      method: "DELETE",
    }).then(() => undefined);
  }
}
