import ContactForm from '@/components/ContactForm';

export default function ContactPage() {
    return (
        <div className="pt-20 pb-20">
            {/* Hero Section - Immersive & High-Impact */}
            <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
                {/* Atmospheric Background */}
                <div className="absolute inset-0 bg-[#050505] z-0">
                    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-ocean-blue/10 rounded-full blur-[150px] animate-pulse"></div>
                    <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-ocean-teal/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }}></div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none"></div>
                </div>

                <div className="relative z-10 container-wide text-center">
                    <div className="inline-block px-6 py-2 glass rounded-full border border-white/10 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <span className="text-sm font-black text-ocean-blue uppercase tracking-[0.3em]">Ignite Your Potential</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-8 uppercase tracking-tighter leading-[0.9] animate-in fade-in slide-in-from-bottom-8 duration-1000">
                        Let&apos;s Build Your <br />
                        <span className="gradient-text glow-text">Legacy</span>
                    </h1>
                    <p className="text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1200">
                        Don&apos;t just train. Evolve. Start your journey with professional coaching tailored to your ambition.
                    </p>
                </div>
            </section>

            {/* Main Content Area */}
            <section className="relative z-10 -mt-20">
                <div className="container-wide">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

                        {/* Contact Information Grid - Sidebar Style */}
                        <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-32">
                            <div className="space-y-4">
                                <h2 className="text-4xl font-black text-white uppercase tracking-tight">
                                    Our <span className="gradient-text">Headquarters</span>
                                </h2>
                                <p className="text-gray-400 text-lg font-medium leading-relaxed">
                                    Based in the heart of Mumbai, training champions worldwide.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                {[
                                    {
                                        icon: (
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        ),
                                        label: 'Email Support',
                                        value: 'coach@muscleocean.com',
                                        sub: 'Response within 12h',
                                        gradient: 'from-ocean-blue/20 to-ocean-blue/5'
                                    },
                                    {
                                        icon: (
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                            </svg>
                                        ),
                                        label: 'WhatsApp',
                                        value: '+91 98765 43210',
                                        sub: 'Most Direct Line',
                                        gradient: 'from-green-500/20 to-green-500/5'
                                    },
                                    {
                                        icon: (
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            </svg>
                                        ),
                                        label: 'The Gym',
                                        value: 'Chembur, Mumbai',
                                        sub: 'Mon-Sat 6AM-10PM',
                                        gradient: 'from-ocean-teal/20 to-ocean-teal/5'
                                    }
                                ].map((method, index) => (
                                    <div key={index} className="relative group overflow-hidden rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-500">
                                        <div className={`absolute inset-0 bg-gradient-to-br ${method.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                                        <div className="relative z-10 p-6 flex items-start space-x-4">
                                            <div className="w-12 h-12 glass rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-500 shadow-xl group-hover:glow-text">
                                                {method.icon}
                                            </div>
                                            <div>
                                                <h3 className="text-gray-400 font-black uppercase text-[10px] tracking-widest mb-1 group-hover:text-white transition-colors">
                                                    {method.label}
                                                </h3>
                                                <p className="text-white font-black text-lg mb-1">{method.value}</p>
                                                <p className="text-gray-500 text-xs font-bold uppercase tracking-tighter">{method.sub}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Social Callout */}
                            <div className="glass rounded-[2rem] p-8 border border-white/5 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-ocean-blue/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-ocean-blue/20 transition-colors"></div>
                                <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6 relative z-10">Follow the Journey</h3>
                                <div className="flex space-x-4 relative z-10">
                                    <a href="#" className="w-12 h-12 glass rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:border-ocean-blue/50 transition-all hover:-translate-y-1">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                                    </a>
                                    <a href="#" className="w-12 h-12 glass rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:border-ocean-blue/50 transition-all hover:-translate-y-1">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 4-8 4z" /></svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Form Section - Main Focus */}
                        <div className="lg:col-span-8 relative">
                            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-ocean-blue/5 rounded-full blur-[120px] pointer-events-none"></div>

                            <div className="space-y-10">
                                <div className="space-y-4 text-center lg:text-left">
                                    <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
                                        Application <span className="gradient-text">Form</span>
                                    </h2>
                                    <p className="text-gray-400 text-lg font-medium leading-relaxed max-w-2xl">
                                        Take the first step towards your ultimate physique. This information helps us design the perfect plan for you.
                                    </p>
                                </div>

                                <ContactForm />
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}
