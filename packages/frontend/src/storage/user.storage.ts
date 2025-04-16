import { create } from "zustand";
import contractService from "../services/contract.service";

interface HistoryItem {
  key: string;
  type: string;
  amount: string;
  message: string;
  address: string;
  subject: string;
}

interface RequestItem {
  address: string;
  amount: string;
  message: string;
  subject: string;
}

interface UserState {
  name: string | null;
  balance: string;
  dollars: string;
  history: HistoryItem[];
  requests: RequestItem[];
  isLoading: boolean;
  setUserData: (userAddress: string) => Promise<void>;
  getUserData: () => Omit<
    UserState,
    "setUserData" | "getUserData" | "clearUserData"
  >;
  clearUserData: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  name: null,
  balance: "0",
  dollars: "0",
  history: [],
  requests: [],
  isLoading: false,

  setUserData: async (userAddress: string) => {
    set({ isLoading: true });
    try {
      const data: any = await contractService.getNameAndBalance(userAddress);

      set({
        name: Array.isArray(data.name) ? data.name[0] : (data.name ?? null),
        balance: data.balance,
        dollars: data.dollars,
        history: data.history ?? [],
        requests: data.requests ?? [],
        isLoading: false,
      });
    } catch (error) {
      console.error("Failed to fetch user data", error);
      set({ isLoading: false });
    }
  },

  getUserData: () => {
    const { name, balance, dollars, history, requests, isLoading } = get();
    return { name, balance, dollars, history, requests, isLoading };
  },

  clearUserData: () => {
    set({
      name: null,
      balance: "0",
      dollars: "0",
      history: [],
      requests: [],
      isLoading: false,
    });
  },
}));
