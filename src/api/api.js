export const fakeApi = {
    login: async (email, senha) => {
        if (email === "admin@email.com" && senha === "123456") {
            return { token: "fake-jwt-token", user: { nome: "Thiago", email: "Thiago" } };
        } else {
            throw new Error("Credenciais inválidas");
        }
    }
};