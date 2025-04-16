import HttpService from "./http.service.ts";

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

interface UserResponse {
  name: string | null;
  balance: string;
  dollars: string;
  history: HistoryItem[];
  requests: RequestItem[];
}

class ContractService extends HttpService {
  constructor() {
    super();
  }

  async getNameAndBalance(userAddress: string): Promise<UserResponse> {
    return await this.get<UserResponse>({
      url: `getNameAndBalance`,
      params: { userAddress },
    });
  }
}

const contractService = new ContractService();

export default contractService;
