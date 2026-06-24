import Seo from '@/components/Seo'
import { seo } from '@/content/seo'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'

export default function NotFound() {
  return (
    <>
      <Seo {...seo.notFound} />
      <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <p className="text-6xl font-extrabold text-brand">404</p>
        <h1 className="mt-4 text-2xl font-bold text-slate-900">Page not found</h1>
        <p className="mt-2 max-w-md text-slate-600">
          Sorry, we couldn’t find the page you were looking for.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button to="/" size="lg">
            Back to home
          </Button>
          <Button to="/contact" variant="outline" size="lg">
            Contact us
          </Button>
        </div>
      </Container>
    </>
  )
}
