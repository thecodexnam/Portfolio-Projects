import Link from 'next/link';

export default function AboutPage() {
    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#050505] via-[#0a0a0a] to-[#050505] z-0">
                    <div className="absolute top-1/4 -left-20 w-80 h-80 bg-ocean-blue/10 rounded-full blur-[120px] animate-pulse"></div>
                    <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-ocean-teal/10 rounded-full blur-[120px] animate-pulse"></div>
                </div>
                <div className="relative z-10 container-wide text-center">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 uppercase tracking-tight">
                        Meet Your <span className="gradient-text glow-text">Coach</span>
                    </h1>
                    <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto font-medium leading-relaxed">
                        Professional Men&apos;s Physique Athlete | Champion Bodybuilder | Transformation Specialist
                    </p>
                </div>
            </section>

            {/* Story Section */}
            <section className="section-padding">
                <div className="container-wide">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        {/* Image Container with Glow */}
                        <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden group">
                            <div className="absolute -inset-[2px] bg-gradient-to-br from-ocean-blue to-ocean-teal rounded-2xl opacity-20 blur-sm z-0"></div>
                            <div className="relative z-10 w-full h-full bg-[#1a1a1a] flex items-center justify-center text-gray-500 text-sm sm:text-base p-4 text-center border border-white/10 hover:border-white/20 transition-colors">
                                [Coach Professional Photo - Replace with actual image]
                            </div>
                        </div>

                        {/* Content */}
                        <div className="space-y-8 text-center lg:text-left">
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-[1.1]">
                                The Journey to <br /> <span className="gradient-text">MUSCLE OCEAN</span>
                            </h2>
                            <div className="space-y-4 text-gray-300 text-lg sm:text-xl font-medium leading-relaxed">
                                <p>
                                    My fitness journey started over 8 years ago as a skinny teenager who dreamed of building an impressive physique. What began as a personal goal evolved into a passion for helping others achieve their transformation dreams.
                                </p>
                                <p>
                                    After years of dedicated training, studying sports science, and competing at the highest levels, I earned multiple Men&apos;s Physique championship titles. But the real reward came from seeing my clients transform their bodies and lives.
                                </p>
                                <p>
                                    Today, MuscleOcean represents everything I&apos;ve learned—a proven system that combines science-backed training methods with personalized coaching to deliver real, sustainable results.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Achievements Section */}
            <section className="section-padding bg-[#0a0a0a] relative overflow-hidden">
                <div className="absolute top-1/2 -right-40 w-96 h-96 bg-ocean-blue/5 rounded-full blur-[120px] animate-pulse"></div>
                <div className="container-wide relative z-10">
                    <h2 className="text-4xl md:text-5xl font-black text-white text-center mb-16 uppercase tracking-tight">
                        Competition <span className="gradient-text">Achievements</span>
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {[
                            { year: '2024', title: 'State Men\'s Physique Champion', category: 'Open Category' },
                            { year: '2023', title: 'Regional Bodybuilding Championship', category: '1st Place' },
                            { year: '2023', title: 'National Men\'s Physique', category: 'Top 5 Finalist' },
                            { year: '2022', title: 'District Level Championship', category: 'Gold Medal' },
                            { year: '2022', title: 'Inter-City Competition', category: '1st Place' },
                            { year: '2021', title: 'Debut Competition', category: '2nd Place' },
                        ].map((achievement, index) => (
                            <div key={index} className="glass rounded-2xl p-8 border border-white/5 hover:border-ocean-blue/30 transition-all group hover:-translate-y-2">
                                <div className="gradient-text font-black text-4xl mb-3 tracking-tighter group-hover:glow-text transition-all">{achievement.year}</div>
                                <h3 className="text-white font-bold text-xl mb-2 uppercase tracking-tight group-hover:text-ocean-blue transition-colors">{achievement.title}</h3>
                                <p className="text-gray-400 font-medium">{achievement.category}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Philosophy Section */}
            <section className="section-padding relative overflow-hidden">
                <div className="absolute top-0 -left-40 w-80 h-80 bg-ocean-teal/5 rounded-full blur-[120px] animate-pulse"></div>
                <div className="container-tight relative z-10">
                    <h2 className="text-4xl md:text-5xl font-black text-white text-center mb-16 uppercase tracking-tight">
                        Coaching <span className="gradient-text">Philosophy</span>
                    </h2>

                    <div className="space-y-8">
                        {[
                            { title: 'Science + Experience', desc: 'I combine evidence-based training principles with real-world competitive experience. No BS, no fad diets—just proven methods that work for the long term.' },
                            { title: 'Personalized Approach', desc: 'Every client is unique. Your body type, lifestyle, goals, and preferences shape your custom program. What works for one person may not work for another—that\'s why cookie-cutter plans don\'t deliver results.' },
                            { title: 'Accountability & Support', desc: 'Transformation requires consistency. Through weekly check-ins, progress tracking, and 24/7 WhatsApp support, I ensure you stay motivated and on track to achieve your goals.' }
                        ].map((item, index) => (
                            <div key={index} className="glass rounded-2xl p-8 border border-white/5 hover:border-ocean-blue/30 transition-all hover:translate-x-2 group">
                                <h3 className="text-2xl font-black gradient-text mb-4 uppercase tracking-tight group-hover:glow-text transition-all">{item.title}</h3>
                                <p className="text-gray-300 text-lg leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Online Coaching Works */}
            <section className="section-padding bg-[#0f0f0f] relative overflow-hidden">
                <div className="absolute bottom-0 -right-40 w-80 h-80 bg-ocean-indigo/5 rounded-full blur-[120px] animate-pulse"></div>
                <div className="container-wide relative z-10">
                    <h2 className="text-4xl md:text-5xl font-black text-white text-center mb-16 uppercase tracking-tight">
                        Why <span className="gradient-text">Online Coaching</span> Works
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {[
                            { icon: '📱', title: 'Train Anywhere', desc: 'No gym membership required. Train at home, at your gym, or while traveling.' },
                            { icon: '💰', title: 'Cost-Effective', desc: 'Get expert coaching at a fraction of the cost of in-person training.' },
                            { icon: '⏰', title: 'Flexible Schedule', desc: 'Work out on your schedule. No need to match trainer availability.' },
                            { icon: '📊', title: 'Data-Driven', desc: 'Track progress with photos, measurements, and performance metrics.' },
                            { icon: '🎯', title: 'Focused Attention', desc: 'Detailed program design and regular adjustments based on your progress.' },
                            { icon: '🌍', title: 'Global Access', desc: 'Work with a champion coach regardless of your location.' },
                        ].map((benefit, index) => (
                            <div key={index} className="glass rounded-2xl p-8 border border-white/5 hover:border-ocean-blue/30 transition-all hover:-translate-y-2 group">
                                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">{benefit.icon}</div>
                                <h3 className="text-xl font-black text-white mb-3 uppercase tracking-tight group-hover:gradient-text transition-colors">{benefit.title}</h3>
                                <p className="text-gray-400 font-medium leading-relaxed">{benefit.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding">
                <div className="container-tight text-center">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-8 uppercase tracking-tight leading-tight">
                        Ready to <br className="sm:hidden" /> <span className="gradient-text">Work Together?</span>
                    </h2>
                    <p className="text-gray-300 text-xl mb-12 font-medium leading-relaxed">
                        Let&apos;s build your dream physique with proven methods and personalized coaching.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link
                            href="/contact"
                            className="bg-gradient-to-r from-ocean-blue via-ocean-teal to-ocean-indigo text-white px-12 py-5 rounded-2xl font-black text-xl hover:shadow-2xl hover:shadow-ocean-blue/40 transition-all hover:-translate-y-1 active:scale-95 uppercase tracking-widest inline-block"
                        >
                            START YOUR JOURNEY
                        </Link>
                        <Link
                            href="/services"
                            className="bg-white/5 backdrop-blur-md border border-white/10 text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-white/10 transition-all hover:-translate-y-1 active:scale-95 uppercase tracking-widest inline-block"
                        >
                            VIEW SERVICES
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
