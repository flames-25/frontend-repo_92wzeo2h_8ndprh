import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, Mail, Globe, ArrowUpRight, Menu, X, Linkedin, Instagram } from 'lucide-react'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function useProjects() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/projects`)
        const data = await res.json()
        setItems(data.items || [])
      } catch (e) {
        setError('Gagal memuat proyek. Menampilkan contoh lokal.')
        setItems([])
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return { items, loading, error }
}

function Navbar({ onContact }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mt-6 flex items-center justify-between rounded-2xl border border-white/20 bg-white/70 p-3 backdrop-blur-xl shadow-lg">
          <a href="#home" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-amber-400" />
            <span className="font-semibold">Portfolio</span>
          </a>
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-700">
            <a href="#home" className="hover:text-gray-900">Profil</a>
            <a href="#projects" className="hover:text-gray-900">Proyek</a>
            <button onClick={onContact} className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2 text-white hover:bg-black">
              Hubungi <ArrowUpRight size={16} />
            </button>
          </div>
          <button className="md:hidden" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="md:hidden mx-4 rounded-b-2xl border border-t-0 border-white/20 bg-white/80 backdrop-blur-xl">
            <div className="flex flex-col p-4 gap-3 text-sm">
              <a href="#home" onClick={() => setOpen(false)}>Profil</a>
              <a href="#projects" onClick={() => setOpen(false)}>Proyek</a>
              <button onClick={() => { onContact(); setOpen(false) }} className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2 text-white">
                Hubungi <ArrowUpRight size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function HeroProfile() {
  return (
    <section id="home" className="relative w-full overflow-hidden pt-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900">
              Halo, saya <span className="bg-gradient-to-br from-indigo-600 via-fuchsia-600 to-amber-500 bg-clip-text text-transparent">Nama Anda</span>
            </h1>
            <p className="mt-4 text-gray-700 text-lg">
              Saya fokus pada pembuatan website yang cepat, rapi, dan mudah digunakan. Portofolio ini menampilkan beberapa proyek terbaik saya.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#projects" className="inline-flex items-center gap-2 rounded-2xl bg-gray-900 px-5 py-3 text-white hover:bg-black">Lihat Proyek</a>
              <a href="#contact" className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-gray-900 border border-gray-200 hover:bg-gray-50">Kontak</a>
            </div>
            <div className="mt-8 flex flex-wrap gap-3 text-sm">
              <span className="rounded-full bg-gray-100 px-3 py-1">React</span>
              <span className="rounded-full bg-gray-100 px-3 py-1">FastAPI</span>
              <span className="rounded-full bg-gray-100 px-3 py-1">Tailwind</span>
              <span className="rounded-full bg-gray-100 px-3 py-1">MongoDB</span>
              <span className="rounded-full bg-gray-100 px-3 py-1">Framer Motion</span>
            </div>
            <div className="mt-6 flex gap-3">
              <a href="mailto:you@example.com" className="inline-flex items-center gap-2 rounded-xl border px-4 py-2"><Mail size={16} /> Email</a>
              <a href="https://github.com" target="_blank" className="inline-flex items-center gap-2 rounded-xl border px-4 py-2"><Github size={16} /> GitHub</a>
              <a href="https://linkedin.com" target="_blank" className="inline-flex items-center gap-2 rounded-xl border px-4 py-2"><Linkedin size={16} /> LinkedIn</a>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="relative mx-auto w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop"
                alt="Foto Profil"
                className="h-full w-full rounded-3xl object-cover border shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ item }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-transform hover:-translate-y-1">
      <div className="aspect-[16/10] overflow-hidden">
        <img src={item.image_url} alt={item.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          {item.tags?.slice(0, 3).map((t) => (
            <span key={t} className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">{t}</span>
          ))}
        </div>
        <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
        {item.subtitle && <p className="text-sm text-gray-500 mt-1">{item.subtitle}</p>}
        <p className="mt-3 text-gray-700 text-sm">{item.description}</p>
        <div className="mt-4 flex items-center gap-3">
          {item.demo_url && (
            <a href={item.demo_url} target="_blank" className="inline-flex items-center gap-1 text-gray-900 hover:underline">
              Demo <ArrowUpRight size={16} />
            </a>
          )}
          {item.repo_url && (
            <a href={item.repo_url} target="_blank" className="inline-flex items-center gap-1 text-gray-600 hover:underline">
              Repo <Github size={16} />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

function Projects() {
  const { items, loading, error } = useProjects()

  return (
    <section id="projects" className="relative py-20">
      <div className="absolute inset-0 -z-0">
        <div className="pointer-events-none absolute inset-0 opacity-50 bg-[radial-gradient(ellipse_at_top_left,rgba(99,102,241,0.15),transparent_40%),radial-gradient(ellipse_at_bottom_right,rgba(236,72,153,0.12),transparent_40%),radial-gradient(ellipse_at_top_right,rgba(245,158,11,0.15),transparent_40%)]" />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold">Proyek</h2>
            <p className="text-gray-600 mt-2">Pilihan karya yang pernah saya kerjakan.</p>
          </div>
          <a href="#contact" className="hidden sm:inline-flex items-center gap-2 rounded-2xl border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50">
            Butuh sesuatu? Hubungi saya <ArrowUpRight size={16} />
          </a>
        </div>

        {loading && <p className="text-gray-500">Memuat proyek...</p>}
        {error && <p className="text-red-600">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <ProjectCard key={item._id} item={item} />
          ))}
        </div>

        {!loading && items.length === 0 && (
          <div className="rounded-2xl border border-dashed p-10 text-center text-gray-600">
            Belum ada data proyek. Klik tombol di bawah untuk menambahkan data contoh.
            <div className="mt-4">
              <a href={`${BACKEND_URL}/api/seed`} target="_blank" className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2 text-white">
                Tambah Sample
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function Contact() {
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    const form = new FormData(e.currentTarget)
    const payload = Object.fromEntries(form.entries())
    try {
      const res = await fetch(`${BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      if (data.ok) setStatus('success')
      else setStatus('error')
    } catch (e) {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-20">
      <div className="mx-auto max-w-3xl px-4">
        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <h3 className="text-2xl font-bold">Hubungi Saya</h3>
          <p className="mt-2 text-gray-600 text-sm">Punya project atau ide? Kirim pesan, saya akan balas secepatnya.</p>
          <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-4">
            <input name="name" required placeholder="Nama" className="rounded-xl border px-4 py-3" />
            <input name="email" type="email" required placeholder="Email" className="rounded-xl border px-4 py-3" />
            <textarea name="message" required placeholder="Pesan" rows="4" className="rounded-xl border px-4 py-3" />
            <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3 text-white hover:bg-black">
              {status === 'loading' ? 'Mengirim...' : 'Kirim Pesan'}
            </button>
            {status === 'success' && <p className="text-green-600 text-sm">Terkirim! Terima kasih.</p>}
            {status === 'error' && <p className="text-red-600 text-sm">Terjadi kesalahan. Coba lagi.</p>}
          </form>
          <div className="mt-6 flex gap-3 text-sm">
            <a href="mailto:you@example.com" className="inline-flex items-center gap-2 rounded-xl border px-3 py-2"><Mail size={16} /> Email</a>
            <a href="https://github.com" target="_blank" className="inline-flex items-center gap-2 rounded-xl border px-3 py-2"><Github size={16} /> GitHub</a>
            <a href="https://linkedin.com" target="_blank" className="inline-flex items-center gap-2 rounded-xl border px-3 py-2"><Linkedin size={16} /> LinkedIn</a>
            <a href="https://instagram.com" target="_blank" className="inline-flex items-center gap-2 rounded-xl border px-3 py-2"><Instagram size={16} /> Instagram</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  const [contactOpen, setContactOpen] = useState(false)

  useEffect(() => {
    // smooth scroll
    if (typeof window !== 'undefined') {
      const onClick = (e) => {
        const a = e.target.closest('a[href^="#"]')
        if (a) {
          const id = a.getAttribute('href').slice(1)
          const el = document.getElementById(id)
          if (el) {
            e.preventDefault()
            window.scrollTo({ top: el.offsetTop - 70, behavior: 'smooth' })
          }
        }
      }
      document.addEventListener('click', onClick)
      return () => document.removeEventListener('click', onClick)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar onContact={() => setContactOpen(true)} />
      <HeroProfile />
      <Projects />
      <Contact />
      <footer className="py-10">
        <div className="mx-auto max-w-7xl px-4 flex items-center justify-between text-sm text-gray-600">
          <span>© {new Date().getFullYear()} Nama Anda</span>
          <div className="flex items-center gap-4">
            <a href="https://yourdomain.com" className="inline-flex items-center gap-1 hover:underline"><Globe size={14} /> yourdomain.com</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
