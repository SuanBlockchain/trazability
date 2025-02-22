import { withAuth } from "next-auth/middleware"

// Definir las rutas protegidas
const protectedRoutes = [
  '/dashboard',
  '/profile',
  '/settings',
  '/admin',
  '/dashboard/records',
  '/dashboard/settings'
]

// Configuración de autenticación
const authOptions = {
  callbacks: {
    authorized: ({ req, token }) => {
      const { pathname } = req.nextUrl
      
      // Verificar si la ruta actual está en la lista de rutas protegidas
      const isProtectedRoute = protectedRoutes.some(route => 
        pathname.startsWith(route)
      )

      // Si es una ruta protegida, requerir token
      if (isProtectedRoute) {
        return !!token
      }
      
      // Para rutas no protegidas, permitir acceso
      return true
    }
  },
  pages: {
    signIn: '/auth/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
}

// Exportar como default
export default withAuth(
  function middleware(req) {
    return null // Dejar que Next-Auth maneje las redirecciones
  },
  authOptions
)

// Configuración de rutas
export const config = {
  matcher: [
    // Incluir solo las rutas protegidas en el matcher
    ...protectedRoutes.map(route => route + '/:path*'),
    // O usar el matcher general si prefieres
    '/((?!api|_next|_static|_vercel|favicon.ico|sitemap.xml).*)'
  ]
}