
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";



export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@email.com" },
        password: { label: "Senha", type: "password" }
      },
      async authorize(credentials) {

        try {
          const res = await fetch(`http://localhost:3001/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password
            }),
            credentials: "include"
          });

          const result = await res.json();


          if (!res.ok) {

            return ({
              message: result?.message,
              errors: result?.errors || {Erro: ["Credenciais inválidas"]}
            });
            //throw new Error("Credenciais inválidas");
          }

          // Se o backend respondeu corretamente
          if (result?.accessToken) {
            return result; // Retorna tudo de uma vez
          }

          return null;

        } catch (error) {
          console.error("Erro ao logar:", error);
          return null;
        }
      }
    })
  ],
  secret: "123456789123455579",//process.env.NEXTAUTH_SECRET, // gerar uma chave forte aqui? // sem um secre fixo, next-auth dá erro de "JWT Signature is invalid"
  pages: {
    signIn: '/signIn'
  },
  session: {
    strategy: 'jwt',
    maxAge: 15 * 60, // 15 minutos pra ficar igual ao backend
    updateAge: 12 * 60 // Atualiza o token a cada 5 minutos
  },

  callbacks: {

    async signIn ({user}) {

      if (user?.errors) {
        throw new Error(JSON.stringify({message: user?.message, errors: user?.errors}))
      }
      return true;
    },

    /// user === result do authorize
    async jwt({ token, user }) {
      // Rodado na primeira vez após login
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.user = user.user;
        token.message = user.message;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.user = token.user;
      return session;
    },


  },

  events: {
    async signOut({ token }) {
        try {
        const response = await fetch(`http://localhost:3001/auth/logout`, {
            method: "DELETE",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({ refreshToken: token.refreshToken }),
            credentials: "include"
        });

        return response;

        } catch (error) {
        console.error("Erro ao fazer logout:", error);
        }

    }
  }

};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
