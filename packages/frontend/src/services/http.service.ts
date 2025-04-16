/* eslint-disable */
/* tslint:disable */
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
// eslint-disable-next-line @typescript-eslint/ban-ts-comment

import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

interface HttpConfig extends AxiosRequestConfig {
  withAuth?: boolean;
}

export default class HttpService {
  private readonly baseUrl: string;
  private fetchingService: AxiosInstance;
  private readonly apiVersion: string;

  constructor(
    baseUrl = import.meta.env.VITE_BACKEND_URL,
    fetchingService: AxiosInstance = axios,
    apiVersion: string = "api",
  ) {
    this.baseUrl = baseUrl;
    this.fetchingService = fetchingService;
    this.apiVersion = apiVersion;
  }

  private getFullApiUrl(url: string): string {
    return `${this.baseUrl}/${this.apiVersion}/${url}`;
  }

  private populateTokenToHeaderConfig(): { Authorization: string | null } {
    return {
      Authorization: `tma test`,
    };
  }

  private extractUrlAndDataFromConfig({
    data: _data,
    url: _url,
    ...configWithoutDataAndUrl
  }: AxiosRequestConfig): AxiosRequestConfig {
    return configWithoutDataAndUrl;
  }

  async get<T>(config: HttpConfig): Promise<T> {
    const { withAuth = true, ...restConfig } = config;

    const headers = withAuth ? { ...this.populateTokenToHeaderConfig() } : {};

    const fullUrl = this.getFullApiUrl(config.url!);
    try {
      const response = await this.fetchingService.get(fullUrl, {
        ...this.extractUrlAndDataFromConfig(restConfig),
        headers,
      });

      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  }

  async put<T>(config: HttpConfig): Promise<T> {
    const { withAuth = true, ...restConfig } = config;
    const headers = withAuth ? { ...this.populateTokenToHeaderConfig() } : {};
    const fullUrl = this.getFullApiUrl(config.url!);
    try {
      const response = await this.fetchingService.put(fullUrl, config.data, {
        ...this.extractUrlAndDataFromConfig(restConfig),
        headers,
      });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  }
  async post<T>(config: HttpConfig): Promise<T> {
    const { withAuth = true, ...restConfig } = config;
    const headers = withAuth ? { ...this.populateTokenToHeaderConfig() } : {};
    const fullUrl = this.getFullApiUrl(config.url!);
    try {
      const response = await this.fetchingService.post(fullUrl, config.data, {
        ...this.extractUrlAndDataFromConfig(restConfig),
        headers,
      });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  }

  async delete<T>(config: HttpConfig): Promise<T> {
    const { withAuth = true, ...restConfig } = config;
    const headers = withAuth ? { ...this.populateTokenToHeaderConfig() } : {};
    const fullUrl = this.getFullApiUrl(config.url!);
    try {
      const response = await this.fetchingService.delete(fullUrl, {
        ...this.extractUrlAndDataFromConfig(restConfig),
        headers,
      });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  }

  async patch<T>(config: HttpConfig): Promise<T> {
    const { withAuth = true, ...restConfig } = config;
    const headers = withAuth ? { ...this.populateTokenToHeaderConfig() } : {};
    const fullUrl = this.getFullApiUrl(config.url!);

    try {
      const response = await this.fetchingService.patch(fullUrl, config.data, {
        ...this.extractUrlAndDataFromConfig(restConfig),
        headers,
      });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  }
}
