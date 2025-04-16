import HttpService from "./http.service.ts";

class ContractService extends HttpService {
  constructor() {
    super();
  }

  async getNameAndBalance(userAddress: string) {
    return await this.get({
      url: `getNameAndBalance`,
      params: { userAddress },
    });
  }
}

const contractService = new ContractService();

export default contractService;
