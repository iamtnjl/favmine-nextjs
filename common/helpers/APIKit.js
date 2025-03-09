import HTTPKit, { client } from "./HTTPKit";

const defaultFileUploadConfig = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

const APIKit = {
  setClientToken: HTTPKit.setClientToken,

  // Public API's
  public: {
    getProducts: (params) => {
      const url = "/public/products";
      return client.get(url, { params });
    },
    getProductDetails: (id) => {
      const url = `/public/products/${id}`;
      return client.get(url);
    },
    cart: (payload) => {
      const url = `/cart`;
      return client.post(url, payload);
    },
  },
  tags: {
    getCategoriesList: (params) => {
      const url = "/public/categories";
      return client.get(url, { params });
    },
    getBrandsList: (params) => {
      const url = "/public/brands";
      return client.get(url, { params });
    },
    getColorList: (params) => {
      const url = "/public/colors";
      return client.get(url, { params });
    },
    getMaterialList: (params) => {
      const url = "/public/materials";
      return client.get(url, { params });
    },
  },

  //Auth API's
  auth: {
    login: (payload) => {
      const url = "auth/token";
      return client.post(url, payload);
    },
    register: (payload) => {
      const url = "auth/registration";
      return client.post(url, payload);
    },
  },

  //Users API's
  me: {
    getProfile: () => {
      const url = `/me`;
      return client.get(url);
    },
  },

  //Admin API's
  we: {},
};

export default APIKit;
