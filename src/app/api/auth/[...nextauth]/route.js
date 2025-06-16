
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
          });

          if (!res.ok) {
            throw new Error("Credenciais inválidas");
          }

          const result = await res.json();

          // Se o backend respondeu corretamente
          if (result?.accessToken) {
            return result; // Retorna tudo de uma vez
            
            //return {
              //id: data.user.id,
              //name: data.user.name,
              ///email: data.user.email,
              //avatar: data.user.avatar,
              //accessToken: data.accessToken,
              //refreshToken: data.refreshToken
            //};
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
  },
  callbacks: {

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
    }
  },

  events: {
    async signOut({ token }) {
        try {
        const response = await fetch(`http://localhost:3001/auth/logout`, {
            method: "DELETE",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({ refreshToken: token.refreshToken })
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
